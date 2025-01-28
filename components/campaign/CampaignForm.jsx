"use client";

import React, { useEffect } from "react";
import { Form, FormFieldWrapper } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { campaignSchema } from "@/lib/ValidationZod";

const campaignTypes = [
  { type: "SMS", maxLength: 160 },
  { type: "Bulk SMS", maxLength: 320 },
  { type: "Long SMS", maxLength: 1000 },
];

const CampaignForm = ({
  campaign,
  groups = [],
  setImportedGroupContacts,
  setRecipientsInput,
  handleSubmit,
  balance,
  isSubmitting,
  setIsSubmitting,
}) => {
  const form = useForm({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      title: "",
      from: "",
      type: "Bulk SMS",
      unicode: false,
      message: "",
      messageToReply: "",
      groupId: "",
      scheduleDate: null,
      recipients: "", // Initialize as a string, not an array
    },
    // values: campaign,
  });

  const message = form.watch("message") || "";
  const type = form.watch("type") || "SMS";
  useEffect(() => {
    const recipients = form.watch("recipients") || "";
    setRecipientsInput(recipients.split(",").filter(Boolean)); // Filter out empty strings
  }, [form.watch("recipients")]); // Only run when recipients change
  const watchedValues = form.watch([
    "message",
    "groupId",
    "recipients",
    "type",
  ]);

  const maxMessageLength =
    campaignTypes.find((campaign) => campaign.type === type)?.maxLength || 1000;

  const messageLength = message.length;
  const estimatedCost =
    messageLength > 160 ? Math.ceil(messageLength / 153) : 1;

  useEffect(() => {
    if (watchedValues.groupId) {
      const selectedGroup = groups.find(
        (group) => group._id === watchedValues.groupId
      );
      if (selectedGroup) {
        setImportedGroupContacts &&
          setImportedGroupContacts(selectedGroup.contacts || []);
      }
    }
  }, [watchedValues.groupId, groups, setImportedGroupContacts]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const smsData = {
      ...data,
      recipients: data.recipients.split(","),
    };

    try {
      // console.log("send :", smsData);
      await handleSubmit(smsData);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Campaign</CardTitle>
        <CardDescription>Set up your messaging campaign</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            <FormFieldWrapper
              control={form.control}
              name="title"
              label="Campaign Title"
              placeholder="Enter campaign title"
              renderInput={(field) => <Input {...field} />}
            />

            <FormFieldWrapper
              control={form.control}
              name="from"
              label="Sender ID"
              placeholder="Enter Your Sender ID"
              renderInput={(field) => <Input {...field} />}
            />

            <FormFieldWrapper
              control={form.control}
              name="type"
              label="Campaign Type"
              renderInput={(field) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select campaign type" />
                  </SelectTrigger>
                  <SelectContent>
                    {campaignTypes.map((campaign) => (
                      <SelectItem key={campaign.type} value={campaign.type}>
                        {campaign.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <FormFieldWrapper
              control={form.control}
              name="groupId"
              label="Target Group"
              renderInput={(field) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target group" />
                  </SelectTrigger>
                  <SelectContent>
                    {groups.map((group) => (
                      <SelectItem key={group._id} value={group._id}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <div className="col-span-full">
              <FormFieldWrapper
                control={form.control}
                name="message"
                label="Message Content"
                placeholder={`Max length: ${maxMessageLength}`}
                renderInput={(field) => (
                  <Textarea
                    {...field}
                    className="min-h-[100px]"
                    maxLength={maxMessageLength}
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= maxMessageLength) {
                        field.onChange(value);
                      }
                    }}
                  />
                )}
                description={`Maximum length for ${type}: ${messageLength}/${maxMessageLength} characters`}
              />
            </div>

            <div className="col-span-full">
              <FormFieldWrapper
                control={form.control}
                name="recipients"
                label="Recipients"
                renderInput={(field) => (
                  <Textarea
                    {...field}
                    className="min-h-[100px]"
                    placeholder="Enter recipients phone Numbers (e.g., +123...,+456...,+789...)"
                    value={field.value || ""} // Treat as a string
                    onChange={(e) => {
                      field.onChange(e.target.value); // Update the string directly
                    }}
                  />
                )}
                description="Enter recipients as a single string (e.g., +123...,+456...,+789...)"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button className="w-32" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : campaign?._id ? (
                "Update Campaign"
              ) : (
                "Create Campaign"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default CampaignForm;
