import { Button } from "@/components/ui/button";
import { Award, Users } from "lucide-react";
import { getHeroSection } from "@/lib/sanity-queries";
import { getResponsiveImageProps } from "@/lib/sanity-image";
import Image from "next/image";

interface HeroImage {
	asset: {
		_ref: string;
		_type: "reference";
	};
	alt?: string;
}

interface HeroData {
	title: string;
	secondTitle?: string;
	subtitle: string;
	heroImage: HeroImage | null;
	ctaButtonText: string;
	doctorName: string;
	credentials: string;
	description: string;
}

export default async function Hero() {
	let heroData: HeroData;

	try {
		const data = await getHeroSection();
		if (data) {
			heroData = data;
		} else {
			// Fallback to default data
			heroData = {
				title: "Edward O'Bryan",
				secondTitle: "Orthopaedic Hip & Knee Surgeon",
				subtitle:
					"Robotic Joint replacement, sport knee injuries, knee preservation surgery",
				heroImage: null,
				ctaButtonText: "Schedule Consultation",
				doctorName: "Dr. Edward O'Bryan",
				credentials: "Board-Certified Orthopaedic Surgeon",
				description:
					"Mr Edward O’Bryan is a consultant Orthopaedic Surgeon, with subspecialist expertise in hip and knee surgery, as well as traumatic sports injuries of the lower limb. He has been trained both at home and in various international centres.",
			};
		}
	} catch (error) {
		console.error("Failed to fetch hero data:", error);
		// Fallback to default data
		heroData = {
			title: "Edward O'Bryan",
			secondTitle: "Orthopaedic Hip & Knee Surgeon",
			subtitle:
				"Robotic Joint replacement, sport knee injuries, knee preservation surgery",
			heroImage: null,
			ctaButtonText: "Schedule Consultation",
			doctorName: "Dr. Edward O'Bryan",
			credentials: "Board-Certified Orthopaedic Surgeon",
			description:
				"Mr Edward O’Bryan is a consultant Orthopaedic Surgeon, with subspecialist expertise in hip and knee surgery, as well as traumatic sports injuries of the lower limb. He has been trained both at home and in various international centres..",
		};
	}
	return (
		<section className="relative min-h-[90vh] bg-gray-100 overflow-hidden">
			{/* Main Container with Curved Division */}
			<div className="relative h-full">
				{/* Blue Content Area with Curved Edge */}
				<div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700">
					{/* Curved SVG Shape - Enhanced left-side design */}
					<div className="absolute inset-0">
						<svg
							className="absolute inset-0 w-full h-full"
							viewBox="0 0 1200 700"
							preserveAspectRatio="xMidYMid slice"
						>
							<path
								d="M0,0 L0,700 L750,700 Q850,350 750,0 Z"
								fill="currentColor"
								className="text-blue-600"
							/>
							<path
								d="M0,0 L0,700 L700,700 Q800,350 700,0 Z"
								fill="currentColor"
								className="text-blue-700"
							/>
						</svg>
					</div>

					{/* Background Pattern - Circles on left side over blue background */}
					<div className="absolute inset-0 overflow-hidden">
						{/* Large circle pattern in left area extending upward */}
						<div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full -translate-y-24"></div>
						<div className="absolute top-20 left-1/6 w-64 h-64 bg-white/3 rounded-full"></div>
						<div className="absolute top-32 left-1/3 w-32 h-32 bg-white/8 rounded-full"></div>
						<div className="absolute top-10 left-1/5 w-48 h-48 bg-white/4 rounded-full"></div>
						<div className="absolute top-40 left-2/5 w-20 h-20 bg-white/6 rounded-full"></div>

						{/* Additional scattered circles for pattern */}
						<div className="absolute top-60 left-1/8 w-16 h-16 bg-white/5 rounded-full"></div>
						<div className="absolute top-5 left-1/3 w-24 h-24 bg-white/3 rounded-full"></div>
						<div className="absolute top-72 left-1/6 w-28 h-28 bg-white/4 rounded-full"></div>
					</div>
				</div>

				{/* Content Grid */}
				<div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
					<div className="grid lg:grid-cols-5 gap-8 items-center py-24 w-full min-h-[90vh]">
						{/* Left Content Area - Takes 2 columns */}
						<div className="lg:col-span-2 text-white">
							<div className="mb-6">
								<h1 className="text-4xl lg:text-6xl font-bold leading-tight font-sans">
									{heroData.title}
								</h1>
								{heroData.secondTitle && (
									<h2 className="text-4xl lg:text-6xl font-bold leading-tight font-sans">
										{heroData.secondTitle}
									</h2>
								)}
							</div>

							<p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-lg">
								{heroData.subtitle}
							</p>

							<div className="mb-12">
								<Button
									size="lg"
									className="bg-cyan-400 hover:bg-cyan-500 text-blue-900 text-lg px-8 py-4 h-auto rounded-lg font-semibold"
								>
									{heroData.ctaButtonText}
								</Button>
							</div>

							{/* Professional Info Card */}
							<div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 max-w-md">
								<div className="flex items-center gap-4 mb-4">
									<div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
										<Award className="w-6 h-6 text-white" />
									</div>
									<div>
										<h4 className="font-bold text-white text-lg">
											{heroData.doctorName}
										</h4>
										<p className="text-blue-100">
											{heroData.credentials}
										</p>
									</div>
								</div>
								<p className="text-blue-100 text-sm leading-relaxed">
									{heroData.description}
								</p>
							</div>
						</div>

						{/* Right Image Area - Takes 3 columns */}
						<div className="lg:col-span-3 relative h-full">
							{/* Medical Image Container - Much larger and taller */}
							<div className="aspect-[3/2] lg:aspect-[4/3] rounded-2xl overflow-hidden relative h-full min-h-[500px] lg:min-h-[600px]">
								{heroData.heroImage ? (
									(() => {
										const imageProps =
											getResponsiveImageProps(
												heroData.heroImage,
												heroData.heroImage.alt ||
													`${heroData.doctorName} - Orthopaedic Surgeon`
											);

										if (!imageProps) return null;

										return (
											<>
												{/* Optimized Next.js Image with Sanity */}
												<Image
													src={imageProps.src}
													alt={imageProps.alt}
													fill
													className="object-cover"
													sizes="(max-width: 768px) 100vw, 50vw"
													priority
												/>
												{/* Overlay for better text contrast */}
												{/* <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-900/40 z-10" /> */}
											</>
										);
									})()
								) : (
									<>
										{/* Fallback when no image */}
										<div className="absolute inset-0 bg-gray-800/40 backdrop-blur-sm border border-gray-600/30">
											<div className="absolute inset-0 bg-gradient-to-br from-gray-600/20 to-gray-800/60">
												<div className="absolute inset-0 flex items-center justify-center">
													<div className="text-center text-white">
														<Users className="w-32 h-32 mx-auto mb-6 opacity-60" />
														<h3 className="text-2xl font-semibold mb-3">
															Medical Consultation
														</h3>
														<p className="text-gray-300 text-base">
															Professional
															orthopaedic care
														</p>
													</div>
												</div>
											</div>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
