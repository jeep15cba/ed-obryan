"use client";

import { useEffect, useRef, useState, useMemo } from 'react';
import { User, Award, MapPin, X, GraduationCap } from 'lucide-react';
import type { FellowshipPage, FellowshipLocation } from '@/types/sanity';

interface FellowshipGlobeProps {
  fellowshipData?: FellowshipPage | null;
}

// Location data for the fellowship training centers with detailed mentor information
const fellowshipLocations = [
  {
    id: 'melbourne',
    name: "Melbourne",
    country: "Australia",
    lat: -37.8136,
    lng: 144.9631,
    color: '#3B82F6',
    size: 0.8,
    flag: "🇦🇺",
    description: "Bayside Hip & Knee Fellowship - Year-long fellowship in public and private practice focusing on hip and knee surgery with advanced robotic systems.",
    mentors: [
      {
        name: "Chris Jones",
        title: "Mr Chris Jones",
        description: "Hip & knee replacement specialist in the bayside of Melbourne, with expertise in robotic surgery and superior approach hip replacement. He is involved in various research projects with Mr O'Bryan.",
        expertise: ["Robotic Surgery", "Superior Approach Hip Replacement", "Research Collaboration"]
      },
      {
        name: "Sam Joseph", 
        title: "Mr Sam Joseph",
        description: "Hip & knee specialist in the bayside of Melbourne, with expertise in anterior approach hip replacement, robotic knee surgery and sport knee injuries. He is involved in various research projects with Mr O'Bryan.",
        expertise: ["Anterior Approach Hip Replacement", "Robotic Knee Surgery", "Sport Knee Injuries"]
      }
    ]
  },
  {
    id: 'perth',
    name: "Perth",
    country: "Australia", 
    lat: -31.9505,
    lng: 115.8605,
    color: '#10B981',
    size: 0.6,
    flag: "🇦🇺",
    description: "Sport surgery training focused on elite and professional athletes with internationally renowned expertise.",
    mentors: [
      {
        name: "Peter D'Alessandro",
        title: "A/Prof Peter D'Alessandro",
        description: "Sport knee & shoulder specialist in Perth, with a special interest in surgery for elite and professional athletes. He is highly published in these areas, and is active in training international fellows in sport surgery.",
        expertise: ["Elite Athlete Surgery", "Sport Knee Surgery", "Shoulder Surgery", "International Training"]
      }
    ]
  },
  {
    id: 'berlin',
    name: "Berlin",
    country: "Germany",
    lat: 52.5200,
    lng: 13.4050,
    color: '#8B5CF6',
    size: 0.7,
    flag: "🇩🇪",
    description: "World-leading expertise in patellofemoral disorders and advanced knee surgery techniques.",
    mentors: [
      {
        name: "Arno Schmeling",
        title: "Dr Arno Schmeling",
        description: "World-expert in patellofemoral disorders and trochlear dysplasia. He is the Chairman of the Patellofemoral German Knee Society. He is responsible for identifying the landmark surgeons use for the insertion of the MPFL during patella stabilisation surgery.",
        expertise: ["Patellofemoral Disorders", "Trochlear Dysplasia", "MPFL Surgery", "German Knee Society Chairman"]
      }
    ]
  },
  {
    id: 'lyon',
    name: "Lyon",
    country: "France",
    lat: 45.7640,
    lng: 4.8357,
    color: '#F59E0B',
    size: 0.8,
    flag: "🇫🇷", 
    description: "Home to the Lyon School of Knee Surgery and world-renowned expertise in patellofemoral conditions.",
    mentors: [
      {
        name: "David DeJour",
        title: "Dr David DeJour",
        description: "One of the most well-known names in orthopaedic surgery. His father Henri, followed by David, popularised the most-used classification system for trochlear dysplasia. He is by far the most published world-expert in patellofemoral conditions.",
        expertise: ["Patellofemoral Conditions", "Trochlear Dysplasia Classification", "World-Leading Publications"]
      },
      {
        name: "Guillaume Demey",
        title: "Dr Guillaume Demey", 
        description: "Past president of the Lyon School of Knee Surgery, and is highly published in various aspects of hip and knee surgery.",
        expertise: ["Lyon School of Knee Surgery", "Hip Surgery", "Knee Surgery", "Academic Leadership"]
      }
    ]
  },
  {
    id: 'paris',
    name: "Paris",
    country: "France",
    lat: 48.8566,
    lng: 2.3522,
    color: '#EF4444',
    size: 0.7,
    flag: "🇫🇷",
    description: "Advanced training in anterior approach hip replacement and academic excellence at the University of Paris.",
    mentors: [
      {
        name: "Frederic Sailhan",
        title: "Dr Frederic Sailhan",
        description: "Expert in anterior approach hip replacement, as well as joint replacement and sport surgery of the knee. He is a lecturer at The University of Paris, where he completed a PhD.",
        expertise: ["Anterior Approach Hip Replacement", "Joint Replacement", "Sport Knee Surgery", "University of Paris"]
      }
    ]
  },
  {
    id: 'london',
    name: "London",
    country: "United Kingdom",
    lat: 51.5074,
    lng: -0.1278,
    color: '#06B6D4',
    size: 0.7,
    flag: "🇬🇧",
    description: "World-leading expertise in elite athlete knee surgery and sports medicine.",
    mentors: [
      {
        name: "Andy Williams",
        title: "Mr Andy Williams",
        description: "Perhaps the world's best known elite athlete knee surgeon. After training under Mr Peter Myers in Brisbane for his own fellowship, he has since trained many Australian colleagues. He is widely published, most significantly in management of the ACL and MCL.",
        expertise: ["Elite Athlete Surgery", "ACL Surgery", "MCL Surgery", "International Training"]
      }
    ]
  },
  {
    id: 'davos',
    name: "Davos",
    country: "Switzerland", 
    lat: 46.8006,
    lng: 9.8134,
    color: '#84CC16',
    size: 0.6,
    flag: "🇨🇭",
    description: "Home of the AO Foundation - the world's premier orthopaedic trauma training organization.",
    mentors: [
      {
        name: "AO Masters Course",
        title: "AO Masters Trauma Course",
        description: "Mr O'Bryan has repeatedly attended courses in Davos, Switzerland, which is the home of the world's greatest orthopaedic trauma group, Association of Osteosynthesis (AO). Most recently he attended the Masters Trauma Course for the knee and tibia, under the tutelage of world experts such as Shanghai's Cong-Feng Luo, Seattle's Sean Nork and Seoul's Jong-Keon Oh.",
        expertise: ["Trauma Surgery", "Knee Trauma", "Tibia Surgery", "International Faculty"]
      }
    ]
  }
];

