"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import FellowshipGlobe from "@/components/sections/fellowship-globe";
import FellowshipLocations from "@/components/sections/fellowship-locations";
import { Award, Globe } from "lucide-react";
import type { FellowshipPage as FellowshipPageData } from "@/types/sanity";

// Fallback data in case Sanity isn't available
const fallbackData = {
	title: "Fellowship Training",
	subtitle: "Local & International Fellowships",
	description: [
		"It is generally expected that orthopaedic surgeons, from all corners of the world, undergo further subspecialist training after completing their studies. The various training centres Edward has learnt from are on a globe below.",
		"While it is important to get international perspectives and stay up-to-date with modern techniques from around the globe, we are privileged in Australia to have what is consistently ranked as the highest level healthcare in the world. Our health outcomes eclipse those of the USA, UK, greater Eurasia and elsewhere. Our local surgical training program is envied both within Australia as well as abroad. You are likely to receive world-standard orthopaedic care from any surgeon trained in Melbourne, and for this our community is proud.",
		"Upon completing his training, Edward was humbled to be invited by those he trusted most, his mentors Mr Chris Jones and Mr Sam Joseph, to the Bayside Hip & Knee Fellowship in Melbourne. This was a year-long fellowship in public and private practice around the bayside area, focusing on hip and knee surgery. Edward was fortunate to train in two different muscle-sparing hip approaches; the direct anterior and direct superior approach, and gain familiarity with four different robotic systems for the hip and knee. He also gained insights into sport knee injury management.",
		"He has since completed a European travelling fellowship, focused on all aspects of his practice with highly published world experts in various subspecialist areas."
	],
	badgeText: "International Training Excellence",
	globeTitle: "Global Training Network",
	globeDescription: "Click anywhere on the globe or use the location buttons below to explore fellowship details.",
	locationsTitle: "Fellowship Locations & Mentors",
	locationsDescription: "Meet the world-class surgeons and institutions that have shaped Mr O'Bryan's expertise."
};

export default function FellowshipPage() {
	const [fellowshipData, setFellowshipData] = useState<FellowshipPageData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchFellowshipData = async () => {
			try {
				const response = await fetch('/api/fellowship');
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				
				const data = await response.json();
				
				if (data && !data.error) {
					setFellowshipData(data);
					console.log('✅ Successfully loaded fellowship data from Sanity');
				} else {
					console.log('📋 Using fallback data - no fellowship data from Sanity');
				}
			} catch (error) {
				console.error('❌ Error loading fellowship data from Sanity:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchFellowshipData();
	}, []);

	const pageData = fellowshipData || fallbackData;

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading fellowship data...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<section className="relative bg-gradient-to-br from-blue-50 to-white pt-32 pb-16">
				<Container>
					<div className="text-center max-w-4xl mx-auto">
						{/* Badge */}
						<div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
							<Globe className="w-4 h-4" />
							{pageData.badgeText}
						</div>

						{/* Title */}
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-sans">
							{pageData.title}
						</h1>
						<h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-blue-600 mb-8">
							{pageData.subtitle}
						</h2>

						{/* Description */}
						<div className="space-y-6 text-lg text-gray-600 leading-relaxed">
							{pageData.description.map((paragraph: string, index: number) => (
								<p key={index} className="text-left sm:text-center">
									{paragraph}
								</p>
							))}
						</div>
					</div>
				</Container>
			</section>

			{/* 3D Globe Section */}
			<section className="py-16 bg-white">
				<Container>
					<div className="text-center mb-12">
						<h3 className="text-3xl font-bold text-gray-900 mb-4">
							{pageData.globeTitle}
						</h3>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							{pageData.globeDescription}
						</p>
					</div>
					
					{/* Globe Component */}
					<div className="h-[600px] rounded-2xl bg-gradient-to-br from-blue-50 to-gray-50 overflow-hidden mb-8">
						<FellowshipGlobe fellowshipData={fellowshipData} />
					</div>

					{/* Interaction Instructions */}
					<div className="bg-blue-50 rounded-xl p-6 text-center">
						<h4 className="text-lg font-semibold text-blue-900 mb-2">
							Interactive Globe
						</h4>
						<p className="text-blue-700 mb-4">
							Click anywhere on the globe above to cycle through fellowship locations and explore detailed training information.
						</p>
						<div className="flex justify-center items-center gap-4 text-sm text-blue-600">
							<span>🖱️ Click to explore locations</span>
							<span>🔄 Globe auto-rotates</span>
							<span>📍 {fellowshipData?.fellowshipLocations?.length || 7} fellowship locations</span>
						</div>
					</div>
				</Container>
			</section>

			{/* Fellowship Locations */}
			<section className="py-16 bg-gray-50">
				<Container>
					<div className="text-center mb-12">
						<div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
							<Award className="w-4 h-4" />
							Training Excellence
						</div>
						<h3 className="text-3xl font-bold text-gray-900 mb-4">
							{pageData.locationsTitle}
						</h3>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							{pageData.locationsDescription}
						</p>
					</div>
					
					<FellowshipLocations fellowshipData={fellowshipData} />
				</Container>
			</section>
		</div>
	);
}