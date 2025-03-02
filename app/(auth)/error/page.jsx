"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { XCircleIcon } from "lucide-react";

const AuthErrorPage = () => {
  const [error, setError] = useState(null);
  const router = useRouter();

  // Get error from URL search params or state
  useEffect(() => {
    const errorParam = router.query?.error;
    if (errorParam) {
      setError(decodeURIComponent(errorParam.toString()));
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="max-w-md space-y-4">
        {error && (
          <Alert variant="destructive" className="flex items-center gap-2">
            <XCircleIcon className="h-6 w-6 text-red-500" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Authentication Failed</h1>
          <p className="mt-2 text-gray-600">
            We couldn't sign you in. Please try again.
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <Link
            href="/api/auth/signout"
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthErrorPage;
