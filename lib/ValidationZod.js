import * as z from "zod";

export const clientSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyCategory: z.string().min(1, "Company category is required"),
  companySubcategory: z.string().optional(),
  email: z.string().email("Invalid email"),
  website: z.string().optional(),
  emailAlt: z.string().email("Invalid email").optional(),
  phone: z.string().optional(),
  phoneAlt: z.string().optional(),
  county: z.string().min(1, "County is required"),
  state: z.string().min(1, "State is required"),
  streetName: z.string().optional(),
  credit: z.preprocess(
    (val) => (val ? Number(val) : undefined), // Convert to number
    z
      .number()
      .min(0, "Credit must be at least 0")
      .max(1000, "Credit cannot exceed 1000")
  ),
  companyBranch: z.string().optional(),
  status: z.enum(["Active", "Inactive"], "Invalid status"),
  services: z.array(z.string()).optional(),
  comments: z.string().optional(),
  createdBy: z.string().min(1, "Created by is required"),
});

export const groupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  isActive: z.boolean().default(false),
  contactIds: z.array(z.string()).default([]),
});

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email"),
  location: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  notes: z.string().optional(),
  isActive: z.boolean().optional(),
});

export const signupSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters long"),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters long"),
  phone: z
    .string()
    .regex(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Invalid phone number"
    ),
  terms: z.boolean(),
  confirmPassword: z
    .string()
    .min(8, "Confirm password must be at least 8 characters long")
    .refine((confirmPassword, ctx) => {
      if (confirmPassword !== ctx.input.password) {
        ctx.addIssue({
          code: "custom",
          message: "Confirm password does not match password",
        });
      }
      return confirmPassword;
    }, "confirmPassword"),
});

export const campaignSchema = z.object({
  title: z.string().min(1, "Campaign title is required"), // Adjusted to use min(1)
  from: z.string().min(1, "Sender name or number is required"),
  type: z.string().min(1, "Please select a campaign type"),
  unicode: z.boolean().optional(),
  message: z.string().min(1, "Message content is required"),
  recipients: z.array(z.string()).optional(), // Keep as array
  groupId: z.string().optional(),
  // scheduleDate: z.date().optional(),
});

export const planSchema = z.object({
  name: z.string().min(1, "Name is required"),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().min(1, "Description is required"),
  amount: z.number().min(0, "Amount must be non-negative"),
  creditLimit: z.number().min(0, "Credit limit must be non-negative"),
  perDayCreditLimit: z
    .number()
    .min(0, "Per day credit limit must be non-negative"),
  carryForward: z.boolean(),
  status: z
    .enum(["active", "expired", "cancelled"])
    .refine((val) => ["active", "expired", "cancelled"].includes(val), {
      message: "Invalid status",
    }),
  startDate: z.date(),
  endDate: z.date().nullable(),
  isActive: z.boolean(),
});

export const providerConfigSchema = z.object({
  providerName: z.string().min(1, "Provider name is required"),
  hostName: z.string().min(1, "Host name is required"),
  port: z.number().min(0, "Per day credit limit must be non-negative"),
  credit: z
    .number()
    .min(0, "Credit must be at least 0")
    .max(1000, "Credit cannot exceed 1000"),
  providerType: z.string().min(1, "Provider type is required"),
  providerConfig: z.string().min(1, "Provider config is required"),
  providerUsername: z.string().min(1, "Provider username is required"),
  providerPassword: z.string().min(1, "Provider password is required"),
  apiKey: z.string().min(1, "API key is required"),
  website: z.string().url("Invalid website URL").optional(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

export const serviceTypeSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  description: z.string().optional(),
  type: z.enum([
    "SMS",
    "Magazine",
    "Newspaper",
    "Email",
    "Social Media",
    "MediaOutlet",
    "Online",
  ]),
  price: z.number().min(0, "Price must be non-negative"),
  isActive: z.boolean().default(true),
});

export const transactionSchema = z.object({
  id: z.number().min(0, "ID must be non-negative"),
  userId: z.string().min(1, "User ID is required"),
  clientId: z.string().min(1, "Client ID is required"),
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  settlementAc: z.string().min(1, "Settlement account is required"),
  transactionType: z.enum(["Deposit", "Withdrawal", "Payment", "Other"]),
  transID: z.string().min(1, "Transaction ID is required"),
  transTime: z.date(),
  transAmount: z.number().min(0, "Transaction amount must be non-negative"),
  isActive: z.boolean().default(true),
});

export const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  companyName: z.string().optional(),
  companyCategory: z.string().optional(),
  companySubcategory: z.string().optional(),
  companyEmail: z.string().optional(),
  companyWebsite: z.string().optional(),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().min(1, "Phone number is required"),
  surname: z.string().min(1, "Surname is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  createdBy: z.string().min(1, "Created by is required"),
  Credits: z.number().min(0, "Credits must be non-negative"),
  verified: z.boolean().default(false),
  isDisabled: z.boolean().default(false),
  disableDate: z.date().nullable(),
  disabledBy: z.string().optional(),
  isActive: z.boolean().default(true),
  role: z.enum(["user", "admin", "publisher", "superAdmin"]),
  googleId: z.string().nullable(),
  profileImage: z.string().nullable(),
});
