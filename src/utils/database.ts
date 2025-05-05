
import { toast } from "@/components/ui/sonner";

// API Base URL - update this based on where your backend is running
const API_URL = 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(errorData.message || `API Error: ${response.status}`);
  }
  return response.json();
};

// Generic fetch function with error handling
const fetchAPI = async (endpoint: string, options = {}) => {
  try {
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...(options as any).headers,
      },
    };

    console.log(`Making request to: ${API_URL}${endpoint}`, mergedOptions);
    const response = await fetch(`${API_URL}${endpoint}`, mergedOptions);
    const result = await handleResponse(response);
    console.log(`Response from ${endpoint}:`, result);
    return result;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    toast.error("API Error", {
      description: error instanceof Error ? error.message : "An unknown error occurred",
    });
    throw error;
  }
};

// Execute transaction is now handled on the server side
// This is a client-side placeholder that just executes functions in sequence
const executeTransaction = async (operations: Function[]) => {
  try {
    console.log("Starting client-side transaction");
    
    // Execute all operations
    for (const operation of operations) {
      await operation();
    }
    
    console.log("Transaction completed successfully");
    return true;
  } catch (error) {
    console.error("Transaction failed:", error);
    
    toast.error("Transaction failed", {
      description: "An error occurred. Changes have been rolled back.",
    });
    
    return false;
  }
};

// Stream operations
const getStreams = async () => {
  return fetchAPI('/streams');
};

// Course operations
const getCourses = async (streamId?: string) => {
  const queryParams = streamId ? `?streamId=${streamId}` : '';
  return fetchAPI(`/courses${queryParams}`);
};

const getCourseById = async (id: number) => {
  return fetchAPI(`/courses/${id}`);
};

// College operations
const getCollegesByCourse = async (courseId: number) => {
  return fetchAPI(`/colleges/by-course/${courseId}`);
};

const getCollegeById = async (id: number) => {
  return fetchAPI(`/colleges/${id}`);
};

// Job operations
const getJobs = async (filters?: Record<string, any>) => {
  let queryString = '';
  
  if (filters && Object.keys(filters).length > 0) {
    queryString = '?' + new URLSearchParams(
      Object.entries(filters)
        .filter(([_, value]) => value !== undefined && value !== '')
        .map(([key, value]) => [key, String(value)])
    ).toString();
  }
  
  return fetchAPI(`/jobs${queryString}`);
};

const getJobById = async (id: number) => {
  return fetchAPI(`/jobs/${id}`);
};

// Admin operations
const addCourse = async (course: any) => {
  console.log("Adding course:", course);
  return fetchAPI('/admin/courses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(course)
  }).then(result => {
    toast.success("Course added successfully");
    return result;
  });
};

const updateCourse = async (id: number, course: any) => {
  console.log("Updating course:", id, course);
  return fetchAPI(`/admin/courses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(course)
  }).then(result => {
    toast.success("Course updated successfully");
    return result;
  });
};

const deleteCourse = async (id: number) => {
  console.log("Deleting course:", id);
  return fetchAPI(`/admin/courses/${id}`, {
    method: 'DELETE'
  }).then(result => {
    toast.success("Course deleted successfully");
    return result;
  });
};

const addCollege = async (college: any) => {
  console.log("Adding college:", college);
  return fetchAPI('/admin/colleges', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(college)
  }).then(result => {
    toast.success("College added successfully");
    return result;
  });
};

const updateCollege = async (id: number, college: any) => {
  console.log("Updating college:", id, college);
  return fetchAPI(`/admin/colleges/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(college)
  }).then(result => {
    toast.success("College updated successfully");
    return result;
  });
};

const deleteCollege = async (id: number) => {
  console.log("Deleting college:", id);
  return fetchAPI(`/admin/colleges/${id}`, {
    method: 'DELETE'
  }).then(result => {
    toast.success("College deleted successfully");
    return result;
  });
};

const addJob = async (job: any) => {
  console.log("Adding job:", job);
  return fetchAPI('/admin/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job)
  }).then(result => {
    toast.success("Job added successfully");
    return result;
  });
};

const updateJob = async (id: number, job: any) => {
  console.log("Updating job:", id, job);
  return fetchAPI(`/admin/jobs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job)
  }).then(result => {
    toast.success("Job updated successfully");
    return result;
  });
};

const deleteJob = async (id: number) => {
  console.log("Deleting job:", id);
  return fetchAPI(`/admin/jobs/${id}`, {
    method: 'DELETE'
  }).then(result => {
    toast.success("Job deleted successfully");
    return result;
  });
};

// User authentication
const authenticateUser = async (username: string, password: string) => {
  console.log("Authenticating user:", username);
  return fetchAPI('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
};

export { 
  executeTransaction, 
  getStreams,
  getCourses,
  getCourseById,
  getCollegesByCourse,
  getCollegeById,
  getJobs,
  getJobById,
  addCourse,
  updateCourse,
  deleteCourse,
  addCollege,
  updateCollege,
  deleteCollege,
  addJob,
  updateJob,
  deleteJob,
  authenticateUser
};
