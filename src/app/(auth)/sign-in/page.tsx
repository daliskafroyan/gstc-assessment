import { SignInForm } from "@/app/(auth)/sign-in/sign-in.form";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login",
	description: "Welcome back!",
};

export default function LoginPage() {
	return <SignInForm />;
}
