const campaignTypes = [
  { type: "SMS", maxLength: 160 },
  { type: "Bulk SMS", maxLength: 320 },
  { type: "Long SMS", maxLength: 1000 },
  // Add other types if needed
];

const CampaignForm = ({
  defaultValues,
  groups = [],
  setImportedGroupContacts,
  setRecipientsInput,
  handleSubmit,
  balance,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(campaignSchema),
    defaultValues: defaultValues || {
      title: "Gilo Testing",
      from: "+2347030904385",
      type: "Bulk SMS",
      unicode: false,
      message: "Testing from Gilo SMS App",
      messageToReply: "Message from Alfridget ",
      credit: 20,
      groupId: "",
      scheduleDate: null,
      recipients: ["+2348035538208", "+2348062846800", "+2348056026428"], // Array of strings
    },
  });

  const selectedType = form.watch("type");
  const maxMessageLength =
    campaignTypes.find((campaign) => campaign.type === selectedType)
      ?.maxLength || 1000;

  const onSubmit = async (data) => {
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
        <CardTitle>Create Campaign</CardTitle>
        <CardDescription>Set up your messaging campaign</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            {/* Other fields */}

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
                    {campaignTypes.map((campaign) => (
                      <SelectItem key={campaign.type} value={campaign.type}>
                        {campaign.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <div className="col-span-full">
              <FormFieldWrapper
                control={form.control}
                name="message"
                label="Message Content"
                placeholder={`Max length: ${maxMessageLength}`}
                renderInput={(field) => (
                  <Textarea
                    {...field}
                    className="min-h-[100px]"
                    maxLength={maxMessageLength} // Prevent typing beyond the limit
                    value={field.value || ""}
                  />
                )}
                description={`${field.value.length} characters,
                 ${
                   field.value.length > maxMessageLength
                     ? Math.ceil(field.value.length / maxMessageLength)
                     : 1
                 } SMS part(s)`}
              />
              {form.formState.errors.message && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.message.message}
                </p>
              )}
            </div>
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
            <Button className="w-32" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Create Campaign"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
