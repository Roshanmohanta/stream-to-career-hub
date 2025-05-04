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
    // New Science Courses
    {
      id: 8,
      title: "B.Sc Chemistry",
      description: "Bachelor of Science in Chemistry covers organic, inorganic, physical chemistry, and laboratory techniques essential for research and industry.",
      duration: "3 Years",
      eligibility: "10+2 with PCM, Min 55%",
      stream: "science",
      collegeCount: 14,
      imageUrl: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 9,
      title: "B.Tech Electronics",
      description: "Bachelor of Technology in Electronics Engineering focuses on circuit design, signal processing, and communication systems.",
      duration: "4 Years",
      eligibility: "10+2 with PCM, Min 60%",
      stream: "science",
      collegeCount: 9,
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 10,
      title: "B.Sc Mathematics",
      description: "Bachelor of Science in Mathematics covers algebra, calculus, statistics, and numerical analysis for analytical problem-solving skills.",
      duration: "3 Years",
      eligibility: "10+2 with Mathematics, Min 55%",
      stream: "science",
      collegeCount: 11,
      imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop"
    },
    // New Commerce Courses
    {
      id: 11,
      title: "Chartered Accountancy",
      description: "Professional course covering accounting, auditing, taxation, and financial management for aspiring accountants.",
      duration: "3-5 Years",
      eligibility: "10+2 Commerce, Min 55%",
      stream: "commerce",
      collegeCount: 7,
      imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 12,
      title: "Bachelor of Economics",
      description: "Bachelor degree focusing on economic theories, models, policy analysis, and financial systems.",
      duration: "3 Years",
      eligibility: "10+2 in Commerce/Arts with Economics, Min 50%",
      stream: "commerce",
      collegeCount: 13,
      imageUrl: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 13,
      title: "Hotel Management",
      description: "Bachelor's program covering hospitality operations, food service management, and customer relations.",
      duration: "3-4 Years",
      eligibility: "10+2 in any stream, Min 50%",
      stream: "commerce",
      collegeCount: 8,
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop"
    },
    // New Arts Courses
    {
      id: 14,
      title: "BA Sociology",
      description: "Bachelor of Arts in Sociology examines social structures, human interactions, and cultural phenomena across different societies.",
      duration: "3 Years",
      eligibility: "10+2 in any stream, Min 45%",
      stream: "arts",
      collegeCount: 9,
      imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 15,
      title: "Bachelor of Fine Arts",
      description: "BFA program focuses on visual arts including painting, sculpture, photography, and digital media.",
      duration: "4 Years",
      eligibility: "10+2 in any stream + Portfolio, Min 50%",
      stream: "arts",
      collegeCount: 6,
      imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 16,
      title: "Mass Communication",
      description: "Bachelor's degree covering journalism, media production, advertising, and public relations.",
      duration: "3 Years",
      eligibility: "10+2 in any stream, Min 50%",
      stream: "arts",
      collegeCount: 10,
      imageUrl: "https://images.unsplash.com/photo-1503298506553-467f6af0cb8e?q=80&w=1000&auto=format&fit=crop"
    }
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
    // New Science Colleges
    {
      id: 5,
      name: "Indian Institute of Science",
      description: "IISc is India's premier research institute offering advanced education in various scientific disciplines with state-of-the-art laboratories.",
      location: "Bangalore",
      avgSalary: "₹14-22 LPA",
      fees: "₹1.8 Lakhs per year",
      companies: ["ISRO", "DRDO", "Intel", "Samsung", "IBM"],
      applicationDeadline: "April 15, 2025",
      applicationProcess: "GATE score followed by interview",
      imageUrl: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.iisc.ac.in/",
      courseId: 3
    },
    {
      id: 6,
      name: "Birla Institute of Technology and Science",
      description: "BITS Pilani is known for its rigorous technical education and industry connections across engineering and science disciplines.",
      location: "Pilani",
      avgSalary: "₹12-20 LPA",
      fees: "₹2.0 Lakhs per year",
      companies: ["Oracle", "Adobe", "Qualcomm", "Texas Instruments", "Cisco"],
      applicationDeadline: "May 20, 2025",
      applicationProcess: "BITSAT entrance exam",
      imageUrl: "https://images.unsplash.com/photo-1595113229230-10f8ef6b26ae?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.bits-pilani.ac.in/",
      courseId: 1
    },
    {
      id: 7,
      name: "Christian Medical College",
      description: "CMC Vellore is one of India's top medical institutions known for excellent clinical training and community health programs.",
      location: "Vellore",
      avgSalary: "₹10-16 LPA",
      fees: "₹1.2 Lakhs per year",
      companies: ["Apollo Hospitals", "Manipal Hospitals", "Medanta"],
      applicationDeadline: "May 31, 2025",
      applicationProcess: "NEET-UG followed by CMC entrance exam",
      imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.cmch-vellore.edu/",
      courseId: 2
    },
    // New Commerce Colleges
    {
      id: 8,
      name: "Faculty of Management Studies",
      description: "FMS Delhi offers top-tier management education with a focus on practical business skills and strategic thinking.",
      location: "Delhi",
      avgSalary: "₹20-32 LPA",
      fees: "₹1.9 Lakhs total",
      companies: ["BCG", "McKinsey", "Amazon", "Deloitte", "Accenture"],
      applicationDeadline: "January 15, 2025",
      applicationProcess: "CAT score followed by interview",
      imageUrl: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.fms.edu/",
      courseId: 4
    },
    {
      id: 9,
      name: "Narsee Monjee Institute of Management Studies",
      description: "NMIMS is renowned for its commerce and business programs with strong industry connections and practical training.",
      location: "Mumbai",
      avgSalary: "₹10-18 LPA",
      fees: "₹1.4 Lakhs per year",
      companies: ["Ernst & Young", "HDFC Bank", "Infosys", "TCS", "Wipro"],
      applicationDeadline: "April 10, 2025",
      applicationProcess: "NMIMS entrance test",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.nmims.edu/",
      courseId: 5
    },
    {
      id: 10,
      name: "Institute of Chartered Accountants of India",
      description: "ICAI is the apex professional body for chartered accountants in India, providing high-quality education and certification.",
      location: "Multiple Centers",
      avgSalary: "₹8-25 LPA",
      fees: "₹80,000 total",
      companies: ["Deloitte", "KPMG", "PwC", "EY", "Grant Thornton"],
      applicationDeadline: "March 1, 2025 / September 1, 2025",
      applicationProcess: "CA Foundation entrance exam",
      imageUrl: "https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.icai.org/",
      courseId: 11
    },
    // New Arts Colleges
    {
      id: 11,
      name: "Lady Shri Ram College for Women",
      description: "LSR is one of India's premier institutions for women's education in humanities and social sciences with an excellent academic reputation.",
      location: "Delhi",
      avgSalary: "₹5-10 LPA",
      fees: "₹30,000 per year",
      companies: ["Times Group", "HarperCollins", "Penguin", "Oxford University Press"],
      applicationDeadline: "June 20, 2025",
      applicationProcess: "Merit-based through university portal",
      imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.lsr.edu.in/",
      courseId: 6
    },
    {
      id: 12,
      name: "Symbiosis Centre for Media & Communication",
      description: "SCMC is a leading institute for media education with industry-relevant curriculum and state-of-the-art production facilities.",
      location: "Pune",
      avgSalary: "₹6-12 LPA",
      fees: "₹2.8 Lakhs per year",
      companies: ["Viacom18", "Sony Pictures", "Star India", "Ogilvy", "FCB"],
      applicationDeadline: "February 28, 2025",
      applicationProcess: "SET entrance exam followed by PI",
      imageUrl: "https://images.unsplash.com/photo-1503298506053-867d7f3a42e2?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.scmc.edu.in/",
      courseId: 16
    },
    {
      id: 13,
      name: "National Institute of Design",
      description: "NID is India's premier design institute offering comprehensive education in various design disciplines with focus on innovation.",
      location: "Ahmedabad",
      avgSalary: "₹8-15 LPA",
      fees: "₹3.8 Lakhs per year",
      companies: ["Apple", "Google", "Microsoft", "Titan", "Samsung"],
      applicationDeadline: "January 10, 2025",
      applicationProcess: "Design Aptitude Test followed by interview",
      imageUrl: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.nid.edu/",
      courseId: 15
    },
    {
      id: 14,
      name: "Fergusson College",
      description: "Fergusson College is known for its strong liberal arts programs and research-oriented approach to education.",
      location: "Pune",
      avgSalary: "₹4-8 LPA",
      fees: "₹25,000 per year",
      companies: ["ThoughtWorks", "Cognizant", "Infosys", "Capgemini"],
      applicationDeadline: "June 15, 2025",
      applicationProcess: "Merit-based through university portal",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.fergusson.edu/",
      courseId: 14
    },
    {
      id: 15,
      name: "Jawaharlal Nehru University",
      description: "JNU is renowned for its exceptional social sciences and humanities programs with a focus on critical thinking and research.",
      location: "New Delhi",
      avgSalary: "₹5-9 LPA",
      fees: "₹15,000 per year",
      companies: ["UNDP", "UNESCO", "Think Tanks", "Research Organizations"],
      applicationDeadline: "March 31, 2025",
      applicationProcess: "JNU Entrance Examination",
      imageUrl: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.jnu.ac.in/",
      courseId: 7
    },
    
    // Additional colleges for B.Tech Computer Science (courseId: 1)
    {
      id: 16,
      name: "National Institute of Technology, Warangal",
      description: "NIT Warangal is among India's leading technical institutes known for quality education in engineering and research excellence.",
      location: "Warangal",
      avgSalary: "₹10-18 LPA",
      fees: "₹1.5 Lakhs per year",
      companies: ["Microsoft", "Amazon", "Qualcomm", "Morgan Stanley", "Uber"],
      applicationDeadline: "June 5, 2025",
      applicationProcess: "JEE Main followed by counseling",
      imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.nitw.ac.in/",
      courseId: 1
    },
    {
      id: 17,
      name: "Vellore Institute of Technology",
      description: "VIT is a prestigious private university known for its strong focus on research, innovation and global education standards.",
      location: "Vellore",
      avgSalary: "₹8-16 LPA",
      fees: "₹2.8 Lakhs per year",
      companies: ["TCS", "Infosys", "Wipro", "HCL", "Cognizant"],
      applicationDeadline: "April 20, 2025",
      applicationProcess: "VITEEE entrance exam",
      imageUrl: "https://images.unsplash.com/photo-1513077202514-c511b41bd4c7?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://vit.ac.in/",
      courseId: 1
    },
    
    // Additional colleges for MBBS (courseId: 2)
    {
      id: 18,
      name: "King George's Medical University",
      description: "KGMU is one of the oldest medical institutions in India with excellent clinical training and research facilities.",
      location: "Lucknow",
      avgSalary: "₹10-15 LPA",
      fees: "₹1.2 Lakhs per year",
      companies: ["Apollo Hospitals", "Fortis Healthcare", "Medanta"],
      applicationDeadline: "May 25, 2025",
      applicationProcess: "NEET-UG followed by counseling",
      imageUrl: "https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.kgmu.org/",
      courseId: 2
    },
    {
      id: 19,
      name: "Seth G.S. Medical College",
      description: "One of the premier medical institutions attached to the KEM Hospital with strong clinical exposure and research opportunities.",
      location: "Mumbai",
      avgSalary: "₹12-16 LPA",
      fees: "₹1.3 Lakhs per year",
      companies: ["Lilavati Hospital", "Kokilaben Hospital", "Tata Memorial"],
      applicationDeadline: "June 10, 2025",
      applicationProcess: "NEET-UG followed by state counseling",
      imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.kem.edu/",
      courseId: 2
    },
    
    // Additional colleges for B.Sc Physics (courseId: 3)
    {
      id: 20,
      name: "St. Xavier's College",
      description: "St. Xavier's College is renowned for its excellent science programs and research-oriented education in physics.",
      location: "Mumbai",
      avgSalary: "₹5-9 LPA",
      fees: "₹35,000 per year",
      companies: ["BARC", "ISRO", "TIFR", "Research Institutions"],
      applicationDeadline: "June 15, 2025",
      applicationProcess: "Merit-based through university portal",
      imageUrl: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.xaviers.edu/",
      courseId: 3
    },
    {
      id: 21,
      name: "Presidency College",
      description: "Presidency College has a distinguished history of excellence in physics education with modern laboratory facilities.",
      location: "Kolkata",
      avgSalary: "₹4-8 LPA",
      fees: "₹18,000 per year",
      companies: ["IISER", "IIT Research Labs", "Educational Institutions"],
      applicationDeadline: "May 30, 2025",
      applicationProcess: "Merit-based admission through university",
      imageUrl: "https://images.unsplash.com/photo-1636466497217-06a6f914e4f4?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.presiuniv.ac.in/",
      courseId: 3
    },
    
    // Additional colleges for BBA (courseId: 4)
    {
      id: 22,
      name: "Christ University",
      description: "Christ University is known for its holistic approach to business education with strong industry connections.",
      location: "Bangalore",
      avgSalary: "₹7-12 LPA",
      fees: "₹1.5 Lakhs per year",
      companies: ["Deloitte", "KPMG", "EY", "Accenture", "Capgemini"],
      applicationDeadline: "April 10, 2025",
      applicationProcess: "Christ University Entrance Test and interview",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.christuniversity.in/",
      courseId: 4
    },
    {
      id: 23,
      name: "Symbiosis Centre for Management Studies",
      description: "SCMS provides industry-oriented business education with emphasis on practical exposure and entrepreneurship.",
      location: "Pune",
      avgSalary: "₹8-14 LPA",
      fees: "₹2.2 Lakhs per year",
      companies: ["Amazon", "Flipkart", "HSBC", "HDFC Bank", "Infosys"],
      applicationDeadline: "February 28, 2025",
      applicationProcess: "SET entrance exam followed by GE-PI",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.symbiosis.ac.in/",
      courseId: 4
    },
    
    // Additional colleges for B.Com (courseId: 5)
    {
      id: 24,
      name: "St. Xavier's College",
      description: "St. Xavier's College is known for its excellent commerce program and strong placement record.",
      location: "Kolkata",
      avgSalary: "₹6-12 LPA",
      fees: "₹40,000 per year",
      companies: ["Deloitte", "PwC", "KPMG", "HDFC Bank", "ICICI Bank"],
      applicationDeadline: "June 5, 2025",
      applicationProcess: "Merit-based through university portal",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.sxccal.edu/",
      courseId: 5
    },
    {
      id: 25,
      name: "Loyola College",
      description: "Loyola College offers a comprehensive commerce program with emphasis on practical skills and industry exposure.",
      location: "Chennai",
      avgSalary: "₹5-10 LPA",
      fees: "₹35,000 per year",
      companies: ["TCS", "Infosys", "CTS", "HCL", "Wipro"],
      applicationDeadline: "May 25, 2025",
      applicationProcess: "Merit-based admission process",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.loyolacollege.edu/",
      courseId: 5
    },
    {
      id: 26,
      name: "Christ University",
      description: "Christ University's commerce program is known for its rigorous curriculum and strong industry connections.",
      location: "Bangalore",
      avgSalary: "₹7-13 LPA",
      fees: "₹1.2 Lakhs per year",
      companies: ["EY", "Goldman Sachs", "JP Morgan", "Accenture"],
      applicationDeadline: "April 15, 2025",
      applicationProcess: "University entrance test and interview",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.christuniversity.in/",
      courseId: 5
    },
    
    // Additional colleges for BA Literature (courseId: 6)
    {
      id: 27,
      name: "Jadavpur University",
      description: "Jadavpur University is renowned for its literature program with distinguished faculty and rich academic tradition.",
      location: "Kolkata",
      avgSalary: "₹4-8 LPA",
      fees: "₹20,000 per year",
      companies: ["Publishing Houses", "Media Companies", "Educational Institutions"],
      applicationDeadline: "June 10, 2025",
      applicationProcess: "University entrance exam",
      imageUrl: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "http://www.jaduniv.edu.in/",
      courseId: 6
    },
    {
      id: 28,
      name: "Presidency University",
      description: "Presidency University offers a prestigious literature program with focus on critical analysis and literary theory.",
      location: "Kolkata",
      avgSalary: "₹4-7 LPA",
      fees: "₹18,000 per year",
      companies: ["Educational Institutions", "Publishing Houses", "Content Creation"],
      applicationDeadline: "May 20, 2025",
      applicationProcess: "Merit-based selection through entrance test",
      imageUrl: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.presiuniv.ac.in/",
      courseId: 6
    },
    
    // Additional colleges for BA Psychology (courseId: 7)
    {
      id: 29,
      name: "Christ University",
      description: "Christ University's psychology program is known for its comprehensive curriculum and practical applications.",
      location: "Bangalore",
      avgSalary: "₹5-10 LPA",
      fees: "₹1.2 Lakhs per year",
      companies: ["Hospitals", "NGOs", "Educational Institutions", "Corporate"],
      applicationDeadline: "April 15, 2025",
      applicationProcess: "University entrance test and interview",
      imageUrl: "https://images.unsplash.com/photo-1576669801775-ff43c5ab079d?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.christuniversity.in/",
      courseId: 7
    },
    {
      id: 30,
      name: "Fergusson College",
      description: "Fergusson College offers a well-structured psychology program with focus on research and clinical applications.",
      location: "Pune",
      avgSalary: "₹4-9 LPA",
      fees: "₹30,000 per year",
      companies: ["Healthcare Organizations", "Research Institutions", "Counseling Centers"],
      applicationDeadline: "June 5, 2025",
      applicationProcess: "Merit-based through university portal",
      imageUrl: "https://images.unsplash.com/photo-1576669801775-ff43c5ab079d?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.fergusson.edu/",
      courseId: 7
    },
    {
      id: 31,
      name: "Kamala Nehru College",
      description: "Kamala Nehru College provides a comprehensive psychology education with well-equipped laboratories and research facilities.",
      location: "Delhi",
      avgSalary: "₹5-8 LPA",
      fees: "₹25,000 per year",
      companies: ["Hospitals", "Schools", "Corporate Organizations", "NGOs"],
      applicationDeadline: "June 20, 2025",
      applicationProcess: "Merit-based through university portal",
      imageUrl: "https://images.unsplash.com/photo-1576669801775-ff43c5ab079d?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.knc.edu.in/",
      courseId: 7
    },
    
    // Additional colleges for B.Sc Chemistry (courseId: 8)
    {
      id: 32,
      name: "St. Stephen's College",
      description: "St. Stephen's College offers an excellent chemistry program with well-equipped laboratories and distinguished faculty.",
      location: "Delhi",
      avgSalary: "₹5-10 LPA",
      fees: "₹40,000 per year",
      companies: ["Pharmaceutical Companies", "Research Institutions", "Chemical Industries"],
      applicationDeadline: "June 15, 2025",
      applicationProcess: "Merit-based through university portal and interview",
      imageUrl: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.ststephens.edu/",
      courseId: 8
    },
    {
      id: 33,
      name: "Loyola College",
      description: "Loyola College's chemistry department is known for its research facilities and industry connections.",
      location: "Chennai",
      avgSalary: "₹5-9 LPA",
      fees: "₹35,000 per year",
      companies: ["Pharmaceutical Industries", "DRDO", "Research Labs"],
      applicationDeadline: "May 25, 2025",
      applicationProcess: "Merit-based admission process",
      imageUrl: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=1000&auto=format&fit=crop",
      websiteUrl: "https://www.loyolacollege.edu/",
      courseId: 8
    }
  ];
  
  if (courseId) {
    return colleges.filter(college => college.courseId === courseId);
  }
  
  return colleges;
};

