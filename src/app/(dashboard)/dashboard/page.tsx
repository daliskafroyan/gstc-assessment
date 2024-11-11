"use client";

import { useAuth } from "@/components/auth-provider";

export default function DashboardPage() {
	const { user } = useAuth();
	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold">Hello, {user.email}!</h1>
		</div>
	);
}
