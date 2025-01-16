"use client";
import React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MailCheck, Package } from "lucide-react";
import { Topup2, Topup3 } from "../payment/TopUp";
import { CurrencyFormatter } from "@/lib/calculateFn";

export const StatisticsCard1 = ({ className }) => {
  const avatars = [
    { id: 1, image: "/user1.png" },
    { id: 2, image: "/user1.png" },
    { id: 3, image: "/user1.png" },
    { id: 4, image: "/user1.png" },
    { id: 5, image: "/user1.png" },
  ];

  return (
    <Card
      className={cn("p-6 h-[230px] flex flex-col justify-between", className)}
    >
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h6 className="font-semibold">1,352</h6>
          <span className="text-xs font-medium text-emerald-500 px-1 py-0.5 rounded-sm bg-card">
            +12.5%
          </span>
        </div>

        <p className="text-sm text-secondary-foreground">Daily Sales</p>
      </div>

      <div>
        <p className="text-xs font-medium text-secondary-foreground">
          Top Customers
        </p>

        <div className="flex items-center flex-wrap gap-2 mt-2">
          {avatars.map((avatar) => (
            <Avatar
              key={avatar.id}
              className="w-9 h-9 -mr-5 border border-border"
            >
              <AvatarImage src={avatar.image} alt="@shaii" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>
    </Card>
  );
};

export const CardCTA = ({
  className,
  title,
  description,
  buttonText,
  handleButtonClick,
  modalButton,
  pricingPlans,
  userRole,
}) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        {modalButton ? (
          <Topup2 pricingPlans={pricingPlans} userRole={userRole} />
        ) : (
          <Button onClick={handleButtonClick}>{buttonText}</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export const CardProgress = ({
  className,
  title,
  amount,
  percentage,
  progressValue,
  Icon = MailCheck,
  iconColor = "text-emerald-500",
}) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-2">
        <div className="flex flex-row items-center justify-between mb-4">
          {title && <CardDescription>{title}</CardDescription>}
          {Icon && <Icon className={`h-6 w-6 ${iconColor}`} />}
        </div>

        <CardTitle className="text-4xl">{amount}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          {percentage} from last month
        </div>
      </CardContent>
      {progressValue && (
        <CardFooter>
          <Progress
            value={progressValue}
            aria-label={`${progressValue}% increase`}
          />
        </CardFooter>
      )}
    </Card>
  );
};

export function PricingCard({ pricingPlans = [] }) {
  const sumTotalPrice = pricingPlans?.reduce(
    (acc, plan) => acc + plan?.price,
    0
  );

  const totalPrice = CurrencyFormatter(sumTotalPrice, "NGN");
  return (
    <div className="flex flex-wrap justify-center">
      <CardContent className="w-full">
        <div className="mt-2 flex items-baseline">
          <span className="mr-2 text-5xl font-extrabold">{totalPrice}</span>
          <span className="text-sm font-semibold text-gray-500">per month</span>
        </div>
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className="mt-6 flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"
          >
            <div className="flex items-center">
              <Package className="h-6 w-6 text-yellow-500" />
              <div className="ml-3">
                <p className="text-sm font-semibold">{plan?.name}</p>
                <p className="text-xs text-gray-500">{plan?.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">
                {CurrencyFormatter(plan?.price, "NGN")}
              </p>
              <p className="text-xs text-gray-500">{plan?.quantity}</p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-end">
        <p className="text-xs text-gray-400">Powered by Stripe</p>
      </CardFooter>
    </div>
  );
}
