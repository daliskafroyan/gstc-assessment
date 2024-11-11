"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";

export function PasswordInput({
	className,
	...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
	ref: React.Ref<HTMLInputElement>;
}) {
	const [showPassword, setShowPassword] = React.useState(false);

	return (
		<div className="flex gap-2">
			<input
				type={showPassword ? "text" : "password"}
				className={cn(
					"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
				{...props}
			/>

			<Button
				type="button"
				variant="ghost"
				size="icon"
				className={cn(
					"text-sm",
					"text-muted-foreground",
					"focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
					"disabled:cursor-not-allowed disabled:opacity-50",
				)}
				onClick={() => setShowPassword(!showPassword)}
			>
				{showPassword ? <EyeIcon /> : <EyeOffIcon />}
			</Button>
		</div>
	);
}
