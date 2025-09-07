# 🤖 AI Assist Setup Guide

## ⚠️ Current Issue
AI Assist is installed but needs to be enabled in your Sanity dashboard.

## 📋 Step-by-Step Setup

### Step 1: Enable AI Assist in Sanity Studio

1. **Open Sanity Studio**: http://localhost:3334
2. **Go to any document** (create a new condition or blog post)
3. **Look for the sparkle icon** (✨) in the document header/toolbar
4. **Click "Enable Sanity AI Assist"**
5. **Follow the prompts** to enable AI features

### Step 2: Verify Configuration

After enabling, you should see:
- ✨ AI assist buttons next to text fields
- AI suggestions when you click the sparkle icons
- "Generate with AI" options in field menus

### Step 3: Alternative Manual Setup

If the sparkle icon doesn't appear:

1. **Go to Sanity Management Console**: https://www.sanity.io/manage
2. **Select your project**: "OrthoSurgeon Website"
3. **Go to Settings → API**
4. **Create a new token** named "Sanity AI" with Editor permissions
5. **Return to Studio** and refresh

## 🔧 Technical Details

### What's Already Configured:
- ✅ AI Assist plugin installed (`@sanity/assist`)
- ✅ Plugin added to `sanity.config.ts`
- ✅ Rich text editor with advanced formatting
- ✅ Internal/external link support

### What Needs Manual Setup:
- ⚠️ AI Assist must be enabled in Sanity dashboard
- ⚠️ API token created automatically when enabled
- ⚠️ Requires Sanity Growth plan or higher

## 🎯 AI Features Once Enabled

### SEO Generation:
- **SEO Titles**: AI generates from your content titles and descriptions
- **Meta Descriptions**: AI creates search-friendly descriptions
- **Context Aware**: AI understands medical/orthopaedic context

### Content Assistance:
- **Text Enhancement**: AI improves clarity and readability
- **Medical Tone**: AI maintains professional medical language
- **Patient-Friendly**: AI converts technical terms to patient language

## 📝 How to Use AI Once Enabled

### For SEO Fields:
1. Fill in the main content (title, overview, etc.)
2. Click the ✨ icon next to "SEO Title" field
3. Select "Generate with AI" or similar option
4. Review and edit the AI suggestion
5. Repeat for SEO Description

### For Content Fields:
1. Write your initial content
2. Select text you want to enhance
3. Look for AI assist options in the toolbar
4. Choose enhancement type (improve, summarize, etc.)

## 🚨 Troubleshooting

### No AI Options Visible:
- Check if you're on Sanity Growth plan or higher
- Ensure project has AI Assist enabled in dashboard
- Refresh the Studio after enabling

### AI Not Working:
- Verify API token was created in project settings
- Check browser console for errors
- Try refreshing the Studio

### Limited AI Features:
- Some features require specific Sanity plan tiers
- Basic AI is available, advanced features need higher plans

## 💡 Alternative: Manual SEO Best Practices

If AI isn't available yet, here are manual SEO guidelines:

### SEO Titles (Max 60 characters):
```
Format: "Condition: Symptoms, Treatment & Options"
Examples:
- "Hip Arthritis: Symptoms, Treatment & Surgery"
- "ACL Reconstruction: Recovery & Success Rates"
- "Knee Replacement: What to Expect | Dr. O'Bryan"
```

### Meta Descriptions (Max 160 characters):
```
Format: "Brief description + value proposition + subtle CTA"
Examples:
- "Expert hip arthritis treatment. Learn symptoms, non-surgical options & joint replacement surgery. Schedule consultation with Dr. O'Bryan today."
- "Complete ACL reconstruction guide covering surgery, recovery timeline & return to sports. Get expert orthopaedic advice and treatment options."
```

## 🎉 Next Steps

1. **Enable AI Assist** in Sanity Studio (Step 1 above)
2. **Test AI generation** on a sample condition/blog post
3. **Review and customize** AI suggestions
4. **Apply to existing content** for better SEO

Once enabled, AI will significantly speed up your content creation and SEO optimization process!