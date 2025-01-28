"use client";
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
import { updateCreditByAdmin, updateUserCredit } from "@/actions/user";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { CurrencyFormatter } from "@/lib/currencyFormatter";
import dynamic from "next/dynamic";
import myAxios from "../axiosConfig";

const PaystackHookButton = dynamic(
  () => import("@/lib/payment/PaystackHookButton"),
  { ssr: false }
);
export function PaymentCart({ items = [], paymentType }) {
  const { data: session } = useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const userRole = user?.role;

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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || "" : value,
    }));
  };

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

    if (paymentType === "card" && userRole === "user") {
      validateAndSubmit(formData);
    } else {
      isValidAmount(formData.amount);
    }

    const userData =
      userRole === "admin"
        ? {
            adminId: session?.user?.id,
            adminPassword: formData.password,
            userId: userRole?._id,
            credit: formData.amount,
            email: "solomongilala@gmail.com" || userRole?.email,
          }
        : {
            userId: userRole?._id,
            credit: formData.amount,
            email: "solomongilala@gmail.com" || userRole?.email,
            // email: formData.email || userRole?.email,
            ...formData,
          };

    try {
      if (userRole === "admin") {
        console.log("userData :", userData);

        // const res = await updateCreditByAdmin(userData);
        // if (res.successful) {
        //   toast.success(res.message);
        //   router.push("/adminUsers/users");
        // }
      } else {
        console.log("userData :", userData);
        // const res = await updateUserCredit(userData);
        // if (res.successful) {
        //   toast.success(res.message);
        //   router.push("/billings");
        // }
      }
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.message);
    }
  };

  const totalItems = [
    ...items,

    {
      name: "Regel Top Up",
      price: parseFloat(formData.amount) || 0,
      description: "Regel Top Up Your Credit",
    },
  ];

  const amountInKobo = formData.amount * 100;

  const configPaystackPayment = {
    reference: `ref-${Date.now()}`,
    email: "gilogilala@gmail.com" || session?.user?.email,
    amount: amountInKobo,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    currency: "NGN",
    metadata: {
      custom_fields: [
        {
          display_name: "Regel Top Up",
          variable_name: "topUp",
          value: `Regel Top Up - ${formData.amount}`,
        },
        {
          display_name: "Additional Notes",
          variable_name: "notes",
          value: "Customer purchased additional credits",
        },
      ],
    },
  };

  const onSuccess = async (response) => {
    console.log("Payment successful!", response);
    toast.success("Payment successful!");

    try {
      const backendResponse = await myAxios.post("/payments/paystack/verify", {
        reference: response.reference,
        status: response.status,
        transactionId: response.transaction,
        amount: amountInKobo,
        email: session?.user?.email || "example@example.com",
      });

      if (backendResponse?.data?.success) {
        toast.success(backendResponse?.data?.message);
        router.push("/billings");
      } else {
        toast.error("Payment verification failed.");
      }
    } catch (error) {
      console.error("Error during payment verification:", error);
      toast.error("An error occurred during payment verification.");
    }
  };

  const onClose = () => {
    console.log("Payment modal closed");
    toast.error("Payment was not completed.");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="py-3 text-sm font-semibold text-white">
          Topup Now
        </Button>
      </DialogTrigger>

      <DialogContent className="overflow-y-auto scrollbar-hide max-h-screen md:max-h-md">
        <DialogHeader>
          <DialogTitle>Complete Your Payment</DialogTitle>
          <DialogDescription>
            Enter your payment details to proceed.
          </DialogDescription>
        </DialogHeader>

        <div className="max-w-lg mx-auto  mt-6">
          {/* Header Section */}
          <div className="mb-4 flex items-center justify-between">
            <DialogClose asChild>
              <div className="flex items-center text-sm font-semibold ">
                <ArrowLeft className="h-4 w-4" />
                <span className="ml-2">Regel Technology</span>
              </div>
            </DialogClose>

            <span className="rounded bg-primary px-2 py-1 text-xs font-semibold uppercase tracking-wider">
              Payment
            </span>
          </div>

          {/* Subscription item Details */}
          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-lg font-semibold">Credit</h2>
            </CardHeader>
            <PricingCard items={totalItems} />
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
                value={userRole?.email || formData.email}
                onChange={handleChange}
                className="mb-4"
              />
              {["admin", "superAdmin"].includes(userRole) && (
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
              {userRole === "user" && paymentType !== "card" && (
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
                  {/* <div className="mb-4">
                      <Label
                        htmlFor="country"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Country or region
                      </Label>
                      <Select
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
      </Select>
                    </div> */}
                </>
              )}
            </CardContent>

            <CardFooter className="w-full flex-col">
              {userRole === "user" ? (
                // <Button
                //   className="mb-6 w-full bg-black py-3 text-sm font-semibold text-white"
                //   onClick={handleSubmit}
                // >
                //   Pay
                // </Button>
                <DialogClose asChild>
                  <div className=" z-100">
                    <PaystackHookButton
                      onSuccess={onSuccess}
                      onClose={onClose}
                      isLoading={loading}
                      buttonText="Pay with Paystack"
                      configPaystackPayment={configPaystackPayment}
                    />
                  </div>
                </DialogClose>
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

export const PricingCard = ({ items = [], plan }) => {
  const sumTotalPrice = items?.reduce((acc, item) => acc + item?.price, 0);

  const totalPrice = CurrencyFormatter(sumTotalPrice, "NGN");
  return (
    <div className="flex flex-wrap justify-center">
      <CardContent className="w-full">
        <div className="mt-2 flex items-baseline">
          <span className="mr-2 text-5xl font-extrabold">{totalPrice}</span>
          <span className="text-sm font-semibold text-gray-500">{plan}</span>
        </div>
        {items.map((item) => (
          <div
            key={item.id}
            className="mt-6 flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"
          >
            <div className="flex items-center">
              <Package className="h-6 w-6 text-primary" />
              <div className="ml-3">
                <p className="text-sm font-semibold">{item?.name}</p>
                <p className="text-xs text-gray-500">{item?.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">
                {CurrencyFormatter(item?.price, "NGN")}
              </p>
              <p className="text-xs text-gray-500">{item?.quantity}</p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-end">
        <p className="text-xs text-gray-400">Powered by Paystack</p>
      </CardFooter>
    </div>
  );
};
