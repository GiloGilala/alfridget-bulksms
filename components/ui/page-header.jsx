import { cn } from "@/lib/utils";

function PageHeader({ className, heading, description, children, ...props }) {
  return (
    <section
      className={cn(
        "mx-auto flex flex-col items-start gap-2 px-4 py-4 md:py-6 md:pb-8 ",
        className
      )}
      {...props}
    >
      <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
        {heading}
      </h1>
      <p className="max-w-2xl text-balance text-lg font-light text-foreground">
        {description}
      </p>
      {/* <div className="flex w-full items-center justify-start gap-2 py-2">
      </div> */}
      {children}
    </section>
  );
}

function PageHeaderHeading({ className, ...props }) {
  return (
    <h1
      className={cn(
        "text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]",
        className
      )}
      {...props}
    />
  );
}

function PageHeaderDescription({ className, ...props }) {
  return (
    <p
      className={cn(
        "max-w-2xl text-balance text-lg font-light text-foreground",
        className
      )}
      {...props}
    />
  );
}

function PageActions({ className, ...props }) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-start gap-2 py-2",
        className
      )}
      {...props}
    />
  );
}

export { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading };
