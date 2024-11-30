import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-sm font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

const CardDetails = React.forwardRef(
  (
    {
      className,
      title,
      description,
      footer,
      icon: Icon, // Capitalize `icon` for JSX usage
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    >
      {/* Header section */}
      {[title, description, Icon].some(Boolean) && (
        <div className=" flex flex-col space-y-1 p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-0">
            {title && (
              <h3 className="text-sm font-semibold leading-none tracking-tight">
                {title}
              </h3>
            )}
            {Icon && <Icon className="h-6 w-6 text-muted-foreground" />}
            {/* Render icon component */}
          </div>

          {description && (
            <p className={cn("text-sm text-muted-foreground")}>{description}</p>
          )}
        </div>
      )}

      {/* Main content section */}
      <div className="p-6 pt-0">{children}</div>

      {/* Footer section */}
      {footer && (
        <div className={cn("flex items-center p-6 pt-0")}>{footer}</div>
      )}
    </div>
  )
);

CardDetails.displayName = "CardDetails";

export {
  CardDetails,
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
