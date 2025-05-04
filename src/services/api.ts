
import { toast } from "@/components/ui/sonner";

// Define the base API URL
const API_BASE_URL = "/api";

// Reusable fetch function with error handling
const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    toast.error("Something went wrong", {
      description: error instanceof Error ? error.message : "Please try again later",
    });
    throw error;
  }
};

// Stream API
export const getStreams = () => apiFetch("/streams");

// Course API
export const getCourses = (streamId?: string) => {
  const queryParams = streamId ? `?stream=${streamId}` : "";
  return apiFetch(`/courses${queryParams}`);
};

export const getCourseById = (id: number) => apiFetch(`/courses/${id}`);

// College API
export const getCollegesByCourse = (courseId: number) => 
  apiFetch(`/colleges?courseId=${courseId}`);

export const getCollegeById = (id: number) => apiFetch(`/colleges/${id}`);

// Job API
export const getJobs = (filters?: Record<string, any>) => {
  const queryString = filters 
    ? `?${new URLSearchParams(Object.entries(filters)
        .filter(([_, value]) => value)
        .map(([key, value]) => [key, String(value)])
      ).toString()}`
    : "";
  return apiFetch(`/jobs${queryString}`);
};

export const getJobById = (id: number) => apiFetch(`/jobs/${id}`);

// Mock API with sample data for development use
export const getMockCourses = (stream?: string) => {
  // Sample course data
  const courses = [
    {
      id: 1,
      title: "B.Tech Computer Science",
      description: "Bachelor of Technology in Computer Science and Engineering focuses on software development, algorithms, data structures, and computer architecture.",
      duration: "4 Years",
      eligibility: "10+2 with PCM, Min 60%",
      stream: "science",
      collegeCount: 12,
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "MBBS",
      description: "Bachelor of Medicine and Bachelor of Surgery is a professional undergraduate medical degree that trains students in medicine and surgery.",
      duration: "5.5 Years",
      eligibility: "10+2 with PCB, Min 50%",
      stream: "science",
      collegeCount: 8,
      imageUrl: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "B.Sc Physics",
      description: "Bachelor of Science in Physics covers classical and modern physics, quantum mechanics, electromagnetism and thermodynamics.",
      duration: "3 Years",
      eligibility: "10+2 with PCM, Min 55%",
      stream: "science",
      collegeCount: 10,
      imageUrl: "https://images.unsplash.com/photo-1636466497217-06a6f914e4f4?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "BBA",
      description: "Bachelor of Business Administration provides fundamental education in business and management principles.",
      duration: "3 Years",
      eligibility: "10+2 in any stream, Min 50%",
      stream: "commerce",
      collegeCount: 15,
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "B.Com",
      description: "Bachelor of Commerce covers accounting, economics, business law, taxation, and financial management.",
      duration: "3 Years",
      eligibility: "10+2 Commerce, Min 50%",
      stream: "commerce",
      collegeCount: 20,
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "BA Literature",
      description: "Bachelor of Arts in Literature explores literature across cultures, literary theory, critical analysis and creative writing.",
      duration: "3 Years",
      eligibility: "10+2 in any stream, Min 50%",
      stream: "arts",
      collegeCount: 8,
      imageUrl: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 7,
      title: "BA Psychology",
      description: "Bachelor of Arts in Psychology provides understanding of human behavior, mental processes, research methods and psychological theories.",
      duration: "3 Years",
      eligibility: "10+2 in any stream, Min 50%",
      stream: "arts",
      collegeCount: 12,
      imageUrl: "https://images.unsplash.com/photo-1576669801775-ff43c5ab079d?q=80&w=1000&auto=format&fit=crop"
    },
  ];
  
  if (stream) {
    return courses.filter(course => course.stream === stream);
  }
  
  return courses;
};

export const getMockColleges = (courseId?: number) => {
  // Sample college data
  const colleges = [
    {
      id: 1,
      name: "Indian Institute of Technology, Delhi",
      description: "IIT Delhi is one of India's premier technical institutions, known for its cutting-edge research and innovation in engineering and technology fields.",
      location: "New Delhi",
      avgSalary: "₹16-25 LPA",
      fees: "₹2.2 Lakhs per year",
      companies: ["Google", "Microsoft", "Amazon", "Goldman Sachs", "Shell"],
      applicationDeadline: "May 30, 2025",
      applicationProcess: "JEE Advanced followed by counseling",
      imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://home.iitd.ac.in/",
      courseId: 1
    },
    {
      id: 2,
      name: "All India Institute of Medical Sciences",
      description: "AIIMS is India's leading medical institution offering world-class medical education and healthcare services with state-of-the-art facilities.",
      location: "New Delhi",
      avgSalary: "₹12-18 LPA",
      fees: "₹1.5 Lakhs per year",
      companies: ["Apollo Hospitals", "Fortis", "Max Healthcare"],
      applicationDeadline: "June 15, 2025",
      applicationProcess: "NEET-UG followed by counseling",
      imageUrl: "https://images.unsplash.com/photo-1631248055158-edec7a3c072b?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.aiims.edu/",
      courseId: 2
    },
    {
      id: 3,
      name: "St. Stephen's College",
      description: "St. Stephen's is one of India's oldest and most prestigious liberal arts colleges, known for academic excellence and rich cultural heritage.",
      location: "Delhi",
      avgSalary: "₹6-10 LPA",
      fees: "₹40,000 per year",
      companies: ["HUL", "ITC", "Deloitte", "EY"],
      applicationDeadline: "June 30, 2025",
      applicationProcess: "Merit-based through university portal",
      imageUrl: "https://images.unsplash.com/photo-1607013407627-6848541c23ae?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.ststephens.edu/",
      courseId: 6
    },
    {
      id: 4,
      name: "Shri Ram College of Commerce",
      description: "SRCC is India's premier institution for commerce and economics education with a strong focus on research and industry-relevant curriculum.",
      location: "Delhi",
      avgSalary: "₹8-15 LPA",
      fees: "₹45,000 per year",
      companies: ["JP Morgan", "KPMG", "PwC", "Bain & Company"],
      applicationDeadline: "June 25, 2025",
      applicationProcess: "Merit-based through university portal",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.srcc.edu/",
      courseId: 5
    },
  ];
  
  if (courseId) {
    return colleges.filter(college => college.courseId === courseId);
  }
  
  return colleges;
};

