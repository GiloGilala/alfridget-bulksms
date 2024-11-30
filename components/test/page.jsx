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

const ContactForm = ({ defaultValues = {}, groups = [] }) => {
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
    console.log(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Contact</CardTitle>
        <CardDescription>Fill in contact details</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <FormFieldWrapper
              control={form.control}
              name="name"
              label="Name"
              placeholder="Enter contact name"
              renderInput={(field) => <Input {...field} />}
            />

            <FormFieldWrapper
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="Enter phone number"
              renderInput={(field) => <Input {...field} />}
            />

            <FormFieldWrapper
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter email"
              renderInput={(field) => <Input {...field} />}
            />

            <FormFieldWrapper
              control={form.control}
              name="location"
              label="Location"
              placeholder="Enter location"
              renderInput={(field) => <Input {...field} />}
            />

            <FormFieldWrapper
              control={form.control}
              name="country"
              label="Country"
              placeholder="Enter country"
              renderInput={(field) => <Input {...field} />}
            />

            <FormFieldWrapper
              control={form.control}
              name="state"
              label="State"
              placeholder="Enter state"
              renderInput={(field) => <Input {...field} />}
            />

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
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select group" />
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
              description="Enable or disable this contact"
            />
          </CardContent>
        </form>
      </Form>

      <CardFooter className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Cancel
        </Button>
        <Button className="w-full" type="submit">
          Create Contact
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContactForm;
