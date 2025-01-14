"use client";
import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
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
import toast from "react-hot-toast";
import myAxios from "@/lib/axiosConfig";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { resetPassword, sendPasswordResetEmail } from "@/actions/user";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // const res = await myAxios.post("/authentication/reset-password", {
      //   email: formData.email,
      // });
      const res = await sendPasswordResetEmail(formData.email);

      console.log(res);
      if (res.successful) {
        toast.success(res.message);
        setShowResetForm(true); // Show the reset form after successful email submission
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error(
        error.message || "An error occurred while resetting password."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (!token) {
      toast.error("Reset token is required");
      setLoading(false);
      return;
    }
    const data = {
      email: formData.email,
      password: password,
      confirmPassword: confirmPassword,
      token: token,
    };

    try {
      // const res = await myAxios.post("/authentication/reset-password-token", data);
      const res = await resetPassword(data);

      if (res.successful) {
        toast.success(res.message);
        router.push("/login"); // Redirect to login page after successful password reset
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An error occurred while resetting password.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">
                {showResetForm ? "Reset Password" : "Forgot Password"}
              </CardTitle>
              <CardDescription>
                {showResetForm
                  ? "Enter your new password and the token you received."
                  : "Enter your email to reset your password."}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {!showResetForm ? (
                // Step 1: Request Reset Token
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
              ) : (
                // Step 2: Reset Password with Token
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="token">Reset Token</Label>
                    <Input
                      id="token"
                      name="token"
                      type="text"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      placeholder="Enter reset token"
                    />
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={showResetForm ? handleResetPassword : handleSubmit}
                className="w-full"
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : showResetForm
                  ? "Reset Password"
                  : "Send Reset Link"}
              </Button>
            </CardFooter>
            <CardFooter className="flex-col">
              <p className="text-center text-sm mt-4">
                Remember your password?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
