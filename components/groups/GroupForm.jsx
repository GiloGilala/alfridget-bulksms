"use client";

import React, { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";
import { Form, FormFieldWrapper } from "@/components/ui/form";
import { Combobox } from "@/components/ui/combobox"; // Import the reusable Combobox component

const GroupForm = ({ handleSubmit, contacts = [] }) => {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      isActive: false,
      contactIds: [],
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const formData = {
        ...data,
        contactIds: selectedContacts,
      };
      await handleSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactOptions = contacts.map((contact) => ({
    value: contact.id,
    label: contact.name,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create Group</CardTitle>
        <CardDescription className="text-muted-foreground">
          Fill in contact details
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
            {/* Group Name */}
            <FormFieldWrapper
              className="lg:col-span-3"
              control={form.control}
              name="name"
              label="Group Name"
              placeholder="Enter group name"
              renderInput={(field) => <Input {...field} />}
            />

            {/* Group Members */}
            <FormFieldWrapper
              className="lg:col-span-3 sm:col-span-2"
              control={form.control}
              name="contactIds"
              label="Group Members"
              renderInput={() => (
                <Combobox
                  items={contactOptions}
                  selectedValues={selectedContacts}
                  onChange={(values) => setSelectedContacts(values)}
                  placeholder="Select..."
                />
              )}
              description="Select members for this group"
            />

            {/* Description */}
            <FormFieldWrapper
              className="lg:col-span-3"
              control={form.control}
              name="description"
              label="Description"
              placeholder="Enter group description"
              renderInput={(field) => (
                <Textarea {...field} className="min-h-[100px]" />
              )}
            />

            {/* Active Status */}
            <FormFieldWrapper
              className="lg:col-span-3 flex flex-col space-y-4"
              control={form.control}
              name="isActive"
              label="Active Status"
              renderInput={(field) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={(value) => field.onChange(value)}
                />
              )}
              description="Enable or disable this group"
            />
          </CardContent>

          {/* Form Footer */}
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
                "Create Group"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default GroupForm;
