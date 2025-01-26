"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import myAxios from "@/lib/axiosConfig";
import dynamic from "next/dynamic";
// import PaystackHookButton from "@/lib/payment/PaystackHookButton";
const PaystackHookButton = dynamic(
  () => import("@/lib/payment/PaystackHookButton"),
  { ssr: false }
);

const Checkout = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    firstName: "John",
    lastName: "Doe",
    streetAddress: "123 Main St",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "USA",
    cardNumber: "4242424242424242",
    expirationDate: "12/25",
    cvv: "123",
  });
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("opay");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const initializeOpayPayment = async () => {
    try {
      setLoading(true);

      const formData = {
        cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/billings/paymentFailed`,
        country: "NG",
        evokeOpay: true,
        expireAt: 300,
        sn: "PE462xxxxxxxx",
        reference: `ref-${Date.now()}`,
        returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/billings/paymentSuccessful`,
        amount: {
          currency: "NGN",
          total: 400,
        },
        product: {
          description: "Top Up Wallet",
          name: "Regel Top",
        },
        userInfo: {
          userEmail: session?.user?.email || "example@example.com",
          userId: session?.user?.id || "userid001",
          userMobile: "13056288895",
          userName: `${formValues.firstName} ${formValues.lastName}`,
        },
      };

      const response = await myAxios.post("/payments/opay/pay", formData);
      if (response.data.message === "SUCCESSFUL") {
        router.push(response.data.data?.cashierUrl);
      } else {
        toast.error("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Error creating Opay order:", error);
      toast.error("Failed to create order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const amountInKobo = 800 * 100;

  const configPaystackPayment = {
    reference: `ref-${Date.now()}`,
    email: session?.user?.email || "example@example.com",
    amount: amountInKobo,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    currency: "NGN",
    metadata: {
      custom_fields: [
        {
          display_name: "Plan",
          variable_name: "plan",
          value: "Basic SMS Plan - 50,000",
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    initializeOpayPayment();
  };

  const validateForm = () => {
    if (
      !formValues.firstName ||
      !formValues.lastName ||
      !formValues.cardNumber ||
      !formValues.expirationDate ||
      !formValues.cvv
    ) {
      toast.error("Please fill in all required fields.");
      return false;
    }

    const cardNumber = formValues.cardNumber.replace(/\D/g, "");
    if (!/^\d{16}$/.test(cardNumber)) {
      toast.error(
        "Invalid card number. Please enter a valid 16-digit card number."
      );
      return false;
    }

    const [month, year] = formValues.expirationDate.split("/");
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (
      !/^\d{2}\/\d{2}$/.test(formValues.expirationDate) ||
      +month < 1 ||
      +month > 12 ||
      +year < currentYear ||
      (+year === currentYear && +month < currentMonth)
    ) {
      toast.error("Invalid expiration date. Please enter a valid MM/YY date.");
      return false;
    }

    if (!/^\d{3,4}$/.test(formValues.cvv)) {
      toast.error("Invalid CVV. Please enter a valid 3 or 4-digit CVV.");
      return false;
    }

    return true;
  };

  // const initializePaystackPayment = async () => {
  //   try {
  //     setLoading(true);

  //     const amountInKobo = 800 * 100; // Dynamic amount in kobo
  //     const transactionData = {
  //       userId: session?.user?.id,
  //       type: "deposit",
  //       amount: amountInKobo,
  //       currency: "NGN",
  //       reference: `ref-${Date.now()}`,
  //       gateway: paymentMethod || "paystack",
  //     };

  //     // Create pending transaction
  //     const pendingTransaction = await createTransaction(transactionData);
  //     console.log("Payment Response:", pendingTransaction);

  //     if (!pendingTransaction?.successful) {
  //       toast.error("Failed to create a pending transaction.");
  //       return;
  //     }

  //     const paystackPayload = {
  //       key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  //       email: session?.user?.email || "example@example.com",
  //       amount: amountInKobo,
  //       currency: "NGN",
  //       firstName: formValues.firstName,
  //       lastName: formValues.lastName,
  //       phone: session?.user?.phone || "13056288895",
  //       reference: transactionData.reference,
  //       metadata: {
  //         customer_name: `${formValues.firstName} ${formValues.lastName}`,
  //         customer_email: session?.user?.email || "example@example.com",
  //         custom_fields: [
  //           {
  //             display_name: "Plan",
  //             variable_name: "plan",
  //             value: "Basic SMS Plan - 50,000",
  //           },
  //           {
  //             display_name: "Additional Notes",
  //             variable_name: "notes",
  //             value: "Customer purchased additional credits",
  //           },
  //         ],
  //       },

  //       onSuccess: async (response) => {
  //         console.log("Payment Response:", response);
  //         try {
  //           const backendResponse = await myAxios.post(
  //             "/payments/paystack/verify",
  //             {
  //               reference: response.reference,
  //               status: response.status,
  //               transactionId: response.transaction,
  //               amount: amountInKobo,
  //               email: session?.user?.email || "example@example.com",
  //             }
  //           );

  //           if (backendResponse?.data?.success) {
  //             toast.success(backendResponse?.data?.message);
  //             router.push("/billings");
  //           } else {
  //             toast.error("Payment verification failed.");
  //           }
  //         } catch (error) {
  //           console.error("Error during payment verification:", error);
  //           toast.error("An error occurred during payment verification.");
  //         }
  //       },
  //       onClose: () => toast.error("Payment was not completed."),
  //       onError: (error) => {
  //         console.error("Payment error:", error);
  //         toast.error("An error occurred during payment initialization.");
  //       },
  //     };

  //     // Start Paystack transaction
  //   } catch (error) {
  //     console.error("Error initializing payment:", error);
  //     toast.error("Payment initialization failed.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <main className="lg:flex">
        <div className="lg:w-1/2 px-2 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Checkout</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="flex items-center">
                  <Badge>1</Badge>
                  <span className="ml-2">Shipping Address</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    aria-label="First Name"
                  />
                  <Input
                    type="text"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    aria-label="Last Name"
                  />
                  <Input
                    type="text"
                    name="streetAddress"
                    value={formValues.streetAddress}
                    onChange={handleChange}
                    placeholder="Street Address"
                    className="col-span-2"
                    aria-label="Street Address"
                  />
                  <Input
                    type="text"
                    name="city"
                    value={formValues.city}
                    onChange={handleChange}
                    placeholder="City"
                    aria-label="City"
                  />
                  <Input
                    type="text"
                    name="state"
                    value={formValues.state}
                    onChange={handleChange}
                    placeholder="State"
                    aria-label="State"
                  />
                  <Input
                    type="text"
                    name="postalCode"
                    value={formValues.postalCode}
                    onChange={handleChange}
                    placeholder="Postal Code"
                    aria-label="Postal Code"
                  />
                  <Input
                    type="text"
                    name="country"
                    value={formValues.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="col-span-2"
                    aria-label="Country"
                  />
                </div>
                <div className="flex items-center mt-4">
                  <Badge>2</Badge>
                  <span className="ml-2">Payment Method</span>
                </div>
                <RadioGroup
                  defaultValue="opay"
                  className="grid grid-cols-2 gap-4"
                  onValueChange={(value) => setPaymentMethod(value)}
                >
                  <div>
                    <RadioGroupItem
                      value="opay"
                      id="opay"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="opay"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <WalletCardsIcon className="mb-3 h-6 w-6" />
                      Opay
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="paystack"
                      id="paystack"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="paystack"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <CreditCardIcon className="mb-3 h-6 w-6" />
                      Paystack
                    </Label>
                  </div>
                </RadioGroup>
                <PaystackHookButton
                  onSuccess={onSuccess}
                  onClose={onClose}
                  isLoading={loading}
                  buttonText="Pay with Paystack"
                  configPaystackPayment={configPaystackPayment}
                />
                <Button
                  type="submit"
                  className="w-full mt-4"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Complete Order"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8 lg:mt-0 lg:w-1/2 px-2 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Product A</span>
                  <span>$100</span>
                </div>
                <div className="flex justify-between">
                  <span>Product B</span>
                  <span>$200</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>$300</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default Checkout;

// export default function Checkout() {
//   return (
//     <main className="lg:flex">
//       <div className="lg:w-1/2 px-2 py-4">
//         <Card>
//           <CardHeader>
//             <CardTitle>Checkout</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="flex items-center">
//                 <Badge>1</Badge>
//                 <span className="ml-2">Shipping Address</span>
//               </div>
//               <form>
//                 <div className="grid grid-cols-2 gap-4">
//                   <Input placeholder="First Name" />
//                   <Input placeholder="Last Name" />
//                   <Input placeholder="Street Address" className="col-span-2" />
//                   <Input placeholder="City" />
//                   <Input placeholder="State" />
//                   <Input placeholder="Postal Code" />
//                   <Input placeholder="Country" className="col-span-2" />
//                 </div>
//               </form>
//               <div className="flex items-center">
//                 <Badge>2</Badge>
//                 <span className="ml-2">Payment Method</span>
//               </div>
//               <form>
//                 <div className="grid grid-cols-2 gap-4">
//                   <Input placeholder="Card Number" className="col-span-2" />
//                   <Input placeholder="MM/YY" />
//                   <Input placeholder="CVV" />
//                 </div>
//               </form>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//       <div className="mt-8 lg:mt-0 lg:w-1/2 px-2 py-4">
//         <Card>
//           <CardHeader>
//             <CardTitle>Order Summary</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="flex justify-between">
//                 <span>Product A</span>
//                 <span>$100</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Product B</span>
//                 <span>$200</span>
//               </div>
//               <div className="flex justify-between font-semibold">
//                 <span>Total</span>
//                 <span>$300</span>
//               </div>
//             </div>
//           </CardContent>
//           <CardFooter>
//             <Button className="w-full">Complete Order</Button>
//           </CardFooter>
//         </Card>
//       </div>
//     </main>
//   );
// }

export function Component() {
  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto py-8 px-4">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment</CardTitle>
            <CardDescription>Enter your payment details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" placeholder="4111 1111 1111 1111" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiration">Expiration</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Select>
                    <SelectTrigger id="expiration-month">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={i + 1}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger id="expiration-year">
                      <SelectValue placeholder="YY" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => (
                        <SelectItem key={i + 2023} value={i + 2023}>
                          {i + 2023}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input id="cardholderName" placeholder="John Doe" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment Options</CardTitle>
            <CardDescription>
              Select your preferred payment method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
              <div>
                <RadioGroupItem
                  value="card"
                  id="card"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="card"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <CreditCardIcon className="mb-3 h-6 w-6" />
                  Credit Card
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="digital-wallet"
                  id="digital-wallet"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="digital-wallet"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <WalletCardsIcon className="mb-3 h-6 w-6" />
                  Digital Wallet
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="other"
                  id="other"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="other"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <DollarSignIcon className="mb-3 h-6 w-6" />
                  Other
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Review your order details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>$99.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>$5.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Discount</span>
                <span>-$10.00</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span>$94.00</span>
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span>Items</span>
                <span>2</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Delivery</span>
                <span>Standard (3-5 days)</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Button size="lg" className="w-full">
          Place Order
        </Button>
      </div>
    </div>
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

function DollarSignIcon(props) {
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function WalletCardsIcon(props) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" />
      <path d="M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21" />
    </svg>
  );
}
