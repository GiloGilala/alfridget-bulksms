import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { ArrowLeft, Package, CreditCard, Banknote } from "lucide-react";
import { PricingCard } from "../dashboard/StatisticsCard";
import { updateCreditByAdmin, updateUserCredit } from "@/actions/user";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const paymentForm = {
  email: "",
  cardInformation: "4242424242424242",
  expirationDate: "12/2025",
  cvc: "123",
  cardholderName: "John Doe",
  password: "",
  paymentMethod: "Visa",
  country: "Nigeria",
  amount: 0,
};
const initialData = {
  email: "",
  cardInformation: "",
  expirationDate: "",
  cvc: "",
  cardholderName: "",
  password: "",
  paymentMethod: "",
  country: "",
  amount: 0,
};

export function Topup1() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <ArrowLeftIcon className="h-6 w-6 text-gray-400" />
          <h1 className="text-lg font-semibold">
            Togethere{" "}
            <span className="bg-yellow-200 text-yellow-600 px-2 py-1 rounded-full text-sm">
              TEST MODE
            </span>
          </h1>
        </div>
        <Button className="bg-black text-white">Pay</Button>
      </div>
      <div className="grid grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold">
            Subscribe to Togethere Professional
          </h2>
          <div className="flex items-baseline space-x-2 mt-4">
            <span className="text-5xl font-extrabold">$18.00</span>
            <span className="text-lg text-gray-500">per month</span>
          </div>
          <div className="mt-6">
            <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
              <PackageIcon className="h-6 w-6 text-yellow-600" />
              <div>
                <h3 className="font-semibold">Togethere Professional</h3>
                <p className="text-sm text-gray-500">
                  Togethere's premium plan to work better togethere
                </p>
                <p className="text-sm text-gray-500">Qty 1 | Billed monthly</p>
              </div>
              <span className="ml-auto font-semibold">$18.00</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6 text-gray-400 text-sm">
            <p>Powered by stripe</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:underline">
                Terms
              </a>
              <a href="#" className="hover:underline">
                Privacy
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col space-y-4">
            <Input type="email" placeholder="Email" />
            <div className="grid grid-cols-2 gap-4">
              <Button className="bg-gray-200 text-gray-700">Card</Button>
              <Button variant="outline">US bank account</Button>
            </div>
            <Input placeholder="Card information" />
            <div className="grid grid-cols-3 gap-4">
              <Input placeholder="MM / YY" />
              <Input placeholder="CVC" />
            </div>
            <Input placeholder="Cardholder name" />
            <Select>
              <SelectTrigger id="country">
                <SelectValue placeholder="Country or region" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="united-states">United States</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="ZIP" />
            <Button>Subscribe</Button>
            <p className="text-xs text-gray-500 mt-4">
              By confirming your subscription, you allow Togethere to charge
              your card for this payment and future payments in accordance with
              their terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Topup2({ pricingPlans, topUpUser }) {
  const { data: session } = useSession();

  const [formData, setFormData] = useState(paymentForm);
  const router = useRouter();
  const isUserId = "user";
  // const isUserId = "admin";

  const items =
    isUserId === "admin"
      ? [
          {
            id: topUpUser?._id,
            name: "Regel Top Up",
            price: 0 || formData.amount,
            description: "Regel Top Up Your Credit",
            email: "solomongilala@gmail.com" || topUpUser?.email,
            // email: "akuuchenna@gmail.com" || topUpUser?.email,
            username: topUpUser?.usename,
          },
        ]
      : pricingPlans;

  const paymentMethods = [
    { value: "card", label: "Card" },
    { value: "bank", label: "Bank Transfer" },
  ];

  const countries = [
    { value: "", label: "Select country or region" },
    { value: "Nigeria", label: "Nigeria" },
    { value: "United States", label: "United States" },
    { value: "Canada", label: "Canada" },
    { value: "United Kingdom", label: "United Kingdom" },
  ];
  // Function to validate expiration date
  const isValidExpiry = (expiry) => {
    const regex = /^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/; // Matches MM/YY or MM/YYYY
    if (!regex.test(expiry)) return false;

    const [month, year] = expiry.split("/");
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const expiryYear =
      year.length === 2 ? parseInt(`20${year}`) : parseInt(year);

    return (
      expiryYear > currentYear ||
      (expiryYear === currentYear && parseInt(month) >= currentMonth)
    );
  };

  // Function to validate the amount
  const isValidAmount = (amount) => {
    return !isNaN(amount) && amount > 0;
  };

  // Function to validate and submit the form
  const validateAndSubmit = (form) => {
    const errors = [];

    if (!/\S+@\S+\.\S+/.test(form.email)) errors.push("Invalid email.");
    if (!form.cardInformation || form.cardInformation.length < 16)
      errors.push("Invalid card number.");
    if (!isValidExpiry(form.expirationDate))
      errors.push("Invalid expiration date.");
    if (!form.cvc || form.cvc.length < 3) errors.push("Invalid CVC.");
    if (!form.cardholderName) errors.push("Cardholder name is required.");
    if (!form.paymentMethod) errors.push("Payment method is required.");
    if (!form.country) errors.push("Country is required.");
    if (!isValidAmount(form.amount)) errors.push("Amount is invalid.");

    if (errors.length > 0) {
      console.error("Validation Errors:", errors);
      alert(errors.join("\n"));
      return false; // Validation failed
    }

    console.log("Form is valid. Submitting data...");
    return true; // Validation passed
  };

  // Handle submit function
  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData =
      isUserId === "admin"
        ? {
            adminId: session?.user?.id,
            adminPassword: formData.password,
            userId: topUpUser?._id,
            credit: formData.amount,
            email: "akuuchenna@gmail.com",
          }
        : {
            userId: topUpUser?._id,
            credit: formData.amount,
            ...formData,
          };

    try {
      if (isUserId === "admin") {
        const res = await updateCreditByAdmin(userData);
        if (res.successful) {
          toast.success(res.message);
          router.push("/adminUsers/users");
        }
      } else {
        validateAndSubmit(formData);
        await updateUserCredit(userData);
      }
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || "" : value,
    }));
  };

  // const isUserId = "admin";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="py-3 text-sm font-semibold text-white">
          Topup Now
        </Button>
      </DialogTrigger>

      <DialogContent className="overflow-y-auto scrollbar-hide max-h-screen md:max-h-md">
        {/* <DialogHeader>
          <DialogTitle>Subscribe to Regel Professional</DialogTitle>
          <DialogDescription>
          Regel's premium plan to work better .
          </DialogDescription>
        </DialogHeader> */}

        <div className="max-w-lg mx-auto  mt-6">
          {/* Header Section */}
          <div className="mb-4 flex items-center justify-between">
            <a href="#" className="flex items-center text-sm font-semibold ">
              <ArrowLeft className="h-4 w-4" />
              <span className="ml-2">Regel</span>
            </a>
            <span className="rounded bg-yellow-200 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-yellow-800">
              Test Mode
            </span>
          </div>

          {/* Subscription Plan Details */}
          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-lg font-semibold">
                Subscribe to Regel Professional
              </h2>
            </CardHeader>
            <PricingCard pricingPlans={items} />
          </Card>

          {/* Payment Form */}
          <Card>
            <CardContent className="my-4">
              <Input
                id="amount"
                name="amount"
                type="number"
                placeholder="amount"
                value={formData.amount}
                onChange={handleChange}
                className="mb-4"
              />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Shipping Email"
                value={topUpUser?.email || formData.email}
                onChange={handleChange}
                className="mb-4"
              />
              {["admin", "superAdmin"].includes(isUserId) && (
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Your password to approve"
                  className="mb-4"
                />
              )}
              {isUserId === "user" && (
                <>
                  <div className="mb-4">
                    <div className="mb-2 flex justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Payment method
                      </span>
                      <div className="flex space-x-2">
                        <CreditCard className="h-5 w-5" />
                        <Banknote className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {paymentMethods.map((method) => (
                        <Button
                          key={method.value}
                          className="col-span-1 bg-gray-200 py-2 text-sm font-semibold text-gray-700"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              paymentMethod: method.value,
                            })
                          }
                        >
                          {method.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <Label
                      htmlFor="card-info"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Card information
                    </Label>
                    <Input
                      id="cardInformation"
                      name="cardInformation"
                      type="number"
                      placeholder="1234 1234 1234 1234"
                      value={formData.cardInformation}
                      onChange={handleChange}
                      maxLength={19}
                      className="mb-4"
                    />
                  </div>
                  <div className="mb-4 grid grid-cols-3 gap-4">
                    <Input
                      id="expirationDate"
                      name="expirationDate"
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expirationDate}
                      onChange={handleChange}
                      maxLength={5}
                      className="mb-4"
                    />

                    <Input
                      id="cvc"
                      name="cvc"
                      type="number"
                      placeholder="CVC"
                      value={formData.cvc}
                      onChange={handleChange}
                      maxLength={4}
                      className="mb-4"
                    />

                    <div className="flex items-center justify-end">
                      <CreditCard className="h-5 w-auto text-gray-500" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <Label
                      htmlFor="cardholder-name"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Cardholder name
                    </Label>
                    <Input
                      id="cardholderName"
                      name="cardholderName"
                      type="text"
                      placeholder="Full name on card"
                      value={formData.cardholderName}
                      onChange={handleChange}
                      className="mb-4"
                    />
                  </div>
                  <div className="mb-4">
                    <Label
                      htmlFor="country"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Country or region
                    </Label>
                    {/* <Select
      value={formData.country}
      onValueChange={(value) =>
        setFormData({ ...formData, country: value })
      }
    >
      <SelectTrigger id="country">
        <SelectValue placeholder="Nigeria" />
      </SelectTrigger>
      <SelectContent position="popper">
        {countries.map((country) => (
          <SelectItem key={country.value} value={country.value}>
            {country.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select> */}
                  </div>
                </>
              )}
            </CardContent>

            <CardFooter className="w-full flex-col">
              {isUserId === "user" ? (
                <Button
                  className="mb-6 w-full bg-black py-3 text-sm font-semibold text-white"
                  onClick={handleSubmit}
                >
                  Pay
                </Button>
              ) : (
                <Button
                  className="mb-6 w-full bg-black py-3 text-sm font-semibold text-white"
                  onClick={handleSubmit}
                >
                  Top Up
                </Button>
              )}

              <p className="mt-4 w-full text-xs text-gray-500">
                By confirming your payment, you allow us to charge you.
              </p>
            </CardFooter>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function BanknoteIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="12" x="2" y="6" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  );
}

function CreditCardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

function ArrowLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function PackageIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}
