"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavigationItem, SanityNavigationData, SanityNavigationService, SanityNavigationItem } from "@/types/sanity";

interface HeaderProps {
  initialNavigationData?: SanityNavigationData | null;
}

// Transform Sanity navigation data to NavigationItem format
const transformNavigationData = (data: SanityNavigationData): NavigationItem[] => {
	const navigationItems: NavigationItem[] = [];

	// Use full navigation structure from Sanity if available
	if (data.navigationItems && data.navigationItems.length > 0) {
		data.navigationItems.forEach((item: SanityNavigationItem) => {
			if (item.isActive === false) return; // Skip inactive items
			
			let dropdown: NavigationItem['dropdown'];
			
			// Handle dropdowns
			if (item.hasDropdown) {
				// Auto-populate service dropdowns
				if (item.autoPopulate?.enabled && data.services) {
					const matchingService = data.services.find((service: SanityNavigationService) => 
						service.title === item.title || item.href?.includes(service.slug.current)
					);
					
					if (matchingService && matchingService.conditions) {
						dropdown = matchingService.conditions.map((condition) => ({
							name: condition.title,
							href: `/${matchingService.slug.current}/${condition.slug.current}`,
						}));
					}
				}
				
				// Add manual dropdown items
				if (item.dropdownItems && item.dropdownItems.length > 0) {
					const manualItems = item.dropdownItems.map((dropItem) => ({
						name: dropItem.title,
						href: dropItem.href
					}));
					dropdown = dropdown ? [...dropdown, ...manualItems] : manualItems;
				}
			}

			navigationItems.push({
				name: item.title,
				href: item.href || '#',
				dropdown: dropdown && dropdown.length > 0 ? dropdown : undefined,
			});
		});

		return navigationItems;
	}

	// Fallback: Use services-based navigation (previous approach)
	const baseNavigation: NavigationItem[] = [
		{ name: "Home", href: "/" },
		{
			name: "About",
			href: "/about",
			dropdown: [
				{ name: "Mr Ed O'Bryan", href: "/about/edward-obryan" },
				{ name: "Fellowship", href: "/about/fellowship" },
			],
		},
	];

	if (data.services) {
		const serviceOrder = ['conditions', 'sport-knee-surgery', 'hip-and-knee-replacement'];
		const sortedServices = data.services.sort((a: SanityNavigationService, b: SanityNavigationService) => {
			const aIndex = serviceOrder.indexOf(a.slug.current);
			const bIndex = serviceOrder.indexOf(b.slug.current);
			if (aIndex === -1) return 1;
			if (bIndex === -1) return -1;
			return aIndex - bIndex;
		});

		sortedServices.forEach((service: SanityNavigationService) => {
			const serviceSlug = service.slug.current;
			const dropdown = service.conditions?.map((condition) => {
				const conditionSlug = condition.slug?.current || condition.slug;
				return {
					name: condition.title,
					href: `/${serviceSlug}/${conditionSlug}`,
				};
			}).filter(item => item.href && item.name) || [];

			baseNavigation.push({
				name: service.title,
				href: `/${serviceSlug}`,
				dropdown: dropdown.length > 0 ? dropdown : undefined,
			});
		});
	}

	baseNavigation.push(
		{ name: "Elite Athlete Support", href: "/elite-athlete-support" },
		{ name: "Patient Info", href: "/patient-info" },
		{
			name: "Contact",
			href: "/contact",
			dropdown: [
				{ name: "Refer", href: "/refer" },
			],
		}
	);

	return baseNavigation;
};

// Fallback navigation in case Sanity is not available
const fallbackNavigation: NavigationItem[] = [
	{ name: "Home", href: "/" },
	{ name: "About", href: "/about" },
	{ name: "Conditions", href: "/conditions" },
	{ name: "Sport Knee Surgery", href: "/sport-knee-surgery" },
	{ name: "Hip & Knee Replacement", href: "/hip-and-knee-replacement" },
	{ name: "Elite Athlete Support", href: "/elite-athlete-support" },
	{ name: "Patient Info", href: "/patient-info" },
	{ name: "Contact", href: "/contact" },
];

