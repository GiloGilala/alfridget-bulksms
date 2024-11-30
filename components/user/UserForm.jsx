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

const UserForm = ({ defaultValues = {} }) => {
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      firstName: "",
      middleName: "",
      lastName: "",
      companyName: "",
      email: "",
      password: "",
      phone: "",
      surname: "",
      gender: "",
      createdBy: "",
      Credits: 0,
      verified: false,
      isDisabled: false,
      disableDate: null,
      disabledBy: "",
      isActive: true,
      role: "user",
      googleId: null,
      profileImage: null,
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create User</CardTitle>
        <CardDescription>Fill in user details</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormFieldWrapper
              control={form.control}
              name="username"
              label="Username"
              placeholder="Enter username"
              renderInput={(field) => <Input {...field} />}
            />

            <FormFieldWrapper
              control={form.control}
              name="firstName"
              label="First Name"
              placeholder="Enter first name"
              renderInput={(field) => <Input {...field} />}
            />

            <FormFieldWrapper
              control={form.control}
              name="middleName"
              label="Middle Name"
              placeholder="Enter middle name"
              renderInput={(field) => <Input {...field} />}
            />

            <FormFieldWrapper
              control={form.control}
              name="lastName"
              label="Last Name"
              placeholder="Enter last name"
              renderInput={(field) => <Input {...field} />}
            />

            <FormFieldWrapper
              control={form.control}
              name="companyName"
              label="Company Name"
              placeholder="Enter company name"
              renderInput={(field) => <Input {...field} />}
            />

            <FormFieldWrapper
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter email"
              renderInput={(field) => <Input {...field} type="email" />}
            />

            <FormFieldWrapper
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter password"
              renderInput={(field) => <Input {...field} type="password" />}
            />

            <FormFieldWrapper
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="Enter phone number"
              renderInput={(field) => <Input {...field} type="tel" />}
            />

            <FormFieldWrapper
              control={form.control}
              name="surname"
              label="Surname"
              placeholder="Enter surname"
              renderInput={(field) => <Input {...field} />}
            />

            <FormFieldWrapper
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

            <FormFieldWrapper
              control={form.control}
              name="createdBy"
              label="Created By"
              placeholder="Enter created by"
              renderInput={(field) => <Input {...field} />}
            />

            <FormFieldWrapper
              control={form.control}
              name="Credits"
              label="Credits"
              placeholder="Enter credits"
              renderInput={(field) => <Input {...field} type="number" />}
            />

            <FormFieldWrapper
              control={form.control}
              name="verified"
              label="Verified"
              renderInput={(field) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />

            <FormFieldWrapper
              control={form.control}
              name="isDisabled"
              label="Disabled"
              renderInput={(field) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />

            <FormFieldWrapper
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
                    <SelectItem value="publisher">Publisher</SelectItem>
                    <SelectItem value="superAdmin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            <FormFieldWrapper
              control={form.control}
              name="isActive"
              label="Active Status"
              renderInput={(field) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </CardContent>
        </form>
      </Form>

      <CardFooter className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Cancel
        </Button>
        <Button className="w-full" type="submit">
          Create User
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserForm;
