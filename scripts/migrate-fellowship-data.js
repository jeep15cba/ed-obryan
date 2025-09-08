const { createClient } = require('next-sanity');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Combined data from both components with coordinates
const fellowshipData = [
  {
    city: "Melbourne",
    country: "Australia",
    flag: "🇦🇺",
    lat: -37.8136,
    lng: 144.9631,
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
    lat: -31.9505,
    lng: 115.8605,
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
    lat: 52.5200,
    lng: 13.4050,
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
    lat: 45.7640,
    lng: 4.8357,
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
    lat: 48.8566,
    lng: 2.3522,
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
    lat: 51.5074,
    lng: -0.1278,
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
    lat: 46.8006,
    lng: 9.8134,
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

async function migrateFellowshipData() {
  console.log('🚀 Starting fellowship data migration...');

  try {
    // Verify connection
    console.log('🔌 Testing Sanity connection...');
    const config = await writeClient.config();
    console.log(`✅ Connected to Sanity project: ${config.projectId}`);

    // Step 1: Create fellowship mentors
    console.log('📝 Creating fellowship mentors...');
    
    const mentorIds = {};
    
    for (const location of fellowshipData) {
      for (const mentor of location.mentors) {
        const mentorDoc = {
          _type: 'fellowshipMentor',
          name: mentor.name,
          title: mentor.title,
          slug: {
            _type: 'slug',
            current: mentor.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
          },
          description: mentor.description,
          expertise: mentor.expertise,
          order: 0,
        };

        const result = await writeClient.create(mentorDoc);
        mentorIds[`${location.city}-${mentor.name}`] = result._id;
        console.log(`✅ Created mentor: ${mentor.title} (${result._id})`);
      }
    }

    // Step 2: Create fellowship locations
    console.log('🌍 Creating fellowship locations...');
    
    const locationIds = [];
    let order = 0;

    for (const location of fellowshipData) {
      const mentorRefs = location.mentors.map(mentor => ({
        _type: 'reference',
        _ref: mentorIds[`${location.city}-${mentor.name}`]
      }));

      const locationDoc = {
        _type: 'fellowshipLocation',
        city: location.city,
        country: location.country,
        slug: {
          _type: 'slug',
          current: location.city.toLowerCase().replace(/\s+/g, '-')
        },
        flag: location.flag,
        latitude: location.lat,
        longitude: location.lng,
        description: location.description,
        color: location.color,
        mentors: mentorRefs,
        order: order++,
        isActive: true,
      };

      const result = await writeClient.create(locationDoc);
      locationIds.push(result._id);
      console.log(`✅ Created location: ${location.city}, ${location.country} (${result._id})`);
    }

    // Step 3: Create fellowship page
    console.log('📄 Creating fellowship page...');
    
    const fellowshipPageDoc = {
      _type: 'fellowshipPage',
      title: 'Fellowship Training',
      slug: {
        _type: 'slug',
        current: 'fellowship'
      },
      subtitle: 'Local & International Fellowships',
      description: [
        'It is generally expected that orthopaedic surgeons, from all corners of the world, undergo further subspecialist training after completing their studies. The various training centres Edward has learnt from are on a globe below.',
        'While it is important to get international perspectives and stay up-to-date with modern techniques from around the globe, we are privileged in Australia to have what is consistently ranked as the highest level healthcare in the world. Our health outcomes eclipse those of the USA, UK, greater Eurasia and elsewhere. Our local surgical training program is envied both within Australia as well as abroad. You are likely to receive world-standard orthopaedic care from any surgeon trained in Melbourne, and for this our community is proud.',
        'Upon completing his training, Edward was humbled to be invited by those he trusted most, his mentors Mr Chris Jones and Mr Sam Joseph, to the Bayside Hip & Knee Fellowship in Melbourne. This was a year-long fellowship in public and private practice around the bayside area, focusing on hip and knee surgery. Edward was fortunate to train in two different muscle-sparing hip approaches; the direct anterior and direct superior approach, and gain familiarity with four different robotic systems for the hip and knee. He also gained insights into sport knee injury management.',
        'He has since completed a European travelling fellowship, focused on all aspects of his practice with highly published world experts in various subspecialist areas.'
      ],
      badgeText: 'International Training Excellence',
      globeTitle: 'Global Training Network',
      globeDescription: 'Click anywhere on the globe or use the location buttons below to explore fellowship details.',
      locationsTitle: 'Fellowship Locations & Mentors',
      locationsDescription: 'Meet the world-class surgeons and institutions that have shaped Mr O\'Bryan\'s expertise.',
      fellowshipLocations: locationIds.map(id => ({
        _type: 'reference',
        _ref: id
      })),
      isActive: true,
    };

    const pageResult = await writeClient.create(fellowshipPageDoc);
    console.log(`✅ Created fellowship page: ${pageResult._id}`);

    console.log('\n🎉 Migration completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - ${Object.keys(mentorIds).length} mentors created`);
    console.log(`   - ${locationIds.length} locations created`);
    console.log(`   - 1 fellowship page created`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    console.error('Error details:', error.message);
    if (error.response) {
      console.error('Response:', error.response);
    }
    process.exit(1);
  }
}

// Run the migration
migrateFellowshipData()
  .then(() => {
    console.log('✅ Migration script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Migration script failed:', error);
    process.exit(1);
  });