"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import * as z from "zod";
import toast from "react-hot-toast";
import myAxios from "@/lib/axiosConfig"; // Importing axios instance
import { useRouter } from "next/navigation";

const signupSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters long"),
    lastName: z.string().min(2, "Last name must be at least 2 characters long"),
    phone: z
      .string()
      .regex(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        "Invalid phone number"
      ),
    terms: z.boolean(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

const SignUp = () => {
  const [formData, setFormData] = useState({
    password: "12345678",
    confirmPassword: "12345678",
    username: "JohnDoe1",
    email: "john1@gmail.com",
    firstName: "John1",
    lastName: "Doe1",
    phone: "09030904384",
    terms: false,
  });
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate form data using Zod schema
      signupSchema.parse(formData);

      const data = {
        password: "12345678",
        confirmPassword: "12345678",
        username: "JohnDoe1",
        email: "john1@gmail.com",
        firstName: "John1",
        lastName: "Doe1",
        phone: "09030904384",
        terms: false,
      };

      const res = await myAxios.post("/auth/signup", formData);

      if (res.data.success) {
        toast.success(res.data.message);
        // Optionally, you can reset the form here:
        setFormData({
          password: "",
          confirmPassword: "",
          username: "",
          email: "",
          firstName: "",
          lastName: "",
          phone: "",
          terms: false,
        });
        router.push("/login");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handling validation errors from Zod
        const fieldErrors = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        setErrors(fieldErrors);
      } else {
        console.error("Unexpected error:", error);
        toast.error("An error occurred while creating the user.");
      }
    }
  };

  return (
    <>
      {/* <div className="md:hidden">
        <Image
          src="/Alfridget-Logo.jpeg"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/regel.jpeg"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div> */}
      <div className="container relative hidden h-svh flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div
          className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex"
          style={{
            backgroundImage: `url('/bgLogin.png')`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-zinc-900/30" />
          <div className="relative z-20 flex items-center text-2xl font-medium">
            <Image
              src="/regel.jpeg"
              alt="Regel company logo"
              width={100}
              height={100}
              className="mr-2 h-10 w-10"
            />
            Regel
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <q className="text-lg font-medium italic">
                "Their SMS platform has revolutionized our customer engagement."
              </q>
              <footer className="text-sm font-normal">
                &mdash; Emily Chen, Marketing Manager at ABC Inc.
              </footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[550px]">
            {/* <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div> */}
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>
                  Enter your details below to create your account
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="text-red-500">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="johnDoe"
                  />
                  {errors.username && (
                    <p className="text-red-500">{errors.username}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="me@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-red-500">{errors.phone}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className=" ">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <p className="text-red-500">{errors.password}</p>
                    )}
                  </div>
                  <div className="">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    className="w-5 h-5"
                    name="terms"
                    checked={formData.terms}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, terms: checked })
                    }
                  />

                  <Label htmlFor="termsAndConditions">I agree to the</Label>
                  <Link
                    href="/terms"
                    className="underline underline-offset-4 hover:text-primary"
                    target="_blank"
                  >
                    Terms of Service
                  </Link>
                  <Label htmlFor="termsAndConditions">and</Label>
                  <Link
                    href="/privacy"
                    className="underline underline-offset-4 hover:text-primary"
                    target="_blank"
                  >
                    Privacy Policy
                  </Link>
                </div>
                {errors.terms && <p className="text-red-500">{errors.terms}</p>}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={!formData.terms}
                >
                  Create account
                </Button>
              </CardFooter>
              <CardFooter className="flex-col">
                {/* <div className="space-y-4 pb-3">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <Button variant="outline">
                      <Icons.gitHub className="mr-2 h-4 w-4" />
                      Github
                    </Button>
                    <Button variant="outline">
                      <Icons.google className="mr-2 h-4 w-4" />
                      Google
                    </Button>
                  </div>
                </div> */}

                <p className="px-8 text-center text-sm text-muted-foreground">
                  By clicking continue, you agree to our
                  <Link
                    href="/terms"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
                <p className="text-center text-sm mt-4">
                  Already a Member?{" "}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Sign In
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
