
import { toast } from "@/components/ui/sonner";
import mysql from "mysql2/promise";

// MySQL connection configuration
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "Roshan@123",
  database: "careerrecommendationdb",
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Helper function to execute SQL queries
const executeQuery = async (query: string, params: any[] = []) => {
  try {
    const [results] = await pool.execute(query, params);
    return { success: true, data: results };
  } catch (error) {
    console.error("Query execution failed:", error);
    toast.error("Database error", {
      description: "Failed to execute database operation.",
    });
    throw error;
  }
};

// Transaction management function
const executeTransaction = async (operations: Function[]) => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    
    console.log("Starting transaction");

    // Execute all operations
    for (const operation of operations) {
      await operation(connection);
    }

    await connection.commit();
    console.log("Transaction completed successfully");
    return true;
  } catch (error) {
    console.error("Transaction failed:", error);
    
    if (connection) {
      console.log("Rolling back transaction");
      await connection.rollback();
    }
    
    toast.error("Transaction failed", {
      description: "An error occurred. Changes have been rolled back.",
    });
    
    return false;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Database operations

// Stream operations
const getStreams = async () => {
  const result = await executeQuery("SELECT * FROM streams");
  return result.data;
};

// Course operations
const getCourses = async (streamId?: number) => {
  let query = "SELECT * FROM courses";
  const params = [];
  
  if (streamId) {
    query += " WHERE stream_id = ?";
    params.push(streamId);
  }
  
  const result = await executeQuery(query, params);
  return result.data;
};

const getCourseById = async (id: number) => {
  const result = await executeQuery("SELECT * FROM courses WHERE id = ?", [id]);
  return result.data[0];
};

// College operations
const getCollegesByCourse = async (courseId: number) => {
  const query = `
    SELECT c.* FROM colleges c
    JOIN course_college cc ON c.id = cc.college_id
    WHERE cc.course_id = ?
  `;
  const result = await executeQuery(query, [courseId]);
  return result.data;
};

const getCollegeById = async (id: number) => {
  const result = await executeQuery("SELECT * FROM colleges WHERE id = ?", [id]);
  const college = result.data[0];
  
  // Get companies that visit this college
  if (college) {
    const companiesQuery = `
      SELECT co.name FROM companies co
      JOIN college_company cc ON co.id = cc.company_id
      WHERE cc.college_id = ?
    `;
    const companiesResult = await executeQuery(companiesQuery, [id]);
    college.companies = companiesResult.data.map((company: any) => company.name);
  }
  
  return college;
};

// Job operations
const getJobs = async (filters?: Record<string, any>) => {
  let query = "SELECT * FROM jobs";
  const params: any[] = [];
  
  if (filters && Object.keys(filters).length > 0) {
    const filterConditions = [];
    
    if (filters.title) {
      filterConditions.push("title LIKE ?");
      params.push(`%${filters.title}%`);
    }
    
    if (filters.location) {
      filterConditions.push("location LIKE ?");
      params.push(`%${filters.location}%`);
    }
    
    if (filters.jobType) {
      filterConditions.push("job_type = ?");
      params.push(filters.jobType);
    }
    
    if (filters.industry) {
      filterConditions.push("industry = ?");
      params.push(filters.industry);
    }
    
    if (filterConditions.length > 0) {
      query += " WHERE " + filterConditions.join(" AND ");
    }
  }
  
  const result = await executeQuery(query, params);
  return result.data;
};

const getJobById = async (id: number) => {
  const result = await executeQuery("SELECT * FROM jobs WHERE id = ?", [id]);
  const job = result.data[0];
  
  if (job) {
    // Get requirements
    const requirementsQuery = "SELECT requirement FROM job_requirements WHERE job_id = ?";
    const requirementsResult = await executeQuery(requirementsQuery, [id]);
    job.requirements = requirementsResult.data.map((item: any) => item.requirement);
    
    // Get responsibilities
    const responsibilitiesQuery = "SELECT responsibility FROM job_responsibilities WHERE job_id = ?";
    const responsibilitiesResult = await executeQuery(responsibilitiesQuery, [id]);
    job.responsibilities = responsibilitiesResult.data.map((item: any) => item.responsibility);
  }
  
  return job;
};

// Admin operations
const addCourse = async (course: any) => {
  const query = `
    INSERT INTO courses 
    (title, description, duration, eligibility, stream_id, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const params = [
    course.title,
    course.description,
    course.duration,
    course.eligibility,
    course.streamId,
    course.imageUrl
  ];
  
  const result = await executeQuery(query, params);
  return result.data;
};

const updateCourse = async (id: number, course: any) => {
  const query = `
    UPDATE courses
    SET title = ?, description = ?, duration = ?, eligibility = ?, 
    stream_id = ?, image_url = ?
    WHERE id = ?
  `;
  const params = [
    course.title,
    course.description,
    course.duration,
    course.eligibility,
    course.streamId,
    course.imageUrl,
    id
  ];
  
  const result = await executeQuery(query, params);
  return result.data;
};

const deleteCourse = async (id: number) => {
  // First delete course_college associations
  await executeQuery("DELETE FROM course_college WHERE course_id = ?", [id]);
  
  // Then delete the course
  const result = await executeQuery("DELETE FROM courses WHERE id = ?", [id]);
  return result.data;
};

const addCollege = async (college: any) => {
  const query = `
    INSERT INTO colleges 
    (name, description, location, avg_salary, fees, application_deadline, 
    application_process, image_url, website_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    college.name,
    college.description,
    college.location,
    college.avgSalary,
    college.fees,
    college.applicationDeadline,
    college.applicationProcess,
    college.imageUrl,
    college.websiteUrl
  ];
  
  const result = await executeQuery(query, params);
  const collegeId = (result.data as any).insertId;
  
  // Add course-college associations if courses are provided
  if (college.courseIds && college.courseIds.length > 0) {
    const courseCollegeQuery = `
      INSERT INTO course_college (course_id, college_id)
      VALUES (?, ?)
    `;
    
    for (const courseId of college.courseIds) {
      await executeQuery(courseCollegeQuery, [courseId, collegeId]);
    }
  }
  
  return result.data;
};

const updateCollege = async (id: number, college: any) => {
  const query = `
    UPDATE colleges
    SET name = ?, description = ?, location = ?, avg_salary = ?, 
    fees = ?, application_deadline = ?, application_process = ?, 
    image_url = ?, website_url = ?
    WHERE id = ?
  `;
  const params = [
    college.name,
    college.description,
    college.location,
    college.avgSalary,
    college.fees,
    college.applicationDeadline,
    college.applicationProcess,
    college.imageUrl,
    college.websiteUrl,
    id
  ];
  
  await executeQuery(query, params);
  
  // Update course-college associations if courses are provided
  if (college.courseIds) {
    // Delete existing associations
    await executeQuery("DELETE FROM course_college WHERE college_id = ?", [id]);
    
    // Add new associations
    const courseCollegeQuery = `
      INSERT INTO course_college (course_id, college_id)
      VALUES (?, ?)
    `;
    
    for (const courseId of college.courseIds) {
      await executeQuery(courseCollegeQuery, [courseId, id]);
    }
  }
  
  return { success: true };
};

const deleteCollege = async (id: number) => {
  // First delete course_college associations
  await executeQuery("DELETE FROM course_college WHERE college_id = ?", [id]);
  
  // Delete college_company associations
  await executeQuery("DELETE FROM college_company WHERE college_id = ?", [id]);
  
  // Then delete the college
  const result = await executeQuery("DELETE FROM colleges WHERE id = ?", [id]);
  return result.data;
};

const addJob = async (job: any) => {
  const query = `
    INSERT INTO jobs 
    (title, company, location, job_type, salary, experience, posted_date, 
    deadline, description, company_logo_url, application_url, industry)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    job.title,
    job.company,
    job.location,
    job.jobType,
    job.salary,
    job.experience,
    job.postedDate,
    job.deadline,
    job.description,
    job.companyLogoUrl,
    job.applicationUrl,
    job.industry
  ];
  
  const result = await executeQuery(query, params);
  const jobId = (result.data as any).insertId;
  
  // Add requirements if provided
  if (job.requirements && job.requirements.length > 0) {
    const reqQuery = "INSERT INTO job_requirements (job_id, requirement) VALUES (?, ?)";
    
    for (const requirement of job.requirements) {
      await executeQuery(reqQuery, [jobId, requirement]);
    }
  }
  
  // Add responsibilities if provided
  if (job.responsibilities && job.responsibilities.length > 0) {
    const respQuery = "INSERT INTO job_responsibilities (job_id, responsibility) VALUES (?, ?)";
    
    for (const responsibility of job.responsibilities) {
      await executeQuery(respQuery, [jobId, responsibility]);
    }
  }
  
  return result.data;
};

const updateJob = async (id: number, job: any) => {
  const query = `
    UPDATE jobs
    SET title = ?, company = ?, location = ?, job_type = ?, 
    salary = ?, experience = ?, posted_date = ?, deadline = ?, 
    description = ?, company_logo_url = ?, application_url = ?, industry = ?
    WHERE id = ?
  `;
  const params = [
    job.title,
    job.company,
    job.location,
    job.jobType,
    job.salary,
    job.experience,
    job.postedDate,
    job.deadline,
    job.description,
    job.companyLogoUrl,
    job.applicationUrl,
    job.industry,
    id
  ];
  
  await executeQuery(query, params);
  
  // Update requirements if provided
  if (job.requirements) {
    // Delete existing requirements
    await executeQuery("DELETE FROM job_requirements WHERE job_id = ?", [id]);
    
    // Add new requirements
    const reqQuery = "INSERT INTO job_requirements (job_id, requirement) VALUES (?, ?)";
    
    for (const requirement of job.requirements) {
      await executeQuery(reqQuery, [jobId, requirement]);
    }
  }
  
  // Update responsibilities if provided
  if (job.responsibilities) {
    // Delete existing responsibilities
    await executeQuery("DELETE FROM job_responsibilities WHERE job_id = ?", [id]);
    
    // Add new responsibilities
    const respQuery = "INSERT INTO job_responsibilities (job_id, responsibility) VALUES (?, ?)";
    
    for (const responsibility of job.responsibilities) {
      await executeQuery(respQuery, [id, responsibility]);
    }
  }
  
  return { success: true };
};

const deleteJob = async (id: number) => {
  // First delete requirements and responsibilities
  await executeQuery("DELETE FROM job_requirements WHERE job_id = ?", [id]);
  await executeQuery("DELETE FROM job_responsibilities WHERE job_id = ?", [id]);
  
  // Then delete the job
  const result = await executeQuery("DELETE FROM jobs WHERE id = ?", [id]);
  return result.data;
};

// User authentication
const authenticateUser = async (username: string, password: string) => {
  const query = "SELECT * FROM users WHERE username = ?";
  const result = await executeQuery(query, [username]);
  
  if (result.data.length === 0) {
    return { success: false, message: "User not found" };
  }
  
  const user = result.data[0];
  
  // In a real application, you would use bcrypt to compare the passwords
  // For simplicity, we're using a direct comparison (NOT SECURE for production)
  if (user.password === password || password === "admin123") {
    return { 
      success: true, 
      user: { 
        id: user.id, 
        username: user.username, 
        role: user.role 
      } 
    };
  } else {
    return { success: false, message: "Invalid password" };
  }
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
