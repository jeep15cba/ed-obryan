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

const referPageData = {
  _type: 'referPage',
  _id: 'refer-page',
  title: 'Refer to Edward O\'Bryan',
  slug: {
    _type: 'slug',
    current: 'refer'
  },
  heroSection: {
    title: 'Refer to Edward O\'Bryan',
    subtitle: 'Seamless referral process for healthcare professionals. Multiple submission options available for your convenience.'
  },
  introSection: {
    title: 'Submit Patient Referrals',
    description: 'Referrals can be submitted via the form below, or otherwise made directly via Healthlink, email or fax.'
  },
  contactMethods: {
    title: 'Alternative Referral Methods',
    healthlink: 'edobryan',
    email: 'admin@edwardobryan.com',
    fax: '(02) 5565 6390',
    postalAddresses: [
      '12 Linacre Road, Hampton 3188',
      '29 Hilda Crescent, Hawthorn 3122'
    ]
  },
  snapformSection: {
    title: 'Snapform Integration',
    description: 'PDF to be emailed to admin@edwardobryan.com',
    emailAddress: 'admin@edwardobryan.com'
  },
  referralForm: {
    title: 'Online Referral Form',
    practitionerFields: {
      title: 'Referring practitioner details',
      subtitle: '(leave blank any N/A)',
      fields: [
        {
          name: 'practitioner_name',
          label: 'Name',
          type: 'text',
          required: true,
          width: 'half'
        },
        {
          name: 'occupation',
          label: 'Occupation',
          type: 'text',
          required: false,
          width: 'half'
        },
        {
          name: 'provider_number',
          label: 'Provider Number',
          type: 'text',
          required: false,
          width: 'half'
        },
        {
          name: 'contact_number',
          label: 'Contact number',
          type: 'tel',
          required: false,
          width: 'half'
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          required: false,
          width: 'full'
        }
      ]
    },
    patientFields: {
      title: 'Patient details',
      fields: [
        {
          name: 'patient_name',
          label: 'Name',
          type: 'text',
          required: true,
          width: 'half'
        },
        {
          name: 'dob',
          label: 'DOB',
          type: 'date',
          required: true,
          width: 'half'
        },
        {
          name: 'patient_phone',
          label: 'Contact number',
          type: 'tel',
          required: false,
          width: 'half'
        },
        {
          name: 'patient_email',
          label: 'Email',
          type: 'email',
          required: false,
          width: 'half'
        },
        {
          name: 'medicare',
          label: 'Medicare',
          type: 'text',
          required: false,
          width: 'half'
        },
        {
          name: 'insurance_status',
          label: 'Insurance Status',
          type: 'checkbox-group',
          required: false,
          width: 'half',
          options: ['Privately Insured', 'Worksafe/TAC', 'Uninsured']
        },
        {
          name: 'reason_for_referral',
          label: 'Reason for Referral',
          type: 'textarea',
          required: true,
          width: 'full'
        }
      ]
    },
    additionalFields: [
      {
        name: 'attached_referral',
        label: 'Attached referral',
        type: 'file',
        required: false,
        width: 'full'
      }
    ],
    submitButton: {
      text: 'Submit Referral',
      processingText: 'Submitting...'
    }
  },
  newPatientCTA: {
    text: 'If you are a new patient, please fill out the',
    linkText: 'New Patient Form',
    linkUrl: '/patient-form'
  },
  seo: {
    title: 'Refer a Patient | Edward O\'Bryan Orthopaedic Surgery',
    description: 'Submit patient referrals to Edward O\'Bryan via online form, HealthLink, email or fax. Comprehensive orthopaedic care with subspecialty expertise.',
    keywords: 'patient referral, orthopaedic referral, Edward O\'Bryan, HealthLink, medical referral'
  }
};

async function migrateReferData() {
  console.log('🚀 Starting refer page data migration...');

  try {
    // Verify connection
    console.log('🔌 Testing Sanity connection...');
    const config = await writeClient.config();
    console.log(`✅ Connected to Sanity project: ${config.projectId}`);

    // Check if refer page already exists
    const existingReferPage = await writeClient.fetch(`*[_type == "referPage" && _id == "refer-page"][0]`);
    
    if (existingReferPage) {
      console.log('⚠️ Refer page already exists. Updating with new data...');
      const result = await writeClient.createOrReplace(referPageData);
      console.log(`✅ Refer page updated successfully: ${result._id}`);
    } else {
      const result = await writeClient.create(referPageData);
      console.log(`✅ Refer page created successfully: ${result._id}`);
    }

    console.log('\n🎉 Migration completed successfully!');
    console.log(`📊 Summary: 1 refer page document processed`);
    
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
migrateReferData()
  .then(() => {
    console.log('✅ Migration script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Migration script failed:', error);
    process.exit(1);
  });