export const getMockJobs = (filters?: Record<string, any>) => {
  // Sample job data
  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "TechSolutions Inc.",
      location: "Bangalore",
      jobType: "full-time",
      salary: "₹12-18 LPA",
      experience: "2-4 years",
      postedDate: "2025-05-01",
      deadline: "2025-06-01",
      description: "We're looking for a skilled Software Engineer to join our team. You will be responsible for developing high-quality applications using modern technologies and best practices.",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "2+ years of experience in software development",
        "Proficiency in JavaScript, TypeScript, and React",
        "Experience with RESTful APIs and backend technologies",
        "Strong problem-solving skills and attention to detail"
      ],
      responsibilities: [
        "Design and develop high-quality code for various projects",
        "Collaborate with cross-functional teams to define and implement features",
        "Debug production issues and implement fixes",
        "Optimize applications for maximum speed and scalability",
        "Participate in code reviews and knowledge sharing"
      ],
      companyLogoUrl: "https://via.placeholder.com/150",
      applicationUrl: "https://example.com/apply",
      industry: "technology"
    },
    {
      id: 2,
      title: "Data Scientist",
      company: "Analytics Plus",
      location: "Hyderabad",
      jobType: "full-time",
      salary: "₹15-22 LPA",
      experience: "3-5 years",
      postedDate: "2025-04-25",
      deadline: "2025-05-25",
      description: "Join our data science team to build predictive models and extract insights from complex datasets. You'll work on challenging problems and collaborate with talented professionals.",
      requirements: [
        "Master's or PhD in Statistics, Computer Science, or related field",
        "3+ years of experience in data science or analytics",
        "Proficiency in Python, R, and SQL",
        "Experience with machine learning frameworks",
        "Strong mathematical and statistical knowledge"
      ],
      responsibilities: [
        "Develop and implement machine learning algorithms",
        "Process, clean, and validate data for analysis",
        "Build data visualization tools and dashboards",
        "Communicate findings to non-technical stakeholders",
        "Keep up-to-date with the latest industry trends"
      ],
      companyLogoUrl: "https://via.placeholder.com/150",
      applicationUrl: "https://example.com/apply",
      industry: "technology"
    },
    {
      id: 3,
      title: "Marketing Manager",
      company: "BrandBoost",
      location: "Mumbai",
      jobType: "full-time",
      salary: "₹10-15 LPA",
      experience: "5+ years",
      postedDate: "2025-04-28",
      deadline: "2025-05-28",
      description: "Lead our marketing efforts to increase brand awareness and drive customer engagement. You'll develop and execute marketing strategies across multiple channels.",
      requirements: [
        "Bachelor's degree in Marketing, Business, or related field",
        "5+ years of experience in marketing",
        "Experience with digital marketing and social media",
        "Strong analytical and project management skills",
        "Excellent communication and leadership abilities"
      ],
      responsibilities: [
        "Develop and implement comprehensive marketing strategies",
        "Manage marketing budget and analyze campaign performance",
        "Coordinate with creative teams to produce engaging content",
        "Monitor competition and identify market trends",
        "Supervise marketing team and their activities"
      ],
      companyLogoUrl: "https://via.placeholder.com/150",
      applicationUrl: "https://example.com/apply",
      industry: "marketing"
    },
    {
      id: 4,
      title: "Financial Analyst",
      company: "Global Investments Ltd.",
      location: "Delhi",
      jobType: "full-time",
      salary: "₹8-12 LPA",
      experience: "2-4 years",
      postedDate: "2025-05-02",
      deadline: "2025-06-02",
      description: "Join our finance team to analyze market trends, prepare financial forecasts, and support investment decisions. You'll play a key role in our company's financial strategy.",
      requirements: [
        "Bachelor's degree in Finance, Accounting, or Business",
        "2+ years of financial analysis experience",
        "Strong analytical and financial modeling skills",
        "Proficiency in Excel and financial software",
        "CFA or pursuing CFA is a plus"
      ],
      responsibilities: [
        "Prepare financial forecasts and budgets",
        "Analyze market trends and investment opportunities",
        "Create financial models and reports",
        "Support strategic decision-making with financial insights",
        "Monitor and report on financial performance"
      ],
      companyLogoUrl: "https://via.placeholder.com/150",
      applicationUrl: "https://example.com/apply",
      industry: "finance"
    },
  ];
  
  // Apply filters if provided
  if (filters) {
    let filteredJobs = [...jobs];
    
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(keyword) || 
        job.company.toLowerCase().includes(keyword) ||
        job.description.toLowerCase().includes(keyword)
      );
    }
    
    if (filters.location) {
      const location = filters.location.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(location)
      );
    }
    
    if (filters.jobType) {
      filteredJobs = filteredJobs.filter(job => job.jobType === filters.jobType);
    }
    
    if (filters.industry) {
      filteredJobs = filteredJobs.filter(job => job.industry === filters.industry);
    }
    
    // More filters can be applied similarly
    
    return filteredJobs;
  }
  
  return jobs;
};

// Export mock data for development use
export const mockAPI = {
  getCourses: getMockCourses,
  getColleges: getMockColleges,
  getJobs: getMockJobs,
};