// Mock API - sample methods for college comparison
export const mockAPI = {
  getStreams: () => {
    return [
      { id: "science", name: "Science", courseCount: 5 },
      { id: "commerce", name: "Commerce", courseCount: 5 },
      { id: "arts", name: "Arts & Humanities", courseCount: 6 }
    ];
  },
  getCourses: (streamId?: string) => {
    return getMockCourses(streamId);
  },
  getCourseById: (id: number) => {
    return getMockCourses().find(course => course.id === id);
  },
  getColleges: (courseId?: number) => {
    return getMockColleges(courseId);
  },
  getCollegeById: (id: number) => {
    return getMockColleges().find(college => college.id === id);
  },
  getJobs: (filters?: Record<string, any>) => {
    // Sample job data
    const jobs = [
      {
        id: 1,
        title: "Software Developer",
        company: "TechCorp Solutions",
        location: "Bangalore, India",
        jobType: "Full-time",
        salary: "₹12-18 LPA",
        experience: "2-4 years",
        postedDate: "2025-04-20",
        deadline: "2025-06-15",
        description: "We are looking for a skilled Software Developer to join our team to design, develop and implement high-quality software solutions.",
        requirements: [
          "Bachelor's degree in Computer Science or related field",
          "2-4 years of experience in software development",
          "Proficiency in JavaScript, TypeScript, and React",
          "Experience with Node.js and database technologies",
          "Good problem-solving skills"
        ],
        responsibilities: [
          "Develop and maintain high-quality software",
          "Collaborate with cross-functional teams",
          "Debug and fix issues in existing applications",
          "Write clean, maintainable code with proper documentation",
          "Participate in code reviews and knowledge sharing"
        ],
        companyLogoUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
        applicationUrl: "https://techcorp.example.com/careers/software-developer"
      },
      {
        id: 2,
        title: "Data Scientist",
        company: "AnalyticsFirst",
        location: "Hyderabad, India",
        jobType: "Full-time",
        salary: "₹15-22 LPA",
        experience: "3-5 years",
        postedDate: "2025-04-25",
        deadline: "2025-05-25",
        description: "Join our data science team to build predictive models and extract valuable insights from large datasets to drive business decisions.",
        requirements: [
          "Master's or PhD in Statistics, Computer Science, or related field",
          "3-5 years of experience in data science or analytics",
          "Strong knowledge of statistical analysis and machine learning algorithms",
          "Proficiency in Python, R, and SQL",
          "Experience with big data technologies"
        ],
        responsibilities: [
          "Develop and implement machine learning models",
          "Extract insights from complex datasets",
          "Create data visualizations and dashboards",
          "Collaborate with business teams to understand requirements",
          "Present findings to technical and non-technical stakeholders"
        ],
        companyLogoUrl: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1000&auto=format&fit=crop",
        applicationUrl: "https://analyticsfirst.example.com/careers/data-scientist"
      },
      {
        id: 3,
        title: "UI/UX Designer",
        company: "DesignWave Studios",
        location: "Mumbai, India",
        jobType: "Full-time",
        salary: "₹8-14 LPA",
        experience: "2-4 years",
        postedDate: "2025-04-28",
        deadline: "2025-05-28",
        description: "We're seeking a creative UI/UX Designer to create engaging and intuitive user experiences for web and mobile applications.",
        requirements: [
          "Bachelor's degree in Design, HCI, or related field",
          "2-4 years of experience in UI/UX design",
          "Proficiency in Figma, Adobe XD, and other design tools",
          "Understanding of user research and usability testing",
          "Portfolio demonstrating UI/UX projects"
        ],
        responsibilities: [
          "Create wireframes, prototypes, and high-fidelity designs",
          "Conduct user research and usability testing",
          "Collaborate with product managers and developers",
          "Create and maintain design systems",
          "Stay updated with latest design trends and best practices"
        ],
        companyLogoUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop",
        applicationUrl: "https://designwave.example.com/careers/ui-ux-designer"
      },
      {
        id: 4,
        title: "Product Manager",
        company: "InnovateTech",
        location: "Delhi, India",
        jobType: "Full-time",
        salary: "₹18-25 LPA",
        experience: "4-6 years",
        postedDate: "2025-04-15",
        deadline: "2025-05-20",
        description: "We are looking for an experienced Product Manager to lead our product development initiatives and drive user satisfaction.",
        requirements: [
          "Bachelor's or Master's degree in Business, Engineering or related field",
          "4-6 years of experience in product management",
          "Strong understanding of product development lifecycle",
          "Experience with agile methodologies",
          "Excellent communication and leadership skills"
        ],
        responsibilities: [
          "Define product vision, strategy, and roadmap",
          "Gather and prioritize product requirements",
          "Work with engineering teams to deliver features",
          "Analyze market trends and competition",
          "Track and measure product performance metrics"
        ],
        companyLogoUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1000&auto=format&fit=crop",
        applicationUrl: "https://innovatetech.example.com/careers/product-manager"
      },
      {
        id: 5,
        title: "DevOps Engineer",
        company: "CloudNative Systems",
        location: "Pune, India",
        jobType: "Full-time",
        salary: "₹14-20 LPA",
        experience: "3-5 years",
        postedDate: "2025-04-22",
        deadline: "2025-05-30",
        description: "Join our team to build and maintain our cloud infrastructure and improve our CI/CD pipelines for faster and more reliable deployments.",
        requirements: [
          "Bachelor's degree in Computer Science or related field",
          "3-5 years of experience in DevOps or similar role",
          "Experience with AWS, Azure, or Google Cloud",
          "Knowledge of containerization (Docker, Kubernetes)",
          "Experience with CI/CD tools (Jenkins, GitLab CI)"
        ],
        responsibilities: [
          "Design and implement cloud infrastructure",
          "Automate deployment processes",
          "Monitor system performance and troubleshoot issues",
          "Implement security best practices",
          "Collaborate with development teams to streamline processes"
        ],
        companyLogoUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop",
        applicationUrl: "https://cloudnative.example.com/careers/devops-engineer"
      }
    ];

    // Apply filters if provided
    if (filters && Object.keys(filters).length > 0) {
      return jobs.filter(job => {
        // Simple filtering logic - can be expanded based on requirements
        if (filters.jobType && job.jobType !== filters.jobType) return false;
        if (filters.location && !job.location.includes(filters.location)) return false;
        if (filters.experience) {
          // Example filtering for experience
          const minExp = parseInt(job.experience.split('-')[0]);
          if (filters.experience === "0-2" && minExp > 2) return false;
          if (filters.experience === "3-5" && (minExp < 3 || minExp > 5)) return false;
          if (filters.experience === "5+" && minExp < 5) return false;
        }
        return true;
      });
    }

    return jobs;
  }
};
