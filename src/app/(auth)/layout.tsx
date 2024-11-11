import { ThemeToggle } from "@/components/theme-toggle";
import { getUser } from "@/lib/utils.server";
import { Routes } from "@/lib/routes";
import Image from "next/image";
import { redirect } from "next/navigation";

interface AuthLayoutProps {
	children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
	const user = await getUser();
	
	if (user) {
		redirect(Routes.dashboard());
	}

	return (
		<div className="min-h-screen w-full flex flex-col justify-center items-center">
			<section className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-screen">
				<div className="flex items-center justify-center py-12 relative min-h-screen lg:min-h-fit">
					<div className="absolute top-4 left-4 md:top-8 md:left-20">
						<Image
							src="/gstc-logo.png"
							alt="GSTC Logo"
							width={150}
							height={100}
							className="w-[100px] md:w-[150px]"
							objectFit="contain"
						/>
					</div>
					<div className="absolute top-4 right-4 md:top-8 md:right-12">
						<ThemeToggle />
					</div>
					{children}
				</div>

				<div className="hidden lg:block">
					<Image
						src="/auth-banner.jpg"
						alt="Image"
						width="1920"
						height="1080"
						className="size-full object-cover"
						style={{ objectFit: "cover", overflow: "hidden" }}
					/>
				</div>
			</section>
		</div>
	);
}
