import { toast } from "@/components/ui/sonner";
import { mockAPI } from "@/services/api";

// Note: This is a client-side application that cannot directly connect to MySQL.
// We're using mock data instead but keeping the same function signatures for consistency.
// In a real application, these functions would make HTTP requests to a backend API.
// The MySQL code is kept for reference but not executed in the browser.

// Client-side mock functions that mimic database operations
const executeQuery = async (query: string, params: any[] = []) => {
  console.log("Mock executeQuery called with:", query, params);
  try {
    // Mock a successful query result
    return { success: true, data: [] };
  } catch (error) {
    console.error("Query execution failed:", error);
    toast.error("Database error", {
      description: "Failed to execute database operation.",
    });
    throw error;
  }
};

const executeTransaction = async (operations: Function[]) => {
  try {
    console.log("Starting mock transaction");
    
    // Execute all operations - they will just log in client environment
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
  return mockAPI.getStreams();
};

// Course operations
const getCourses = async (streamId?: number) => {
  return mockAPI.getCourses(streamId);
};

const getCourseById = async (id: number) => {
  const courses = mockAPI.getCourses();
  return courses.find(course => course.id === id);
};

// College operations
const getCollegesByCourse = async (courseId: number) => {
  return mockAPI.getCollegesByCourse(courseId);
};

const getCollegeById = async (id: number) => {
  const college = mockAPI.getCollegeById(id);
  
  if (college) {
    // Add companies information if not already present
    if (!college.companies) {
      college.companies = mockAPI.getCompaniesByCollege(id).map(company => company.name);
    }
  }
  
  return college;
};

// Job operations
const getJobs = async (filters?: Record<string, any>) => {
  return mockAPI.getJobs(filters);
};

const getJobById = async (id: number) => {
  const job = mockAPI.getJobById(id);
  return job;
};

// Admin operations
const addCourse = async (course: any) => {
  console.log("Adding course (mock):", course);
  toast.success("Course added successfully", {
    description: "This is a mock operation. In a real app, this would be saved to a database.",
  });
  return { insertId: Date.now() }; // Simulate an insert ID
};

const updateCourse = async (id: number, course: any) => {
  console.log("Updating course (mock):", id, course);
  toast.success("Course updated successfully", {
    description: "This is a mock operation. In a real app, this would update the database.",
  });
  return { affectedRows: 1 }; // Simulate affected rows
};

const deleteCourse = async (id: number) => {
  console.log("Deleting course (mock):", id);
  toast.success("Course deleted successfully", {
    description: "This is a mock operation. In a real app, this would delete from the database.",
  });
  return { affectedRows: 1 }; // Simulate affected rows
};

const addCollege = async (college: any) => {
  console.log("Adding college (mock):", college);
  toast.success("College added successfully", {
    description: "This is a mock operation. In a real app, this would be saved to a database.",
  });
  return { insertId: Date.now() }; // Simulate an insert ID
};

const updateCollege = async (id: number, college: any) => {
  console.log("Updating college (mock):", id, college);
  toast.success("College updated successfully", {
    description: "This is a mock operation. In a real app, this would update the database.",
  });
  return { success: true };
};

const deleteCollege = async (id: number) => {
  console.log("Deleting college (mock):", id);
  toast.success("College deleted successfully", {
    description: "This is a mock operation. In a real app, this would delete from the database.",
  });
  return { affectedRows: 1 }; // Simulate affected rows
};

const addJob = async (job: any) => {
  console.log("Adding job (mock):", job);
  toast.success("Job added successfully", {
    description: "This is a mock operation. In a real app, this would be saved to a database.",
  });
  return { insertId: Date.now() }; // Simulate an insert ID
};

const updateJob = async (id: number, job: any) => {
  console.log("Updating job (mock):", id, job);
  toast.success("Job updated successfully", {
    description: "This is a mock operation. In a real app, this would update the database.",
  });
  return { success: true };
};

const deleteJob = async (id: number) => {
  console.log("Deleting job (mock):", id);
  toast.success("Job deleted successfully", {
    description: "This is a mock operation. In a real app, this would delete from the database.",
  });
  return { affectedRows: 1 }; // Simulate affected rows
};

// User authentication
const authenticateUser = async (username: string, password: string) => {
  // For demo purposes, we'll accept admin/admin123
  if (username === "admin" && password === "admin123") {
    return { 
      success: true, 
      user: { 
        id: 1, 
        username: "admin", 
        role: "admin" 
      } 
    };
  } else {
    return { success: false, message: "Invalid username or password" };
  }
};

// MySQL configuration (for server-side use only - not used in browser)
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "Roshan@123",
  database: "careerrecommendationdb",
};

export { 
  executeTransaction, 
  executeQuery, 
  dbConfig,
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
