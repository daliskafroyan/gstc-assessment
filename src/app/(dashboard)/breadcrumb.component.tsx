"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const getBreadcrumbs = (path: string) => {
	const segments = path
		.split("/")
		.filter((segment) => segment && segment !== "(dashboard)");

	return segments.map((segment, index) => {
		const href = `/${segments.slice(0, index + 1).join("/")}`;
		const label =
			segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

		return { href, label };
	});
};

export function AppBreadcrumb() {
	const pathname = usePathname();
	const breadcrumbs = getBreadcrumbs(pathname);

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbs.map((crumb, index) => (
					<>
						{index > 0 && (
							<BreadcrumbSeparator
								key={`sep-${crumb.href}`}
								className="hidden md:block"
							/>
						)}
						<BreadcrumbItem
							key={`item-${crumb.href}`}
							className="hidden md:block"
						>
							{index === breadcrumbs.length - 1 ? (
								<BreadcrumbPage>{crumb.label}</BreadcrumbPage>
							) : (
								<BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
							)}
						</BreadcrumbItem>
					</>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
