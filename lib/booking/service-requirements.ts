export interface ServiceRequirement {
  category: string
  timeSlotType: "hourly" | "half-day" | "full-day" | "flexible" | "consultation"
  minDuration?: number // in hours
  availableSlots?: string[]
  additionalFields: {
    name: string
    label: string
    type: "text" | "textarea" | "select" | "file" | "number" | "checkbox"
    required: boolean
    options?: string[]
    placeholder?: string
  }[]
  budgetRanges?: string[]
  timelines?: string[]
}

export const SERVICE_REQUIREMENTS: Record<string, ServiceRequirement> = {
  Photography: {
    category: "Photography",
    timeSlotType: "hourly",
    minDuration: 2,
    availableSlots: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
    additionalFields: [
      {
        name: "location",
        label: "Shoot Location",
        type: "text",
        required: true,
        placeholder: "Where will the photoshoot take place?",
      },
      {
        name: "shot_list",
        label: "Shot List / Requirements",
        type: "textarea",
        required: true,
        placeholder: "Describe the type of shots you need...",
      },
      {
        name: "number_of_people",
        label: "Number of People",
        type: "number",
        required: false,
        placeholder: "How many people will be photographed?",
      },
      {
        name: "reference_images",
        label: "Reference Images",
        type: "file",
        required: false,
        placeholder: "Upload reference images (optional)",
      },
    ],
    budgetRanges: ["AED 2,000 - 5,000", "AED 5,000 - 10,000", "AED 10,000 - 20,000", "AED 20,000+"],
    timelines: ["Within 1 week", "Within 2 weeks", "Within 1 month", "Flexible"],
  },
  Videography: {
    category: "Videography",
    timeSlotType: "half-day",
    minDuration: 4,
    availableSlots: ["08:00", "09:00", "13:00", "14:00"],
    additionalFields: [
      {
        name: "location",
        label: "Filming Location",
        type: "text",
        required: true,
        placeholder: "Where will filming take place?",
      },
      {
        name: "video_duration",
        label: "Desired Video Duration",
        type: "select",
        required: true,
        options: ["30 seconds", "1 minute", "2-3 minutes", "5+ minutes", "Feature length"],
      },
      {
        name: "script_brief",
        label: "Script / Creative Brief",
        type: "textarea",
        required: true,
        placeholder: "Describe your video concept, message, and requirements...",
      },
      {
        name: "talent_required",
        label: "Talent Required",
        type: "select",
        required: false,
        options: ["No talent needed", "1-2 people", "3-5 people", "6+ people", "Professional actors"],
      },
    ],
    budgetRanges: ["AED 5,000 - 10,000", "AED 10,000 - 25,000", "AED 25,000 - 50,000", "AED 50,000+"],
    timelines: ["Within 2 weeks", "Within 1 month", "Within 2 months", "Flexible"],
  },
  Consulting: {
    category: "Consulting",
    timeSlotType: "consultation",
    minDuration: 1,
    availableSlots: ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
    additionalFields: [
      {
        name: "meeting_type",
        label: "Meeting Type",
        type: "select",
        required: true,
        options: ["In-person at our office", "At your location", "Online (Zoom/Teams)", "Phone call"],
      },
      {
        name: "consultation_topic",
        label: "Consultation Topic",
        type: "textarea",
        required: true,
        placeholder: "What would you like to discuss?",
      },
      {
        name: "number_of_attendees",
        label: "Number of Attendees",
        type: "number",
        required: false,
        placeholder: "How many people will attend?",
      },
    ],
    budgetRanges: ["AED 2,000 - 5,000", "AED 5,000 - 15,000", "AED 15,000 - 50,000", "AED 50,000+"],
    timelines: ["ASAP", "Within 1 week", "Within 2 weeks", "Flexible"],
  },
  "Graphic Design": {
    category: "Graphic Design",
    timeSlotType: "flexible",
    additionalFields: [
      {
        name: "design_type",
        label: "Design Type",
        type: "select",
        required: true,
        options: ["Logo", "Branding Package", "Marketing Materials", "Social Media Graphics", "Other"],
      },
      {
        name: "design_brief",
        label: "Design Brief",
        type: "textarea",
        required: true,
        placeholder: "Describe your design needs, target audience, and brand guidelines...",
      },
      {
        name: "reference_files",
        label: "Reference Files",
        type: "file",
        required: false,
        placeholder: "Upload inspiration, brand assets, or examples",
      },
      {
        name: "number_of_concepts",
        label: "Number of Concepts",
        type: "select",
        required: false,
        options: ["1 concept", "2-3 concepts", "4-5 concepts", "Multiple rounds"],
      },
    ],
    budgetRanges: ["AED 1,000 - 3,000", "AED 3,000 - 8,000", "AED 8,000 - 20,000", "AED 20,000+"],
    timelines: ["ASAP (Rush)", "Within 1 week", "Within 2 weeks", "Within 1 month", "Flexible"],
  },
  "Web Development": {
    category: "Web Development",
    timeSlotType: "flexible",
    additionalFields: [
      {
        name: "website_type",
        label: "Website Type",
        type: "select",
        required: true,
        options: [
          "Corporate Website",
          "E-commerce Store",
          "Web Application",
          "Landing Page",
          "Portfolio",
          "Blog/Magazine",
          "Other",
        ],
      },
      {
        name: "technical_requirements",
        label: "Technical Requirements",
        type: "textarea",
        required: true,
        placeholder: "Describe features, integrations, and technical specifications...",
      },
      {
        name: "has_design",
        label: "Do you have a design ready?",
        type: "select",
        required: true,
        options: ["Yes, design is ready", "No, need design services", "Partially ready"],
      },
      {
        name: "existing_website",
        label: "Existing Website URL",
        type: "text",
        required: false,
        placeholder: "If redesigning an existing site",
      },
    ],
    budgetRanges: ["AED 5,000 - 15,000", "AED 15,000 - 35,000", "AED 35,000 - 75,000", "AED 75,000+"],
    timelines: ["Within 1 month", "Within 2 months", "Within 3 months", "Flexible"],
  },
  Marketing: {
    category: "Marketing",
    timeSlotType: "consultation",
    minDuration: 1,
    availableSlots: ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"],
    additionalFields: [
      {
        name: "marketing_type",
        label: "Marketing Service",
        type: "select",
        required: true,
        options: [
          "Social Media Marketing",
          "SEO Services",
          "Content Marketing",
          "PPC/Ads Management",
          "Email Marketing",
          "Full Marketing Strategy",
        ],
      },
      {
        name: "current_marketing",
        label: "Current Marketing Activities",
        type: "textarea",
        required: false,
        placeholder: "What marketing are you currently doing?",
      },
      {
        name: "target_audience",
        label: "Target Audience",
        type: "text",
        required: true,
        placeholder: "Describe your ideal customer",
      },
      {
        name: "monthly_budget",
        label: "Monthly Marketing Budget",
        type: "select",
        required: false,
        options: ["AED 3,000 - 5,000", "AED 5,000 - 10,000", "AED 10,000 - 25,000", "AED 25,000+"],
      },
    ],
    budgetRanges: [
      "AED 5,000 - 10,000 /month",
      "AED 10,000 - 20,000 /month",
      "AED 20,000 - 50,000 /month",
      "AED 50,000+ /month",
    ],
    timelines: ["Start ASAP", "Within 2 weeks", "Within 1 month", "Flexible"],
  },
  "Software Development": {
    category: "Software Development",
    timeSlotType: "flexible",
    additionalFields: [
      {
        name: "software_type",
        label: "Software Type",
        type: "select",
        required: true,
        options: ["Mobile App", "Web Application", "Desktop Software", "API/Backend", "Integration", "Other"],
      },
      {
        name: "platforms",
        label: "Platforms",
        type: "select",
        required: true,
        options: ["iOS", "Android", "Both iOS & Android", "Web", "Windows", "macOS", "Cross-platform"],
      },
      {
        name: "technical_specs",
        label: "Technical Specifications",
        type: "textarea",
        required: true,
        placeholder: "Describe features, integrations, user roles, and technical requirements...",
      },
      {
        name: "has_documentation",
        label: "Do you have documentation?",
        type: "select",
        required: false,
        options: ["Yes, detailed specs", "Partial documentation", "Just ideas", "Need help defining"],
      },
    ],
    budgetRanges: ["AED 15,000 - 35,000", "AED 35,000 - 75,000", "AED 75,000 - 150,000", "AED 150,000+"],
    timelines: ["Within 2 months", "Within 3 months", "Within 6 months", "Flexible / Ongoing"],
  },
}

// Helper function to get requirements for a service
export function getServiceRequirements(category: string): ServiceRequirement | null {
  return SERVICE_REQUIREMENTS[category] || null
}

// Helper function to get default requirements for unknown categories
export function getDefaultRequirements(): ServiceRequirement {
  return {
    category: "General",
    timeSlotType: "flexible",
    availableSlots: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
    additionalFields: [
      {
        name: "project_details",
        label: "Project Details",
        type: "textarea",
        required: true,
        placeholder: "Please describe your project requirements in detail...",
      },
    ],
    budgetRanges: [
      "Under AED 5,000",
      "AED 5,000 - 10,000",
      "AED 10,000 - 25,000",
      "AED 25,000 - 50,000",
      "AED 50,000+",
    ],
    timelines: ["ASAP", "Within 1 week", "Within 2-4 weeks", "Within 1-2 months", "Flexible"],
  }
}
