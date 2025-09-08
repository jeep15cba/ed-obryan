import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
	Award,
	Users,
	Clock,
	ArrowRight,
	Shield,
	Target,
	Heart,
} from "lucide-react";
import { getAboutSection } from "@/lib/sanity-queries";
import { getResponsiveImageProps } from "@/lib/sanity-image";
import Image from "next/image";

interface AboutImage {
	asset: {
		_ref: string;
		_type: "reference";
	};
	alt?: string;
	objectPosition?: string;
}

interface AboutSpecialty {
	title: string;
	description: string;
	icon: string;
}

interface AboutStatistics {
	patientsCount: string;
	patientsDescription: string;
	experienceCount: string;
	experienceDescription: string;
}

interface AboutQualifications {
	primary: string;
	secondary: string;
	description: string;
}

interface AboutData {
	badgeText: string;
	title: string;
	titleHighlight: string;
	description: string;
	specialties: AboutSpecialty[];
	ctaButtonText: string;
	statistics: AboutStatistics;
	qualifications: AboutQualifications;
	professionalImage: AboutImage | null;
}

// Icon mapping function
function getIconComponent(iconName: string) {
	const icons: Record<string, React.ComponentType<{ className?: string }>> = {
		Target,
		Heart,
		Award,
		Shield,
		Users,
		Clock,
	};
	return icons[iconName] || Target;
}

export default async function About() {
	let aboutData: AboutData;

	try {
		const data = await getAboutSection();
		if (data) {
			aboutData = data;
		} else {
			// Fallback to default data
			aboutData = {
				badgeText: "About Mr O'Bryan",
				title: "Leading Expert in",
				titleHighlight: "Orthopaedic Surgery",
				description:
					"With over 15 years of dedicated experience, Mr Edward O'Bryan is a renowned orthopaedic surgeon specialising in hip and knee surgery, sports medicine, and advanced robotic joint replacement procedures.",
				specialties: [
					{
						title: "Specialised Expertise",
						description:
							"Robotic joint replacement, sport knee injuries, and knee preservation surgery",
						icon: "Target",
					},
					{
						title: "Patient-Centred Care",
						description:
							"Comprehensive treatment plans tailored to individual patient needs and goals",
						icon: "Heart",
					},
					{
						title: "Advanced Training",
						description:
							"Fellowship training in Australia and internationally with leading orthopaedic centres",
						icon: "Award",
					},
				],
				ctaButtonText: "Learn More About Mr O'Bryan",
				statistics: {
					patientsCount: "2000+",
					patientsDescription: "Successful surgeries performed",
					experienceCount: "15+",
					experienceDescription: "Years in orthopaedic surgery",
				},
				qualifications: {
					primary: "MBBS (Honours), FRACS",
					secondary: "FAOrthA, PG Dip SurgAnat",
					description:
						"Fellow of Royal Australasian College of Surgeons",
				},
				professionalImage: null,
			};
		}
	} catch (error) {
		console.error("Failed to fetch about data:", error);
		// Fallback to default data
		aboutData = {
			badgeText: "About Mr O'Bryan",
			title: "Leading Expert in",
			titleHighlight: "Orthopaedic Surgery",
			description:
				"With over 15 years of dedicated experience, Mr Edward O'Bryan is a renowned orthopaedic surgeon specialising in hip and knee surgery, sports medicine, and advanced robotic joint replacement procedures.",
			specialties: [
				{
					title: "Specialised Expertise",
					description:
						"Robotic joint replacement, sport knee injuries, and knee preservation surgery",
					icon: "Target",
				},
				{
					title: "Patient-Centred Care",
					description:
						"Comprehensive treatment plans tailored to individual patient needs and goals",
					icon: "Heart",
				},
				{
					title: "Advanced Training",
					description:
						"Fellowship training in Australia and internationally with leading orthopaedic centres",
					icon: "Award",
				},
			],
			ctaButtonText: "Learn More About Mr O'Bryan",
			statistics: {
				patientsCount: "2000+",
				patientsDescription: "Successful surgeries performed",
				experienceCount: "15+",
				experienceDescription: "Years in orthopaedic surgery",
			},
			qualifications: {
				primary: "MBBS (Honours), FRACS",
				secondary: "FAOrthA, PG Dip SurgAnat",
				description: "Fellow of Royal Australasian College of Surgeons",
			},
			professionalImage: null,
		};
	}

	return (
		<section className="py-20 bg-gray-50">
			<Container>
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					{/* Content */}
					<div>
						<div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
							<Shield className="w-4 h-4" />
							{aboutData.badgeText}
						</div>

						<h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-sans">
							{aboutData.title}
							<span className="text-blue-600">
								{" "}
								{aboutData.titleHighlight}
							</span>
						</h2>

						<p className="text-lg text-gray-600 mb-8 leading-relaxed">
							{aboutData.description}
						</p>

						<div className="space-y-4 mb-8">
							{aboutData.specialties.map((specialty, index) => {
								const IconComponent = getIconComponent(
									specialty.icon
								);
								return (
									<div
										key={index}
										className="flex items-start gap-4"
									>
										<div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<IconComponent className="w-4 h-4 text-blue-600" />
										</div>
										<div>
											<h4 className="font-semibold text-gray-900 mb-1">
												{specialty.title}
											</h4>
											<p className="text-gray-600">
												{specialty.description}
											</p>
										</div>
									</div>
								);
							})}
						</div>

						<Button size="lg">
							{aboutData.ctaButtonText}
							<ArrowRight className="w-4 h-4 ml-2" />
						</Button>
					</div>
					{/* Image and Qualifications */}
					<div className="space-y-8">
						{/* Professional Image - Better Portrait Ratio */}
						<div className="aspect-[3/4] rounded-2xl overflow-hidden relative bg-gradient-to-br from-gray-100 to-gray-200">
							{aboutData.professionalImage ? (
								(() => {
									const imageProps = getResponsiveImageProps(
										aboutData.professionalImage,
										aboutData.professionalImage.alt ||
											"Mr Edward O'Bryan - Professional Photo"
									);

									if (!imageProps) return null;

									return (
										<Image
											src={imageProps.src}
											alt={imageProps.alt}
											fill
											className="object-cover"
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
										/>
									);
								})()
							) : (
								<div className="h-full flex items-center justify-center">
									<div className="text-center text-gray-500">
										<Award className="w-16 h-16 mx-auto mb-3" />
										<p className="font-medium">
											Professional Photo
										</p>
										<p className="text-sm">
											Mr O&apos;Bryan with patients
										</p>
									</div>
								</div>
							)}
						</div>

						{/* Qualifications */}
						<div className="bg-white p-6 rounded-xl border border-gray-200">
							<div className="flex items-center gap-3 mb-3">
								<Award className="w-6 h-6 text-blue-600" />
								<h4 className="font-semibold text-gray-900">
									Qualifications
								</h4>
							</div>
							<div className="space-y-1">
								<p className="text-sm font-medium text-gray-900">
									{aboutData.qualifications.primary}
								</p>
								<p className="text-sm text-gray-600">
									{aboutData.qualifications.secondary}
								</p>
								<p className="text-xs text-gray-500">
									{aboutData.qualifications.description}
								</p>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}
