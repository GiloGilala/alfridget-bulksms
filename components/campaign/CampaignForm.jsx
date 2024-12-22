"use client";

import React, { useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { campaignSchema } from "@/lib/ValidationZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactsData } from "../tables/data";

const campaignTypes = [
  { type: "SMS", maxLength: 160 },
  { type: "Bulk SMS", maxLength: 320 },
  { type: "Long SMS", maxLength: 1000 },
  // "Bulk Email",
  // "Whatsapp",
  // "MediaOutlet",
];

const CampaignForm = ({
  defaultValues,
  groups = [],
  setImportedGroupContacts,
  setRecipientsInput,
  handleSubmit,
  balance,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(campaignSchema),
    defaultValues: defaultValues || {
      title: "Gilo Testing",
      from: "+2347030904385",
      type: "Bulk SMS",
      unicode: false,
      message: "Testing from Gilo SMS App",
      messageToReply: "Message from Alfridget ",
      credit: 20,
      groupId: "",
      scheduleDate: null,
      recipients: ["+2348035538208", "+2348062846800", "+2348056026428"], // Array of strings
    },
  });

  const selectedType = form.watch("type");
  const maxMessageLength =
    campaignTypes.find((campaign) => campaign.type === selectedType)
      ?.maxLength || 1000;

  const parseRecipients = (input) => {
    const contactsInput = input
      .split(",") // Split by commas
      .map((recipient) => recipient.trim()) // Trim whitespace
      .filter((recipient) => recipient); // Remove empty strings

    return contactsInput;
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      await handleSubmit(data); // Directly pass the data
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
              label="From"
              placeholder="Sender name or number"
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
                      <SelectItem key={group.id} value={group.id}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {/* <FormFieldWrapper
              control={form.control}
              name="unicode"
              label="Unicode Support"
              renderInput={(field) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
              description="Enable for non-Latin characters"
            /> */}

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
                    maxLength={maxMessageLength} // Prevent typing beyond the limit
                    value={field.value || ""}
                  />
                )}
                description={`Maximum length for ${selectedType}: ${maxMessageLength} characters`}
              />
              {form.formState.errors.message && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.message.message}
                </p>
              )}
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
                    placeholder="Enter recipients (comma-separated)"
                    value={field.value?.join(", ") || ""}
                    onChange={(e) =>
                      field.onChange(parseRecipients(e.target.value))
                    } // Convert string back to array
                  />
                )}
                description="List recipients separated by commas (e.g., 1234567890, example@mail.com)"
              />
            </div>

            {/* <FormFieldWrapper
              control={form.control}
              name="recipients"
              label="Recipients"
              renderInput={(field) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    {contacts.map((recipient) => (
                      <SelectItem key={recipient.id} value={recipient.id}>
                        {recipient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              description="Select recipients from your list"
            /> */}

            {/* <FormFieldWrapper
              control={form.control}
              name="scheduleDate"
              label="Schedule Date"
              renderInput={(field) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                    />
                  </PopoverContent>
                </Popover>
              )}
              description="Optional: Schedule campaign for later"
            /> */}
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
