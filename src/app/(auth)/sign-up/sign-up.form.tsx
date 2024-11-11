"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import {
	type SendRegistrationCode,
	sendRegistrationCodeSchema,
} from "@/schemas/auth";
import { client } from "@/server/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SIGN_UP_FORM_STRINGS = {
	label: "Create an account",
	title: "Enter your email to get started with your new account.",
	emailFormLabel: "Email",
	pendingButton: "Creating account...",
	submitButton: "Continue",
	googleLogin: "Continue with Google",
	backButtonLabel: "Already have an account? Sign in",
};

export function SignUpForm() {
	const router = useRouter();
	const { mutate, isPending } = useMutation<
		unknown,
		Error,
		SendRegistrationCode,
		unknown
	>({
		mutationKey: ["register"],
		mutationFn: async (input) => {
			const response = await client.api.auth.register[
				"send-registration-code"
			].$post({
				json: input,
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return { email: input.email };
		},
		onSuccess: (_, { email }) => {
			router.push(
				Routes.verify(undefined, {
					search: {
						email,
					},
				}),
			);
		},
		onError: () => {
			toast.error("Failed to send verification code");
		},
	});

	const form = useForm<SendRegistrationCode>({
		resolver: zodResolver(sendRegistrationCodeSchema),
		defaultValues: {
			email: "",
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((values) => mutate(values))}
				className="w-full px-4 md:px-0 md:w-[350px] mx-auto grid gap-6"
			>
				<div className="grid gap-2 text-start">
					<h1 className="text-3xl font-bold">{SIGN_UP_FORM_STRINGS.label}</h1>
					<p className="text-balance text-muted-foreground">
						{SIGN_UP_FORM_STRINGS.title}
					</p>
				</div>
				<div className="grid gap-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{SIGN_UP_FORM_STRINGS.emailFormLabel}</FormLabel>
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
						name="agree"
						render={({ field }) => (
							<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className="space-y-1 leading-none">
									<FormLabel>By checking this box: </FormLabel>
									<FormDescription>
										You are agreeing to our{" "}
										<Link
											href={Routes.terms()}
											className="text-blue-600 underline"
										>
											Terms of Service
										</Link>{" "}
										and{" "}
										<Link
											href={Routes.privacy()}
											className="text-blue-600 underline"
										>
											Privacy Policy
										</Link>
										.
									</FormDescription>
									<FormMessage />
								</div>
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
							? SIGN_UP_FORM_STRINGS.pendingButton
							: SIGN_UP_FORM_STRINGS.submitButton}
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
                        {SIGN_UP_FORM_STRINGS.googleLogin}
                    </Link> */}
				</div>
				<div className="mt-4 text-center text-sm">
					<Link href="/sign-in" className="underline">
						{SIGN_UP_FORM_STRINGS.backButtonLabel}
					</Link>
				</div>
			</form>
		</Form>
	);
}
