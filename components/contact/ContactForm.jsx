import { useState } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/lib/ValidationZod";
import { Form, FormFieldWrapper } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";

const ContactForm = ({ defaultValues = {}, groups = [] }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      location: "",
      country: "",
      state: "",
      notes: "",
      isActive: true,
      groupId: "",
      ...defaultValues,
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("Form Data Submitted:", data);
      // Simulate async API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create Contact</CardTitle>
        <CardDescription className="text-muted-foreground">
          Fill in contact details
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Name */}
            <FormFieldWrapper
              control={form.control}
              name="name"
              label="Name"
              placeholder="Enter contact name"
              renderInput={(field) => <Input {...field} />}
            />

            {/* Phone */}
            <FormFieldWrapper
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="Enter phone number"
              renderInput={(field) => <Input {...field} />}
            />

            {/* Email */}
            <FormFieldWrapper
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter email"
              renderInput={(field) => <Input {...field} />}
            />

            {/* Location */}
            <FormFieldWrapper
              control={form.control}
              name="location"
              label="Location"
              placeholder="Enter location"
              renderInput={(field) => <Input {...field} />}
            />

            {/* Country */}
            <FormFieldWrapper
              control={form.control}
              name="country"
              label="Country"
              placeholder="Enter country"
              renderInput={(field) => <Input {...field} />}
            />

            {/* State */}
            <FormFieldWrapper
              control={form.control}
              name="state"
              label="State"
              placeholder="Enter state"
              renderInput={(field) => <Input {...field} />}
            />

            {/* Notes */}
            <FormFieldWrapper
              control={form.control}
              name="notes"
              label="Notes"
              placeholder="Enter notes"
              renderInput={(field) => (
                <Textarea {...field} className="min-h-[100px]" />
              )}
            />

            <FormFieldWrapper
              control={form.control}
              name="groupId"
              label="Group"
              renderInput={(field) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                  disabled={groups.length === 0} // Disable if groups are empty
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        groups.length === 0
                          ? "No groups available"
                          : "Select group"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {groups.length > 0 ? (
                      groups.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem disabled>No groups available</SelectItem>
                    )}
                  </SelectContent>
                </Select>
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
                  onCheckedChange={(value) => field.onChange(value)}
                />
              )}
              description="Enable or disable this contact"
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
                "Create Contact"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ContactForm;
