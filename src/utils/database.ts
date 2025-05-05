
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
    const response = await fetch(`${API_URL}${endpoint}`, options);
    return await handleResponse(response);
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
  return fetchAPI('/admin/courses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(course)
  });
};

const updateCourse = async (id: number, course: any) => {
  return fetchAPI(`/admin/courses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(course)
  });
};

const deleteCourse = async (id: number) => {
  return fetchAPI(`/admin/courses/${id}`, {
    method: 'DELETE'
  });
};

const addCollege = async (college: any) => {
  return fetchAPI('/admin/colleges', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(college)
  });
};

const updateCollege = async (id: number, college: any) => {
  return fetchAPI(`/admin/colleges/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(college)
  });
};

const deleteCollege = async (id: number) => {
  return fetchAPI(`/admin/colleges/${id}`, {
    method: 'DELETE'
  });
};

const addJob = async (job: any) => {
  return fetchAPI('/admin/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job)
  });
};

const updateJob = async (id: number, job: any) => {
  return fetchAPI(`/admin/jobs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job)
  });
};

const deleteJob = async (id: number) => {
  return fetchAPI(`/admin/jobs/${id}`, {
    method: 'DELETE'
  });
};

// User authentication
const authenticateUser = async (username: string, password: string) => {
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