// Transform Sanity data to the format expected by the globe component
const transformSanityData = (sanityData: FellowshipPage) => {
  if (!sanityData?.fellowshipLocations) return fellowshipLocations;
  
  return sanityData.fellowshipLocations.map((location) => {
    // Extract the color class to hex color
    const colorMap: { [key: string]: string } = {
      'bg-blue-500': '#3B82F6',
      'bg-green-500': '#10B981',
      'bg-purple-500': '#8B5CF6',
      'bg-yellow-500': '#EAB308',
      'bg-red-500': '#EF4444',
      'bg-cyan-500': '#06B6D4',
      'bg-lime-500': '#84CC16',
      'bg-pink-500': '#EC4899',
      'bg-orange-500': '#F97316',
      'bg-indigo-500': '#6366F1'
    };

    return {
      id: location.city.toLowerCase().replace(/\s+/g, '-'),
      name: location.city,
      country: location.country,
      lat: location.latitude,
      lng: location.longitude,
      color: colorMap[location.color] || '#3B82F6',
      size: location.city === 'Melbourne' ? 0.8 : 0.6, // Melbourne gets larger marker
      flag: location.flag,
      description: location.description,
      mentors: location.mentors.map(mentor => ({
        name: mentor.name,
        title: mentor.title,
        description: mentor.description,
        expertise: mentor.expertise
      }))
    };
  });
};

