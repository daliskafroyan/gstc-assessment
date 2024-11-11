"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { PasswordInput } from "@/components/ui/password-input";
import { Routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { type Verify, verifySchema } from "@/schemas/auth";
import { client } from "@/server/client";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const VERIFY_FORM_STRINGS = {
    label: "Verify your account",
    title: "Enter the verification code sent to your email and set up your password.",
    codeLabel: "Verification Code",
    codeDescription: "Check your email for the code.",
    emailLabel: "Email",
    passwordLabel: "Password",
    passwordDescription: "Choose a strong password for your account.",
    pendingButton: "Verifying...",
    submitButton: "Complete Registration",
};

export function VerifyForm({ email }: { email: string }) {
    const form = useForm<Verify>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            confirmationCode: "",
            email,
            password: "",
        },
        criteriaMode: "all",
    });

    const router = useRouter();
    const { mutate, isPending } = useMutation<unknown, Error, Verify>({
        mutationKey: ["user-verification"],
        mutationFn: async (json) => {
            const response = await client.api.auth.register.verify.$post({
                json,
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }
        },
        onSuccess: () => {
            router.push(Routes.dashboard());
        },
        onError: () => {
            toast.error("Registration failed. Please try again.");
        },
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((values) => mutate(values))}
                className="w-full px-4 md:px-0 md:w-[350px] mx-auto grid gap-6"
            >
                <div className="grid gap-2 text-start">
                    <h1 className="text-3xl font-bold">{VERIFY_FORM_STRINGS.label}</h1>
                    <p className="text-balance text-muted-foreground">
                        {VERIFY_FORM_STRINGS.title}
                    </p>
                </div>
                <div className="grid gap-4">
                    <FormField
                        control={form.control}
                        name="confirmationCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{VERIFY_FORM_STRINGS.codeLabel}</FormLabel>
                                <FormDescription>
                                    {VERIFY_FORM_STRINGS.codeDescription}
                                </FormDescription>
                                <FormControl>
                                    <InputOTP maxLength={8} {...field}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                            <InputOTPSlot index={6} />
                                            <InputOTPSlot index={7} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{VERIFY_FORM_STRINGS.emailLabel}</FormLabel>
                                <FormControl>
                                    <Input readOnly {...field} />
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
                                <FormLabel>{VERIFY_FORM_STRINGS.passwordLabel}</FormLabel>
                                <FormDescription>
                                    {VERIFY_FORM_STRINGS.passwordDescription}
                                </FormDescription>
                                <FormControl>
                                    <PasswordInput {...field} />
                                </FormControl>
                                <ErrorMessage
                                    errors={form.formState.errors}
                                    name={field.name}
                                    render={({ messages }) =>
                                        messages &&
                                        Object.entries(messages).map(([type, message]) => (
                                            <p
                                                className="text-sm font-medium text-destructive"
                                                key={type}
                                            >
                                                {message}
                                            </p>
                                        ))
                                    }
                                />
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
                            ? VERIFY_FORM_STRINGS.pendingButton
                            : VERIFY_FORM_STRINGS.submitButton}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
