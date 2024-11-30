import React from "react";
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
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { campaignSchema } from "@/lib/ValidationZod";
import { zodResolver } from "@hookform/resolvers/zod";

const campaignTypes = [
  "SMS",
  "Bulk SMS",
  "Long SMS",
  "Bulk Email",
  "Whatsapp",
  "MediaOutlet",
];

const CampaignForm = ({ defaultValues, groups = [], handleSubmit }) => {
  const form = useForm({
    resolver: zodResolver(campaignSchema),
    defaultValues: defaultValues || {
      title: "",
      from: "",
      type: "",
      unicode: false,
      message: "",
      messageToReply: "",
      credit: 0,
      groupId: "",
      status: "pending",
      scheduleDate: null,
    },
  });

  const onSubmit = async (data) => {
    if (handleSubmit) {
      await handleSubmit(data);
    } else {
      console.log(data);
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
                    {campaignTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FormFieldWrapper
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
            />
            <div className="col-span-full">
              <FormFieldWrapper
                control={form.control}
                name="message"
                label="Message Content"
                placeholder="Enter your message"
                renderInput={(field) => (
                  <Textarea {...field} className="min-h-[100px]" />
                )}
              />
            </div>
            <div className="col-span-full">
              <FormFieldWrapper
                control={form.control}
                name="messageToReply"
                label="Reply Message"
                placeholder="Enter the reply message"
                renderInput={(field) => (
                  <Textarea {...field} className="min-h-[100px]" />
                )}
              />
            </div>
            <FormFieldWrapper
              control={form.control}
              name="credit"
              label="Credits"
              placeholder="Enter credits required"
              renderInput={(field) => (
                <Input {...field} type="number" min="0" />
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
            <FormFieldWrapper
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
            />
          </CardContent>
          <CardFooter className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
            <Button type="submit">Create Campaign</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default CampaignForm;
