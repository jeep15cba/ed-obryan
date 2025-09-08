import { MapPin, User, Award, GraduationCap } from "lucide-react";
import type { FellowshipPage } from "@/types/sanity";

interface FellowshipLocationsProps {
  fellowshipData?: FellowshipPage | null;
}

const fallbackFellowshipData = [
  {
    city: "Melbourne",
    country: "Australia",
    flag: "🇦🇺",
    description: "Bayside Hip & Knee Fellowship - Year-long fellowship in public and private practice focusing on hip and knee surgery with advanced robotic systems.",
    color: "bg-blue-500",
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
    city: "Perth",
    country: "Australia",
    flag: "🇦🇺",
    description: "Sport surgery training focused on elite and professional athletes with internationally renowned expertise.",
    color: "bg-green-500",
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
    city: "Berlin",
    country: "Germany", 
    flag: "🇩🇪",
    description: "World-leading expertise in patellofemoral disorders and advanced knee surgery techniques.",
    color: "bg-purple-500",
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
    city: "Lyon",
    country: "France",
    flag: "🇫🇷", 
    description: "Home to the Lyon School of Knee Surgery and world-renowned expertise in patellofemoral conditions.",
    color: "bg-yellow-500",
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
    city: "Paris",
    country: "France",
    flag: "🇫🇷",
    description: "Advanced training in anterior approach hip replacement and academic excellence at the University of Paris.",
    color: "bg-red-500",
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
    city: "London", 
    country: "United Kingdom",
    flag: "🇬🇧",
    description: "World-leading expertise in elite athlete knee surgery and sports medicine.",
    color: "bg-cyan-500",
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
    city: "Davos",
    country: "Switzerland", 
    flag: "🇨🇭",
    description: "Home of the AO Foundation - the world's premier orthopaedic trauma training organization.",
    color: "bg-lime-500",
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

export default function FellowshipLocations({ fellowshipData }: FellowshipLocationsProps) {
  // Use Sanity data if available, otherwise fallback to hardcoded data
  const locations = fellowshipData?.fellowshipLocations || fallbackFellowshipData;

  return (
    <div className="space-y-12">
      {locations.map((location: any, index: number) => (
        <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          {/* Location Header */}
          <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 border-b border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-4 h-4 rounded-full ${location.color}`}></div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{location.flag}</span>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{location.city}</h3>
                  <p className="text-lg text-gray-600">{location.country}</p>
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{location.description}</p>
          </div>

          {/* Mentors */}
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              {location.mentors.map((mentor: any, mentorIndex: number) => (
                <div key={mentorIndex} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-start gap-4">
                    {/* Profile Placeholder */}
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Mentor Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{mentor.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <GraduationCap className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-blue-600 font-medium">Fellowship Mentor</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                        {mentor.description}
                      </p>
                      
                      {/* Expertise Tags */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-gray-900">Areas of Expertise:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {mentor.expertise.map((skill: string, skillIndex: number) => (
                            <span 
                              key={skillIndex}
                              className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
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
        </div>
      ))}
      
      {/* Note about profile photos */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <User className="w-5 h-5 text-blue-600" />
          <span className="text-blue-800 font-medium">Profile Photos Coming Soon</span>
        </div>
        <p className="text-blue-700 text-sm">
          Professional photographs of mentors will be added to enhance the fellowship training showcase.
        </p>
      </div>
    </div>
  );
}