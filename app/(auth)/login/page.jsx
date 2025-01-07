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
import toast from "react-hot-toast";
import myAxios from "@/lib/axiosConfig";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "john1@gmail.com",
    password: "12345678",
    rememberMe: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // password: "12345678",
  // email: "john1@gmail.com",
  // phone: "09030904384",

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await myAxios.post("/authentication/login", formData);
  //     console.log("res.data :", res.data);
  //     if (res.data.success) {
  //       toast.success(res.data.message);
  //       // Optionally, you can reset the form here:
  //       router.push("/clients/sms");
  //     }
  //   } catch (error) {
  //     console.error("Unexpected error:", error);
  //     toast.error("An error occurred while creating the user.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      console.log(res);

      if (res.ok) {
        setLoading(false);
        router.push("/clients/sms");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An error occurred while logging in.");
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
          src="/Alfridget-Logo.jpeg"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div> */}
      <div className="container relative hidden h-svh flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/signup"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Signup
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
              alt="Alfridget company logo"
              width={100}
              height={100}
              className="mr-2 h-10 w-10"
            />
            Alfridget
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
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
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
                  Enter your email below to create your account
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
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
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, terms: checked })
                      }
                    />
                    <Label htmlFor="rememberMe">Remember Me</Label>
                  </div>
                  <p className=" text-center text-sm ">
                    <Link
                      href="/terms"
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      Forgot Password
                    </Link>
                    .
                  </p>
                </div>
              </CardContent>
              <Link href="/clients">
                <CardFooter>
                  <Button onClick={handleSubmit} className="w-full">
                    Login
                  </Button>
                </CardFooter>
              </Link>

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
                  <Link
                    href="/signup"
                    className="text-blue-600 hover:underline"
                  >
                    SignUp
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

export default Login;
