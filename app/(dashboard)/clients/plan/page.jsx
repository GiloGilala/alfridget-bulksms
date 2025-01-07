"use client";
import { PageHeader } from "@/components/ui/page-header";
import { CardDetails } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingSection = ({ plan }) => {
  const { name, price, credits, features } = plan;
  return (
    <div className="bg-white w-full rounded-lg shadow-lg p-6 dark:bg-gray-950 dark:text-gray-50">
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-4xl font-bold">₦{price}</p>
        </div>
        <p className="text-gray-500 dark:text-gray-400">{credits} </p>
        <ul className="grid gap-4 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 fill-primary" />
              {feature}
            </li>
          ))}
        </ul>
        <Button className="w-full">Buy Credits</Button>
      </div>
    </div>
  );
};

const Plan = () => {
  const pricingPlans = [
    {
      name: "Starter",
      price: 3.6,
      credits: "₦ 0 - 99,999",
      features: [
        "Send SMS to local and international numbers",
        "Customizable sender ID",
        "Real-time delivery reports",
        // "Basic analytics and insights",
      ],
    },
    {
      name: "Pro",
      price: 3.5,
      credits: "₦ 100,000 - 499,999",
      features: [
        "Send SMS to local and international numbers",
        "Customizable sender ID",
        "Real-time delivery reports",
        // "Advanced analytics and insights",
        // "Priority support",
      ],
    },
    {
      name: "Enterprise",
      price: 3.2,
      credits: "₦ 500,000 - 999,999",
      features: [
        "Send SMS to local and international numbers",
        "Customizable sender ID",
        "Real-time delivery reports",
        // "Advanced analytics and insights",
        "Priority support",
        // "Dedicated account manager",
      ],
    },
    {
      name: "Max Plan",
      price: 3.1,
      credits: "₦ 1,000,000+",
      features: [
        "Send SMS to local and international numbers",
        "Customizable sender ID",
        "Real-time delivery reports",
        // "Advanced analytics and insights",
        "Priority support",
        // "Dedicated account manager",
        // "Customized onboarding and training",
      ],
    },
  ];

  return (
    <div>
      {/* <section className="w-full py-12 ">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Credit-Based Pricing
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Unlock the power of our platform with flexible credit-based
                  pricing. Purchase credits to access a wide range of features
                  and services tailored to your needs.
                </p>
              </div>
            </div>
            <img
              src="/regel.jpeg"
              width="550"
              height="550"
              alt="Pricing"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            />
          </div>
        </div>
      </section> */}

      <section className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32">
        <div className="container max-w-full mx-auto p-4 md:p-6 lg:p-8">
          <div className="grid gap-8 text-center">
            <div className="grid gap-4">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Credit-Based Pricing
              </h1>
              <p className="text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
                Our credit-based pricing model allows you to pay for only what
                you need. Each tier includes a set number of credits that can be
                used to access our full suite of features.
              </p>
            </div>
            <div className="w-full grid md:grid-cols-4 gap-6">
              {pricingPlans.map((plan, index) => (
                <PricingSection key={index} plan={plan} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Plan;
