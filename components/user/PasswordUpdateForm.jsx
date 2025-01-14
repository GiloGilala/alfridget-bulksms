import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordUpdateSchema } from "@/lib/ValidationZod"; // Ensure this schema is defined
import { Form, FormFieldWrapper } from "@/components/ui/form";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { Loader2 } from "lucide-react";

const PasswordUpdateForm = ({
  user,
  isSubmitting,
  setIsSubmitting,
  handleSubmit,
}) => {
  const form = useForm({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data) => {
    // console.log("Updated user:", data);

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
        <CardTitle className="text-2xl font-bold">Update Password</CardTitle>
        <CardDescription className="text-muted-foreground">
          Fill in your current and new password details
        </CardDescription>
        <Separator className="my-4" />
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {/* Current Password */}
            <FormFieldWrapper
              className="lg:col-span-3"
              control={form.control}
              name="currentPassword"
              label="Current Password"
              placeholder="Enter your current password"
              renderInput={(field) => <Input {...field} type="password" />}
            />

            {/* New Password */}
            <FormFieldWrapper
              className="lg:col-span-3"
              control={form.control}
              name="newPassword"
              label="New Password"
              placeholder="Enter your new password"
              renderInput={(field) => <Input {...field} type="password" />}
            />

            {/* Confirm New Password */}
            <FormFieldWrapper
              className="lg:col-span-3"
              control={form.control}
              name="confirmNewPassword"
              label="Confirm New Password"
              placeholder="Confirm your new password"
              renderInput={(field) => <Input {...field} type="password" />}
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
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default PasswordUpdateForm;