export default function FellowshipGlobe({ fellowshipData }: FellowshipGlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Memoize the locations array to prevent unnecessary re-renders
  const locations = useMemo(() => {
    return fellowshipData ? transformSanityData(fellowshipData) : fellowshipLocations;
  }, [fellowshipData]);
  
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[0] | null>(null);

  useEffect(() => {
    setIsClient(true);

    // Listen for custom location click events from the quick access buttons
    const handleLocationClick = (event: CustomEvent) => {
      const locationName = event.detail.locationName;
      const location = locations.find(loc => loc.name === locationName);
      if (location) {
        setSelectedLocation(location);
      }
    };

    window.addEventListener('fellowshipLocationClick', handleLocationClick as EventListener);

    return () => {
      window.removeEventListener('fellowshipLocationClick', handleLocationClick as EventListener);
    };
  }, [locations]);

  useEffect(() => {
    if (!isClient || !mountRef.current) return;

    let scene: any, camera: any, renderer: any, globe: any, controls: any;
    let currentLocationIndex = -1; // Track index locally to avoid stale closures
    
    const initGlobe = async () => {
      try {
        setIsLoading(true);
        
        // Import Three.js modules
        const THREE = await import('three');
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
        const ThreeGlobeModule = await import('three-globe');
        
        // Scene setup
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8fafc);

        // Camera setup - make globe smaller on mobile
        const isMobile = window.innerWidth < 1024;
        const cameraDistance = isMobile ? 350 : 250; // Further back on mobile for smaller globe
        
        camera = new THREE.PerspectiveCamera(
          50,
          mountRef.current!.clientWidth / mountRef.current!.clientHeight,
          0.1,
          1000
        );
        camera.position.set(0, 0, cameraDistance);

        // Renderer setup
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(mountRef.current!.clientWidth, mountRef.current!.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current!.appendChild(renderer.domElement);

        // Controls - adjust for mobile
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        controls.minDistance = isMobile ? 200 : 150;
        controls.maxDistance = isMobile ? 500 : 400;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;

        // Create globe
        globe = new ThreeGlobeModule.default()
          .globeImageUrl('https://unpkg.com/three-globe@2.24.0/example/img/earth-blue-marble.jpg')
          .bumpImageUrl('https://unpkg.com/three-globe@2.24.0/example/img/earth-topology.png')
          .showGlobe(true)
          .showAtmosphere(true)
          .atmosphereColor('#3B82F6')
          .atmosphereAltitude(0.15);

        // Add points data (standard globe points)
        globe
          .pointsData(locations)
          .pointColor('color')
          .pointAltitude(0.02)
          .pointRadius((d: any) => d.size * 0.5)
          .pointResolution(12);

        // Add labels
        globe
          .labelsData(locations)
          .labelText((d: any) => d.name)
          .labelColor((d: any) => d.color)
          .labelSize(1.5)
          .labelDotRadius(0.4)
          .labelAltitude(0.05);

        // Let's abandon the coordinate positioning approach entirely
        // and use a much simpler solution: make the visible labels and points themselves clickable
        
        setTimeout(() => {
          console.log('=== SIMPLE APPROACH: MAKING EXISTING OBJECTS CLICKABLE ===');
          
          const clickableObjects: any[] = [];
          
          // Instead of creating new objects, let's just modify the raycasting to work with ANY object
          // and then map the world position back to the closest fellowship location
          
          // Create one large invisible clickable sphere around the entire globe
          const globeClickableGeometry = new THREE.SphereGeometry(120, 32, 32);
          const globeClickableMaterial = new THREE.MeshBasicMaterial({ 
            transparent: true, 
            opacity: 0, // Completely invisible
            side: THREE.DoubleSide // Make it clickable from inside and outside
          });
          const globeClickableMesh = new THREE.Mesh(globeClickableGeometry, globeClickableMaterial);
          globeClickableMesh.userData = { isGlobeClickable: true };
          clickableObjects.push(globeClickableMesh);
          scene.add(globeClickableMesh);
          
          console.log('Added invisible globe sphere for click detection');
          
          // Store the clickable objects reference for raycasting
          (globe as any).clickableObjects = clickableObjects;
          
          console.log('=== END SIMPLE APPROACH ===');
        }, 100);

        // Add click handlers for both labels and points
        const handleSpecificLocationClick = (locationName: string) => {
          console.log('=== SPECIFIC LOCATION CLICKED ===');
          console.log('Clicked location name:', locationName);
          
          const location = locations.find(loc => 
            loc.name === locationName
          );
          if (location) {
            console.log('Found location:', location.name, '(', location.id, ')');
            const locationIndex = locations.findIndex(loc => loc.id === location.id);
            console.log('Setting current index to:', locationIndex);
            
            // Update both local index and state
            currentLocationIndex = locationIndex;
            setSelectedLocation(location);
            
            // Pause auto-rotation when user interacts
            controls.autoRotate = false;
            setTimeout(() => {
              controls.autoRotate = true;
            }, 10000); // Resume after 10 seconds
          } else {
            console.log('Location not found for name:', locationName);
          }
          console.log('=== END SPECIFIC LOCATION CLICK ===');
        };

        // Debug: Check what methods are available on the globe
        console.log('Available globe methods:', Object.getOwnPropertyNames(globe).filter(name => name.includes('click') || name.includes('Click')));
        console.log('Globe prototype methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(globe)).filter(name => name.includes('click') || name.includes('Click')));
        
        // Try to add label click handler
        if (typeof globe.onLabelClick === 'function') {
          console.log('Adding onLabelClick handler');
          globe.onLabelClick((label: any) => {
            console.log('Label clicked:', label);
            handleSpecificLocationClick(label.name || label.text);
          });
        } else {
          console.log('onLabelClick not available');
        }
        
        // Try to add point click handler if available
        if (typeof globe.onPointClick === 'function') {
          console.log('Adding onPointClick handler');
          globe.onPointClick((point: any) => {
            console.log('Point clicked:', point);
            handleSpecificLocationClick(point.name);
          });
        } else {
          console.log('onPointClick not available');
        }

        // Implement custom raycasting for detecting clicks on specific locations
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        
        const detectLocationClick = (event: MouseEvent) => {
          if (isDragging) return null;
          
          // Calculate mouse position in normalized device coordinates (-1 to +1)
          const rect = canvas.getBoundingClientRect();
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
          
          console.log('=== RAYCASTING DEBUG ===');
          console.log('Mouse position:', mouse.x.toFixed(3), mouse.y.toFixed(3));
          console.log('Camera position:', camera.position.x.toFixed(2), camera.position.y.toFixed(2), camera.position.z.toFixed(2));
          
          // Update the raycaster with camera and mouse position
          raycaster.setFromCamera(mouse, camera);
          
          console.log('Ray origin:', raycaster.ray.origin.x.toFixed(2), raycaster.ray.origin.y.toFixed(2), raycaster.ray.origin.z.toFixed(2));
          console.log('Ray direction:', raycaster.ray.direction.x.toFixed(3), raycaster.ray.direction.y.toFixed(3), raycaster.ray.direction.z.toFixed(3));
          // Get clickable objects from the globe
          const clickableObjects = (globe as any).clickableObjects || [];
          console.log('Checking intersections with', clickableObjects.length, 'clickable objects');
          
          // Calculate objects intersecting the ray (use our custom clickable objects)
          const intersects = raycaster.intersectObjects(clickableObjects, false);
          
          console.log('Found', intersects.length, 'intersections');
          
          if (intersects.length > 0) {
            const closestIntersect = intersects[0];
            
            // If we hit the invisible globe sphere, calculate which fellowship location is closest
            if (closestIntersect.object.userData?.isGlobeClickable) {
              console.log('Hit invisible globe sphere at:', closestIntersect.point);
              
              // Convert the 3D click point back to lat/lng
              const clickPoint = closestIntersect.point;
              const distance = Math.sqrt(clickPoint.x * clickPoint.x + clickPoint.y * clickPoint.y + clickPoint.z * clickPoint.z);
              
              // Normalize to sphere surface
              const normalizedPoint = {
                x: clickPoint.x / distance * 100,
                y: clickPoint.y / distance * 100,
                z: clickPoint.z / distance * 100
              };
              
              // Convert back to lat/lng using proper spherical coordinates
              const clickLat = Math.asin(normalizedPoint.y / 100) * (180 / Math.PI);
              const clickLng = Math.atan2(normalizedPoint.z, normalizedPoint.x) * (180 / Math.PI);
              
              console.log('Click converted to lat/lng:', clickLat.toFixed(2), clickLng.toFixed(2));
              
              // Find the closest fellowship location
              let closestLocation: string | null = null;
              let closestDistance = Infinity;
              
              locations.forEach((location) => {
                // Calculate great circle distance
                const lat1 = clickLat * (Math.PI / 180);
                const lng1 = clickLng * (Math.PI / 180);
                const lat2 = location.lat * (Math.PI / 180);
                const lng2 = location.lng * (Math.PI / 180);
                
                const dLat = lat2 - lat1;
                const dLng = lng2 - lng1;
                
                const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                         Math.cos(lat1) * Math.cos(lat2) *
                         Math.sin(dLng/2) * Math.sin(dLng/2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                const distance = c * 6371; // Earth's radius in km
                
                console.log(`Distance to ${location.name}: ${distance.toFixed(0)}km`);
                
                if (distance < closestDistance) {
                  closestDistance = distance;
                  closestLocation = location.name;
                }
              });
              
              // Find the second closest to ensure there's a clear winner
              let secondClosestDistance = Infinity;
              locations.forEach((location) => {
                if (location.name !== closestLocation) {
                  const lat1 = clickLat * (Math.PI / 180);
                  const lng1 = clickLng * (Math.PI / 180);
                  const lat2 = location.lat * (Math.PI / 180);
                  const lng2 = location.lng * (Math.PI / 180);
                  
                  const dLat = lat2 - lat1;
                  const dLng = lng2 - lng1;
                  
                  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                           Math.cos(lat1) * Math.cos(lat2) *
                           Math.sin(dLng/2) * Math.sin(dLng/2);
                  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                  const distance = c * 6371;
                  
                  if (distance < secondClosestDistance) {
                    secondClosestDistance = distance;
                  }
                }
              });
              
              // Only select if there's a clear winner (closest is significantly closer than second closest)
              const distanceDifference = secondClosestDistance - closestDistance;
              console.log('Distance difference between closest and second closest:', distanceDifference.toFixed(0), 'km');
              
              if (distanceDifference > 500 && closestLocation && closestDistance < 10000) {
                console.log('Closest location:', closestLocation, 'at', closestDistance.toFixed(0), 'km');
                console.log('=== END RAYCASTING DEBUG ===');
                return closestLocation;
              } else {
                console.log('No clear winner - closest:', closestDistance.toFixed(0), 'km, second:', secondClosestDistance.toFixed(0), 'km');
              }
            } else {
              // Direct hit on a specific object
              const locationName = closestIntersect.object.userData?.locationName;
              if (locationName) {
                console.log('Direct hit on object:', locationName);
                console.log('=== END RAYCASTING DEBUG ===');
                return locationName;
              }
            }
          }
          
          console.log('No intersections found');
          console.log('=== END RAYCASTING DEBUG ===');
          return null;
        };

        // Track mouse position to distinguish between click and drag
        let mouseDownPos = { x: 0, y: 0 };
        let mouseUpPos = { x: 0, y: 0 };
        let isDragging = false;

        const handleMouseDown = (event: MouseEvent) => {
          mouseDownPos.x = event.clientX;
          mouseDownPos.y = event.clientY;
          isDragging = false;
        };

        const handleMouseMove = (event: MouseEvent) => {
          if (mouseDownPos.x !== 0 || mouseDownPos.y !== 0) {
            const deltaX = Math.abs(event.clientX - mouseDownPos.x);
            const deltaY = Math.abs(event.clientY - mouseDownPos.y);
            // If mouse moved more than 5 pixels, consider it dragging
            if (deltaX > 5 || deltaY > 5) {
              isDragging = true;
            }
          }
        };

        // No longer need this flag since we're using raycasting directly
        
        const handleMouseUp = (event: MouseEvent) => {
          mouseUpPos.x = event.clientX;
          mouseUpPos.y = event.clientY;
          
          if (!isDragging) {
            // Don't trigger on UI element clicks (like close button)
            if ((event.target as HTMLElement).closest('button')) {
              console.log('Button clicked, not globe');
              return;
            }
            
            // Try to detect if we clicked on a specific location using raycasting
            const clickedLocation = detectLocationClick(event);
            
            if (clickedLocation) {
              console.log('Raycasting detected specific location click:', clickedLocation);
              handleSpecificLocationClick(clickedLocation);
            } else {
              // Fallback: cycle through locations if no specific location was clicked
              console.log('=== FALLBACK GLOBE CLICK DEBUG ===');
              console.log('No specific location clicked, cycling to next');
              console.log('Current local index:', currentLocationIndex);
              console.log('Total locations available:', locations.length);
              
              // Calculate next index using local variable to avoid React state issues
              const nextIndex = (currentLocationIndex + 1) % locations.length;
              console.log('Next index calculated:', nextIndex);
              
              const nextLocation = locations[nextIndex];
              console.log('Next location will be:', nextLocation.name, '(', nextLocation.id, ')');
              
              // Update both local index and React state
              currentLocationIndex = nextIndex;
              setSelectedLocation(nextLocation);
              
              console.log('=== END FALLBACK GLOBE CLICK DEBUG ===');
              
              // Pause auto-rotation
              controls.autoRotate = false;
              setTimeout(() => {
                controls.autoRotate = true;
              }, 10000);
            }
          } else {
            console.log('Globe was dragged (distance:', Math.abs(event.clientX - mouseDownPos.x) + Math.abs(event.clientY - mouseDownPos.y), 'px), not clicking location');
          }
          
          // Reset tracking
          mouseDownPos = { x: 0, y: 0 };
          isDragging = false;
        };

        // Add mouse event listeners to distinguish between click and drag
        const canvas = renderer.domElement;
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        
        // Store references for cleanup
        const cleanupMouseEvents = () => {
          canvas.removeEventListener('mousedown', handleMouseDown);
          canvas.removeEventListener('mousemove', handleMouseMove);
          canvas.removeEventListener('mouseup', handleMouseUp);
        };
        

        scene.add(globe);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(5, 3, 5);
        scene.add(directionalLight);

        globeRef.current = globe;
        setIsLoading(false);

        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };
        animate();

        // Handle resize
        const handleResize = () => {
          if (!mountRef.current) return;
          
          const width = mountRef.current.clientWidth;
          const height = mountRef.current.clientHeight;
          
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        };
        
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          cleanupMouseEvents();
          if (mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement);
          }
          renderer.dispose();
          globe.dispose && globe.dispose();
        };
      } catch (error) {
        console.error('Error initializing globe:', error);
        setIsLoading(false);
      }
    };

    initGlobe();

    return () => {
      if (mountRef.current && renderer?.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer?.dispose();
      globe?.dispose && globe.dispose();
    };
  }, [isClient]); // Only depend on isClient to prevent globe reinitializations

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-600 text-lg font-medium">Loading Interactive Globe...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col lg:flex-row">
      {/* Globe Container */}
      <div className={`transition-all duration-500 ${
        selectedLocation 
          ? 'w-full h-1/2 lg:w-2/3 lg:h-full' 
          : 'w-full h-full'
      }`}>
        <div ref={mountRef} className="w-full h-full relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-blue-600 text-lg font-medium">Loading Globe...</p>
              </div>
            </div>
          )}
        </div>

        {/* Globe Info Panel - Only show when no location selected */}
        {!selectedLocation && (
          <div className="absolute top-2 left-2 lg:top-4 lg:left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 lg:p-4 shadow-lg max-w-xs text-xs lg:text-sm">
            <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">Fellowship Locations</h4>
            <p className="text-gray-600 mb-3">
              Click on any location marker to see fellowship details.
            </p>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>Australia</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span>Europe</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Switzerland</span>
              </div>
            </div>
          </div>
        )}

        {/* Controls Info */}
        <div className="absolute bottom-2 left-2 lg:bottom-4 lg:left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 lg:p-3 shadow-lg">
          <p className="text-xs text-gray-600">
            <span className="hidden sm:inline">🖱️ Click & drag to rotate • 📍 Click anywhere to cycle locations • 🔍 Scroll to zoom</span>
            <span className="sm:hidden">👆 Tap & drag to rotate • 📍 Tap to see locations</span>
          </p>
        </div>
      </div>

      {/* Fellowship Details Panel - Below globe on mobile, side panel on desktop */}
      {selectedLocation && (
        <div className="w-full h-1/2 lg:w-1/3 lg:h-full bg-white shadow-xl border-t lg:border-t-0 lg:border-l border-gray-200 animate-in slide-in-from-bottom lg:slide-in-from-right duration-500 relative z-50 overflow-y-auto">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-4 lg:p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl lg:text-2xl">{selectedLocation.flag}</span>
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900">{selectedLocation.name}</h3>
                    <p className="text-sm lg:text-base text-gray-600">{selectedLocation.country}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="mt-3 lg:mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-xs lg:text-sm font-medium text-gray-900">Fellowship Training</span>
                </div>
                <p className="text-xs lg:text-sm text-gray-700 leading-relaxed">{selectedLocation.description}</p>
              </div>
            </div>

            {/* Mentors */}
            <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
              <div>
                <h4 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4 flex items-center gap-2">
                  <GraduationCap className="w-4 lg:w-5 h-4 lg:h-5 text-blue-600" />
                  Fellowship Mentors
                </h4>
                
                <div className="space-y-4 lg:space-y-6">
                  {selectedLocation.mentors.map((mentor, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-3 lg:p-5">
                      <div className="flex items-start gap-3 lg:gap-4">
                        {/* Profile Placeholder */}
                        <div className="w-10 h-10 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
                        </div>
                        
                        {/* Mentor Info */}
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm lg:text-lg font-bold text-gray-900 mb-1">{mentor.title}</h5>
                          <p className="text-xs lg:text-sm text-gray-700 leading-relaxed mb-3 lg:mb-4">
                            {mentor.description}
                          </p>
                          
                          {/* Expertise */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Award className="w-3 lg:w-4 h-3 lg:h-4 text-blue-600" />
                              <span className="text-xs font-medium text-gray-900">Expertise:</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {mentor.expertise.map((skill, skillIndex) => (
                                <span 
                                  key={skillIndex}
                                  className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Note about profile photos */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 lg:p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <User className="w-3 lg:w-4 h-3 lg:h-4 text-blue-600" />
                  <span className="text-blue-800 font-medium text-xs lg:text-sm">Profile Photos Coming Soon</span>
                </div>
                <p className="text-blue-700 text-xs">
                  Professional photographs will be added soon.
                </p>
              </div>
            </div>
        </div>
      )}
    </div>
  );
}