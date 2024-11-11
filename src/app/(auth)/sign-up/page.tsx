import { SignUpForm } from "@/app/(auth)/sign-up/sign-up.form";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login",
	description: "Welcome back!",
};

export default function LoginPage() {
	return <SignUpForm />;
}