export default function Header({ initialNavigationData }: HeaderProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const [navigation, setNavigation] = useState<NavigationItem[]>(() => {
		// Use initial data if available, otherwise fallback
		if (initialNavigationData && initialNavigationData.services) {
			return transformNavigationData(initialNavigationData);
		}
		return fallbackNavigation;
	});
	const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const handleMouseEnter = (itemName: string) => {
		if (dropdownTimeoutRef.current) {
			clearTimeout(dropdownTimeoutRef.current);
		}
		setActiveDropdown(itemName);
	};

	const handleMouseLeave = () => {
		dropdownTimeoutRef.current = setTimeout(() => {
			setActiveDropdown(null);
		}, 150); // Small delay to prevent accidental closes
	};

	useEffect(() => {
		// Only fetch if we don't have initial navigation data
		if (!initialNavigationData) {
			const fetchNavigation = async () => {
				try {
					const response = await fetch('/api/navigation');
					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
					
					const navigationData = await response.json();
					
					if (navigationData && navigationData.services && !navigationData.error) {
						const dynamicNavigation = transformNavigationData(navigationData);
						setNavigation(dynamicNavigation);
						console.log('✅ Successfully loaded dynamic navigation from Sanity:', dynamicNavigation.length, 'items');
					} else {
						console.log('📋 Using fallback navigation - no services data from Sanity');
						setNavigation(fallbackNavigation);
					}
				} catch (error) {
					console.error('❌ Error loading navigation from Sanity:', error);
					setNavigation(fallbackNavigation);
				}
			};

			fetchNavigation();
		}
		
		return () => {
			if (dropdownTimeoutRef.current) {
				clearTimeout(dropdownTimeoutRef.current);
			}
		};
	}, [initialNavigationData]);

	return (
		<>
			{/* Top Banner - Hidden on mobile for better space utilization */}
			<div className="hidden sm:block fixed top-0 w-full z-50 bg-gray-800 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between py-2 text-sm">
						<div className="flex items-center space-x-4">
							<span className="text-xs sm:text-sm">Expert Orthopaedic Care Available</span>
						</div>
						<div className="hidden md:flex items-center space-x-4">
							<span className="text-xs">Follow us:</span>
							<div className="flex space-x-2">
								<div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-xs font-medium hover:bg-blue-700 transition-colors cursor-pointer">
									f
								</div>
								<div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center text-xs font-medium hover:bg-gray-700 transition-colors cursor-pointer">
									x
								</div>
								<div className="w-6 h-6 bg-blue-700 rounded flex items-center justify-center text-xs font-medium hover:bg-blue-800 transition-colors cursor-pointer">
									in
								</div>
								<div className="w-6 h-6 bg-pink-600 rounded flex items-center justify-center text-xs font-medium hover:bg-pink-700 transition-colors cursor-pointer">
									ig
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Header - Mobile-first positioning */}
			<header className="fixed top-0 sm:top-10 w-full z-40 bg-white border-b border-gray-200 shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between py-4 sm:py-6">
						{/* Logo - Responsive sizing */}
						<Link
							href="/"
							className="flex items-center space-x-3 flex-shrink-0"
						>
							<div className="text-xl sm:text-2xl font-bold text-blue-600 font-sans">
								Edward O&apos;Bryan
							</div>
						</Link>

						{/* Desktop Navigation */}
						<nav className="hidden lg:flex items-center space-x-10 flex-grow justify-center">
							{navigation.map((item) => (
								<div
									key={item.name}
									className="relative"
									onMouseEnter={() =>
										item.dropdown &&
										handleMouseEnter(item.name)
									}
									onMouseLeave={handleMouseLeave}
								>
									<Link
										href={item.href}
										className={cn(
											"text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 text-base py-2",
											item.dropdown && "flex items-center"
										)}
									>
										{item.name}
										{item.dropdown && (
											<ChevronDown className="w-4 h-4 ml-1" />
										)}
									</Link>

									{/* Dropdown Menu */}
									{item.dropdown &&
										activeDropdown === item.name && (
											<div className="absolute top-full left-0 pt-2 w-56 z-50">
												<div className="bg-white rounded-lg shadow-xl border border-gray-200 py-2">
													{item.dropdown.map(
														(subItem) => (
															<Link
																key={
																	subItem.name
																}
																href={
																	subItem.href
																}
																className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors text-sm"
															>
																{subItem.name}
															</Link>
														)
													)}
												</div>
											</div>
										)}
								</div>
							))}
						</nav>

						{/* CTA Section - Better mobile handling */}
						<div className="hidden md:flex items-center space-x-4 lg:space-x-6 flex-shrink-0">
							<div className="hidden lg:flex items-center space-x-2 text-gray-600">
								<Phone className="w-4 h-4" />
								<span className="text-sm font-medium">
									0405 556 622
								</span>
							</div>
							<Button size="lg">
								Book Appointment
							</Button>
						</div>

						{/* Mobile menu button - Better touch target */}
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="md:hidden p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
							aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
						>
							{isMenuOpen ? (
								<X className="w-6 h-6" />
							) : (
								<Menu className="w-6 h-6" />
							)}
						</button>
					</div>

					{/* Mobile Navigation - Enhanced touch targets and spacing */}
					{isMenuOpen && (
						<div className="md:hidden border-t border-gray-100 bg-white shadow-lg">
							<div className="py-4 space-y-1 max-h-[70vh] overflow-y-auto">
								{navigation.map((item) => (
									<div key={item.name}>
										<Link
											href={item.href}
											className="block px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium transition-colors text-base"
											onClick={() => setIsMenuOpen(false)}
										>
											{item.name}
										</Link>
										{item.dropdown && (
											<div className="bg-gray-50 border-l-4 border-blue-200 space-y-1">
												{item.dropdown.map(
													(subItem) => (
														<Link
															key={subItem.name}
															href={subItem.href}
															className="block px-8 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-white transition-colors"
															onClick={() =>
																setIsMenuOpen(
																	false
																)
															}
														>
															{subItem.name}
														</Link>
													)
												)}
											</div>
										)}
									</div>
								))}
								{/* Mobile Contact Info */}
								<div className="px-6 pt-4 border-t border-gray-100 mt-4">
									<div className="flex items-center space-x-2 text-gray-600 mb-4 justify-center">
										<Phone className="w-4 h-4" />
										<span className="text-sm font-medium">
											0405 556 622
										</span>
									</div>
									<Button size="lg" className="w-full">
										Book Appointment
									</Button>
								</div>
							</div>
						</div>
					)}
				</div>
			</header>
		</>
	);
}
