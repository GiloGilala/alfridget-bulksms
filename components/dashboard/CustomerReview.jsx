import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";

const CustomerReview = ({ className }) => {
  const reviews = [
    { id: 1, star: 5, count: 50 },
    { id: 2, star: 4, count: 40 },
    { id: 3, star: 3, count: 30 },
    { id: 4, star: 2, count: 20 },
    { id: 5, star: 1, count: 10 },
  ];

  return (
    <Card className={cn("p-6", className)}>
      <div className="p-5 bg-card rounded-lg flex flex-col gap-2 items-center">
        <div className="flex items-center justify-center text-yellow-500">
          <StarFull className="w-9 h-9" />
          <StarFull className="w-9 h-9" />
          <StarFull className="w-9 h-9" />
          <StarFull className="w-9 h-9" />
          <StarHalf className="w-9 h-9" />
        </div>
        <p className="text-xl font-extrabold">4.5/5</p>
        <p className="text-sm font-medium text-secondary-foreground">
          Total 650 customer review
        </p>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        {reviews.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="max-w-[160px] w-full flex items-center">
              <span className="text-sm text-secondary-foreground whitespace-nowrap mr-0.5">
                {item.star} Star
              </span>
              <Progress
                value={item.star * 20}
                className="w-full h-2 bg-icon-muted [&>div]:bg-icon-active"
              />
            </div>

            <span className="text-sm text-secondary-foreground">
              {item.count}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CustomerReview;

export const StarFull = (props) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 2.99976L22.635 12.3898L33 13.9048L25.5 21.2098L27.27 31.5298L18 26.6548L8.73 31.5298L10.5 21.2098L3 13.9048L13.365 12.3898L18 2.99976Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const StarHalf = (props) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 2.99976L22.635 12.3898L33 13.9048L25.5 21.2098L27.27 31.5298L18 26.6548L8.73 31.5298L10.5 21.2098L3 13.9048L13.365 12.3898L18 2.99976Z"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 26.6998L8.7 31.4998L10.5 21.1498L3 13.9498L13.5 12.4498L18 2.99976"
        fill="currentColor"
      />
    </svg>
  );
};
