const { createClient } = require('@sanity/client')
const { config } = require('../sanity/client')

const client = createClient({
  ...config,
  token: process.env.SANITY_API_WRITE_TOKEN, // Make sure this environment variable is set
})

async function seedDoctor() {
  try {
    // Create Dr. Edward O'Bryan profile
    const doctorDoc = {
      _type: 'teamMember',
      name: 'Mr Edward O\'Bryan',
      slug: {
        current: 'edward-obryan',
        _type: 'slug'
      },
      title: 'Orthopaedic Surgeon',
      photo: {
        _type: 'image',
        // You'll need to upload a photo in Sanity Studio and replace this with the actual asset reference
        asset: {
          _type: 'reference',
          _ref: 'image-placeholder' // Replace with actual image asset ID
        }
      },
      bio: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Mr Edward O\'Bryan is a leading orthopaedic surgeon specialising in advanced joint replacement and sports injury treatment. With over 15 years of experience, he is renowned for his expertise in robotic-assisted surgery and minimally invasive techniques.'
            }
          ]
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Mr O\'Bryan is committed to providing personalised, compassionate care while utilising the latest medical technologies to ensure optimal patient outcomes. His patient-centred approach focuses on understanding each individual\'s unique needs and developing tailored treatment plans.'
            }
          ]
        }
      ],
      specialties: [
        'Hip & Knee Joint Replacement',
        'Robotic-Assisted Surgery',
        'Sports Knee Surgery',
        'ACL Reconstruction',
        'Meniscal Repair',
        'Arthroscopic Surgery',
        'Complex Joint Revision',
        'Minimally Invasive Procedures'
      ],
      credentials: [
        'MBBS',
        'FRACS (Orthopaedics)',
        'FAOrthA',
        'Robotic Surgery Certified'
      ],
      education: [
        'MBBS, University of Melbourne (2005)',
        'FRACS Orthopaedic Surgery Training, Royal Australasian College of Surgeons (2012)',
        'Fellowship in Adult Reconstructive Surgery, Royal Melbourne Hospital (2013)',
        'Advanced Robotic Surgery Certification, Mako Robotic Institute (2015)'
      ],
      experience: [
        'Senior Orthopaedic Surgeon, Melbourne Orthopaedic Group (2015-Present)',
        'Consultant Orthopaedic Surgeon, Royal Melbourne Hospital (2013-Present)',
        'Clinical Supervisor, University of Melbourne Medical School (2014-Present)',
        'Research Fellow, Joint Replacement Institute (2013-2015)',
        'Orthopaedic Registrar, Alfred Hospital (2010-2013)'
      ],
      featured: true,
      order: 1
    }

    const result = await client.create(doctorDoc)
    console.log('Successfully created doctor profile:', result._id)
    
    console.log('\n✅ Doctor profile created successfully!')
    console.log('📝 Remember to:')
    console.log('   1. Upload a professional photo in Sanity Studio')
    console.log('   2. Update the photo asset reference in the doctor profile')
    console.log('   3. Adjust any details as needed')
    
  } catch (error) {
    console.error('Error creating doctor profile:', error)
  }
}

seedDoctor()