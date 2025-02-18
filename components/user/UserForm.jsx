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
import { userSchema } from "@/lib/ValidationZod";
import { Form, FormFieldWrapper } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { Loader2 } from "lucide-react";

const UserForm = ({
  defaultValues = {},
  user,
  isSubmitting,
  setIsSubmitting,
  handleSubmit,
}) => {
  const form = useForm({
    resolver: zodResolver(userSchema),
    values: user,
  });

  const userRole = user?.role;


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

  const companyCategories = [
    { value: "technology", label: "Technology" },
    { value: "finance", label: "Finance" },
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "non-profit", label: "Non-Profit" },
    { value: "retail", label: "Retail" },
    { value: "hospitality", label: "Hospitality" },
    { value: "energy", label: "Energy" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "other", label: "Other" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {user?._id ? "Update User" : "Create User"}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Fill in user details
        </CardDescription>
        <Separator className="my-4" />{" "}
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            <FormFieldWrapper
              className="lg:col-span-6"
              control={form.control}
              name="username"
              label="Username"
              placeholder="Enter username"
              renderInput={(field) => <Input {...field} />}
            />

            <FormFieldWrapper
              className="lg:col-span-2"
              control={form.control}
              name="firstName"
              label="First Name"
              placeholder="Enter first name"
              renderInput={(field) => <Input {...field} />}
            />

            <FormFieldWrapper
              className="lg:col-span-2"
              control={form.control}
              name="middleName"
              label="Middle Name"
              placeholder="Enter middle name"
              renderInput={(field) => <Input {...field} />}
            />

            <FormFieldWrapper
              className="lg:col-span-2"
              control={form.control}
              name="lastName"
              label="Last Name"
              placeholder="Enter last name"
              renderInput={(field) => <Input {...field} />}
            />

            <FormFieldWrapper
              className="lg:col-span-3"
              control={form.control}
              name="age"
              label="Age"
              placeholder="Enter Age"
              renderInput={(field) => <Input {...field} />}
            />

            <FormFieldWrapper
              className="lg:col-span-3"
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter email"
              renderInput={(field) => <Input {...field} type="email" />}
            />

            <FormFieldWrapper
              className="lg:col-span-3"
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="Enter phone number"
              renderInput={(field) => <Input {...field} type="tel" />}
            />

            <FormFieldWrapper
              className="lg:col-span-3"
              control={form.control}
              name="gender"
              label="Gender"
              renderInput={(field) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
  {["admin", "superAdmin"].includes(userRole) && (
              
   
    <><FormFieldWrapper
                className="lg:col-span-2 flex flex-col space-y-4"
                control={form.control}
                name="isActive"
                label="Active Status"
                renderInput={(field) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={(value) => field.onChange(value)} />
                )}
                description="Enable or disable this contact" /><FormFieldWrapper
                  className="lg:col-span-2 flex flex-col space-y-4"
                  control={form.control}
                  name="verified"
                  label="Verified"
                  renderInput={(field) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={(value) => field.onChange(value)} />
                  )}
                  description="Enable or disable this Verified" /><FormFieldWrapper
                  className="lg:col-span-2 flex flex-col space-y-4"
                  control={form.control}
                  name="isDisabled"
                  label="Disabled"
                  renderInput={(field) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={(value) => field.onChange(value)} />
                  )}
                  description="Enable or disable this Disabled" /><FormFieldWrapper
                  className="lg:col-span-3"
                  control={form.control}
                  name="role"
                  label="Role"
                  renderInput={(field) => (
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="superAdmin">Super Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  )} /></>
              
              )}

            <CardHeader className="col-span-6">
              <CardTitle className="text-2xl font-bold">
                Company Details
              </CardTitle>
              <CardDescription className="text-muted-foreground mb-6">
                Fill in company details
              </CardDescription>
              <Separator className="" />
            </CardHeader>

            <FormFieldWrapper
              className="lg:col-span-6"
              control={form.control}
              name="companyName"
              label="Company Name"
              placeholder="Enter company name"
              renderInput={(field) => <Input {...field} />}
            />

            <FormFieldWrapper
              className="lg:col-span-3"
              control={form.control}
              name="companyEmail"
              label="Company Email"
              placeholder="Enter email"
              renderInput={(field) => <Input {...field} type="email" />}
            />

            <FormFieldWrapper
              className="lg:col-span-3"
              control={form.control}
              name="companyPhone"
              label="Company Phone Number"
              placeholder="Enter phone number"
              renderInput={(field) => <Input {...field} type="tel" />}
            />
            <FormFieldWrapper
              className="lg:col-span-3"
              control={form.control}
              name="companyWebsite"
              label="Company Website"
              placeholder="Company Website"
              renderInput={(field) => <Input {...field} />}
            />

            <FormFieldWrapper
              className="lg:col-span-3"
              control={form.control}
              name="category"
              label="Category"
              renderInput={(field) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {companyCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
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
              ) : user?._id ? (
                "Update User"
              ) : (
                "Create User"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default UserForm;
