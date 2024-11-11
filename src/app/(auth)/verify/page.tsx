import { VerifyForm } from "@/app/(auth)/verify/verify.form";
import { Routes } from "@/lib/routes";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Login",
	description: "Welcome back!",
};

export default async function VerifyPage(props: {
	searchParams: Promise<{ email: string | string[] | undefined }>;
}) {
	const searchParams = await props.searchParams;

	const { email } = searchParams;

	if (!email || Array.isArray(email)) {
		return redirect(Routes.login());
	}
	return <VerifyForm email={email} />;
}
