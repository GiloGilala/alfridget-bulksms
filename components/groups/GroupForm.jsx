"use client";

import React, { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { groupSchema } from "@/lib/ValidationZod";
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
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      isActive: false,
      contactIds: [],
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        contactIds: selectedContacts,
      };
      await handleSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const contactOptions = contacts.map((contact) => ({
    value: contact.id,
    label: contact.name,
  }));

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Group Name */}
            <FormFieldWrapper
              control={form.control}
              name="name"
              label="Group Name"
              placeholder="Enter group name"
              renderInput={(field) => <Input {...field} />}
            />

            {/* Description */}
            <FormFieldWrapper
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
              control={form.control}
              name="isActive"
              label="Active Status"
              renderInput={(field) => (
                <Switch
                  checked={field.value}
                  onChange={(checked) => field.onChange(checked)}
                />
              )}
              description="Enable or disable this group"
            />

            {/* Group Members */}
            <FormFieldWrapper
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
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                setSelectedContacts([]);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Create Group</Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default GroupForm;
