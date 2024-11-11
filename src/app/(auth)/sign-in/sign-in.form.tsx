"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { type Login, loginSchema } from "@/schemas/auth";
import { client } from "@/server/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SIGN_IN_FORM_STRINGS = {
	label: "Sign in",
	title: "Welcome back! Enter your credentials to access your account.",
	emailFormLabel: "Email",
	passwordFormLabel: "Password",
	forgotPasswordLabel: "Forgot password?",
	errorMessage: "Error",
	errorDescription: "Invalid credentials",
	pendingButton: "Signing in...",
	submitButton: "Sign in",
	googleLogin: "Continue with Google",
	backButtonLabel: "Don't have an account? Sign up",
};

export function SignInForm() {
	const router = useRouter();
	const { mutate, isPending } = useMutation<unknown, Error, Login, unknown>({
		mutationKey: ["signIn"],
		mutationFn: async (json) => {
			const response = await client.api.auth.login.$post({
				json,
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}
		},
		onSuccess: async () => {
			router.push(Routes.dashboard());
		},
		onError: () => {
			toast.error("Sign in failed.");
		},
	});

	const form = useForm<Login>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		criteriaMode: "all",
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((values) => mutate(values))}
				className="w-full px-4 md:px-0 md:w-[350px] mx-auto grid gap-6"
			>
				<div className="grid gap-2 text-start">
					<h1 className="text-3xl font-bold">{SIGN_IN_FORM_STRINGS.label}</h1>
					<p className="text-balance text-muted-foreground">
						{SIGN_IN_FORM_STRINGS.title}
					</p>
				</div>
				<div className="grid gap-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{SIGN_IN_FORM_STRINGS.emailFormLabel}</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="email"
										placeholder="johndoe@gmail.com"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center justify-between">
									<FormLabel>
										{SIGN_IN_FORM_STRINGS.passwordFormLabel}
									</FormLabel>
									<Link
										href="/forgot-password"
										className="text-sm text-muted-foreground hover:underline"
									>
										{SIGN_IN_FORM_STRINGS.forgotPasswordLabel}
									</Link>
								</div>
								<FormControl>
									<PasswordInput {...field} placeholder="******" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full" disabled={isPending}>
						<Loader2
							className={cn("mr-2 size-4 animate-spin", {
								inline: isPending,
								hidden: !isPending,
							})}
						/>
						{isPending
							? SIGN_IN_FORM_STRINGS.pendingButton
							: SIGN_IN_FORM_STRINGS.submitButton}
					</Button>
					{/* <Link
						href="/api/login/google"
						className={cn(
							buttonVariants({
								variant: "secondary",
							}),
							"w-full",
						)}
					>
						{SIGN_IN_FORM_STRINGS.googleLogin}
					</Link> */}
				</div>
				<div className="mt-4 text-center text-sm">
					<Link href="/sign-up" className="underline">
						{SIGN_IN_FORM_STRINGS.backButtonLabel}
					</Link>
				</div>
			</form>
		</Form>
	);
}
