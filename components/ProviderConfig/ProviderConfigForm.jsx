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
import { providerConfigSchema } from "@/lib/ValidationZod";
import { Form, FormFieldWrapper } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

const ProviderConfigForm = ({ defaultValues = {} }) => {
  const form = useForm({
    resolver: zodResolver(providerConfigSchema),
    defaultValues: {
      providerName: "",
      hostName: "",
      port: 0,
      credits: 0,
      providerType: "",
      providerConfig: "",
      providerUsername: "",
      providerPassword: "",
      apiKey: "",
      website: "",
      description: null,
      isActive: true,
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Create Provider Config
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Fill in provider details
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            <FormFieldWrapper
              control={form.control}
              name="providerName"
              label="Provider Name"
              placeholder="Enter provider name"
              renderInput={(field) => <Input {...field} />}
              className="lg:col-span-6"
            />

            <FormFieldWrapper
              control={form.control}
              name="hostName"
              label="Host Name"
              placeholder="Enter host name"
              renderInput={(field) => <Input {...field} />}
              className="lg:col-span-3"
            />

            <FormFieldWrapper
              control={form.control}
              name="port"
              label="Port"
              placeholder="Enter port number"
              renderInput={(field) => <Input {...field} type="number" />}
              className="lg:col-span-1"
            />

            <FormFieldWrapper
              control={form.control}
              name="credits"
              label="Credits"
              placeholder="Enter credits"
              renderInput={(field) => <Input {...field} type="number" />}
              className="lg:col-span-1"
            />

            <FormFieldWrapper
              control={form.control}
              name="providerType"
              label="Provider Type"
              placeholder="Enter provider type"
              renderInput={(field) => <Input {...field} />}
              className="lg:col-span-1"
            />

            <FormFieldWrapper
              control={form.control}
              name="providerConfig"
              label="Provider Config"
              placeholder="Enter provider config"
              renderInput={(field) => <Input {...field} />}
              className="lg:col-span-2"
            />

            <FormFieldWrapper
              control={form.control}
              name="providerPassword"
              label="Provider Password"
              placeholder="Enter provider password"
              renderInput={(field) => <Input {...field} type="password" />}
              className="lg:col-span-1"
            />

            <FormFieldWrapper
              control={form.control}
              name="apiKey"
              label="API Key"
              placeholder="Enter API key"
              renderInput={(field) => <Input {...field} />}
              className="lg:col-span-1"
            />

            <FormFieldWrapper
              control={form.control}
              name="website"
              label="Website"
              placeholder="Enter website URL"
              renderInput={(field) => <Input {...field} />}
              className="lg:col-span-2"
            />

            <FormFieldWrapper
              control={form.control}
              name="description"
              label="Description"
              placeholder="Enter description"
              renderInput={(field) => (
                <Textarea {...field} className="min-h-[100px]" />
              )}
              className="lg:col-span-3"
            />

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
            />
          </CardContent>
        </form>
      </Form>

      <CardFooter className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Cancel
        </Button>
        <Button className="w-full" type="submit">
          Create Provider Config
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProviderConfigForm;
