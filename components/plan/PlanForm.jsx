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
import { planSchema } from "@/lib/ValidationZod";
import { Form, FormFieldWrapper } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const PlanForm = ({ defaultValues, handleSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(planSchema),
    defaultValues: defaultValues || {
      name: "",
      duration: "",
      description: "",
      amount: 0,
      creditLimit: 0,
      perDayCreditLimit: 0,
      carryForward: false,
      status: "active",
      startDate: new Date(),
      endDate: null,
      isActive: true,
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      if (handleSubmit) {
        await handleSubmit(data);
      } else {
        console.log("log :", data);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Plan</CardTitle>
        <CardDescription>Fill in plan details</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormFieldWrapper
              control={form.control}
              name="name"
              label="Plan Name"
              placeholder="Enter plan name"
              renderInput={(field) => <Input {...field} />}
              className="lg:col-span-3"
            />

            <FormFieldWrapper
              control={form.control}
              name="duration"
              label="Duration"
              placeholder="Enter duration (e.g., 30 Days)"
              renderInput={(field) => <Input {...field} />}
              className="lg:col-span-1"
            />

            <FormFieldWrapper
              control={form.control}
              name="amount"
              label="Amount"
              placeholder="Enter plan amount"
              renderInput={(field) => <Input {...field} type="number" />}
              className="lg:col-span-1"
            />

            <FormFieldWrapper
              control={form.control}
              name="description"
              label="Description"
              placeholder="Enter plan description"
              renderInput={(field) => (
                <Textarea {...field} className="min-h-[100px]" />
              )}
              className="lg:col-span-2"
            />

            <FormFieldWrapper
              control={form.control}
              name="creditLimit"
              label="Credit Limit"
              placeholder="Enter credit limit"
              renderInput={(field) => <Input {...field} type="number" />}
              className="lg:col-span-1"
            />

            <FormFieldWrapper
              control={form.control}
              name="perDayCreditLimit"
              label="Per Day Credit Limit"
              placeholder="Enter per day credit limit"
              renderInput={(field) => <Input {...field} type="number" />}
              className="lg:col-span-1"
            />

            <FormFieldWrapper
              control={form.control}
              name="carryForward"
              label="Carry Forward"
              renderInput={(field) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={(value) => field.onChange(value)}
                />
              )}
              className="lg:col-span-1"
            />

            <FormFieldWrapper
              control={form.control}
              name="status"
              label="Status"
              renderInput={(field) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      { value: "active", label: "Active" },
                      { value: "expired", label: "Expired" },
                      { value: "cancelled", label: "Cancelled" },
                    ].map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              className="lg:col-span-1"
            />

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
              className="lg:col-span-1"
            />
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
            <Button type="submit" disabled={isSubmitting} className="w-32">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Create"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default PlanForm;
