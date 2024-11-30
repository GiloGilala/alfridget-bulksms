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
import { transactionSchema } from "@/lib/ValidationZod";
import { Form, FormFieldWrapper } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

const TransactionForm = ({ defaultValues = {} }) => {
  const form = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      id: 0,
      userId: "",
      clientId: "",
      firstName: "",
      middleName: "",
      lastName: "",
      settlementAc: "",
      transactionType: "",
      transID: "",
      transTime: new Date(),
      transAmount: 0,
      isActive: true,
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Transaction</CardTitle>
        <CardDescription>Fill in transaction details</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormFieldWrapper
              control={form.control}
              name="id"
              label="Transaction ID"
              placeholder="Enter transaction ID"
              renderInput={(field) => <Input {...field} type="number" />}
            />

            <FormFieldWrapper
              control={form.control}
              name="userId"
              label="User ID"
              placeholder="Enter user ID"
              renderInput={(field) => <Input {...field} />}
            />

            <FormFieldWrapper
              control={form.control}
              name="clientId"
              label="Client ID"
              placeholder="Enter client ID"
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
              name="settlementAc"
              label="Settlement Account"
              placeholder="Enter settlement account"
              renderInput={(field) => <Input {...field} />}
            />

            <FormFieldWrapper
              control={form.control}
              name="transactionType"
              label="Transaction Type"
              renderInput={(field) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select transaction type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Deposit">Deposit</SelectItem>
                    <SelectItem value="Withdrawal">Withdrawal</SelectItem>
                    <SelectItem value="Payment">Payment</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            <FormFieldWrapper
              control={form.control}
              name="transID"
              label="Transaction ID"
              placeholder="Enter transaction ID"
              renderInput={(field) => <Input {...field} />}
            />

            <FormFieldWrapper
              control={form.control}
              name="transTime"
              label="Transaction Time"
              renderInput={(field) => (
                <input type="datetime-local" {...field} />
              )}
            />

            <FormFieldWrapper
              control={form.control}
              name="transAmount"
              label="Transaction Amount"
              placeholder="Enter transaction amount"
              renderInput={(field) => <Input {...field} type="number" />}
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
          Create Transaction
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TransactionForm;
