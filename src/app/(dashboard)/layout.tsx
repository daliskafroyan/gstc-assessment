import { AppBreadcrumb } from "@/app/(dashboard)/breadcrumb.component";
import { AppSidebar } from "@/components/app-sidebar";
import { AuthProvider } from "@/components/auth-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { ensureAuthenticated } from "@/lib/utils.server";
import type { ReactNode } from "react";

export default async function DashboardLayout({
	children,
}: { children: ReactNode }) {
	const user = await ensureAuthenticated();

	return (
		<AuthProvider user={user}>
			<SidebarProvider>
				<AppSidebar user={user} />
				<SidebarInset>
					<main className="px-4">
						<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
							<div className="flex items-center justify-between w-full">
								<div className="flex items-center gap-2">
									<SidebarTrigger className="-ml-1" />
									<Separator orientation="vertical" className="mr-2 h-4" />
									<AppBreadcrumb />
								</div>
								<ThemeToggle />
							</div>
						</header>
						{children}
					</main>
				</SidebarInset>
			</SidebarProvider>
		</AuthProvider>
	);
}
