"use client";
import { Suspense, useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks"; // Ensure this path is correct
import { signIn } from "@/store/features/auth/authSlice";
import { useRouter } from "next/navigation"; // This is correct for Next.js 13+
import { useSearchParams } from "next/navigation"; // Use this for query parameters
import { toast } from "react-toastify";
import { AppDispatch } from "@/store/store";


export default function Signin() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    // Wrap useSearchParams in Suspense
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SigninContent dispatch={dispatch} router={router} />
        </Suspense>
    );
}

interface SigninContentProps {
    dispatch: AppDispatch; // Use the correct type for dispatch
    router: ReturnType<typeof useRouter>; // Use the type from next/navigation
}

function SigninContent({ dispatch, router }: SigninContentProps) {
    const searchParams = useSearchParams(); // Use this to get query params

    useEffect(() => {
        if (searchParams.get("redirected")) {
            toast.info("You need to sign in to access this page.");
        }
    }, [searchParams]); // Use searchParams as a dependency

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const resultAction = await dispatch(signIn(data));
            if (signIn.fulfilled.match(resultAction)) {
                // Sign-in was successful
                router.push("/"); // Redirect to home page
            } else {
                // Handle sign-in failure if needed
                console.error("Sign-in failed:", resultAction.error);
            }
        } catch (error) {
            console.error("An error occurred during sign-in:", error);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo- 600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={(e) => setData((prev) => ({ ...prev, password: e.target.value }))}
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}