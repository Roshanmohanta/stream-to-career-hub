
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Roshan@123',
  database: 'careerrecommendationdb',
};

// Create pool for database connections
const pool = mysql.createPool(dbConfig);

// Test database connection
app.get('/api/test', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    res.json({ message: 'Database connection successful' });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// API Endpoints

// Get all streams
app.get('/api/streams', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM streams');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching streams:', error);
    res.status(500).json({ error: 'Failed to fetch streams' });
  }
});

// Get courses (with optional stream filter)
app.get('/api/courses', async (req, res) => {
  try {
    const { streamId } = req.query;
    
    let query = 'SELECT * FROM courses';
    let params = [];
    
    if (streamId) {
      query += ' WHERE stream_id = ?';
      params.push(streamId);
    }
    
    const [rows] = await pool.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get course by ID
app.get('/api/courses/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM courses WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

// Get colleges by course
app.get('/api/colleges/by-course/:courseId', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT c.* FROM colleges c 
       INNER JOIN college_courses cc ON c.id = cc.college_id 
       WHERE cc.course_id = ?`, 
      [req.params.courseId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching colleges by course:', error);
    res.status(500).json({ error: 'Failed to fetch colleges' });
  }
});

// Get college by ID with companies
app.get('/api/colleges/:id', async (req, res) => {
  try {
    const [collegeRows] = await pool.execute('SELECT * FROM colleges WHERE id = ?', [req.params.id]);
    
    if (collegeRows.length === 0) {
      return res.status(404).json({ error: 'College not found' });
    }
    
    const college = collegeRows[0];
    
    // Get companies that recruit from this college
    const [companyRows] = await pool.execute(
      `SELECT c.name FROM companies c 
       INNER JOIN company_colleges cc ON c.id = cc.company_id 
       WHERE cc.college_id = ?`, 
      [req.params.id]
    );
    
    college.companies = companyRows.map(company => company.name);
    
    res.json(college);
  } catch (error) {
    console.error('Error fetching college:', error);
    res.status(500).json({ error: 'Failed to fetch college' });
  }
});

// Get jobs with optional filters
app.get('/api/jobs', async (req, res) => {
  try {
    const { title, company, location, salaryMin } = req.query;
    
    let query = 'SELECT * FROM jobs WHERE 1=1';
    let params = [];
    
    if (title) {
      query += ' AND title LIKE ?';
      params.push(`%${title}%`);
    }
    
    if (company) {
      query += ' AND company LIKE ?';
      params.push(`%${company}%`);
    }
    
    if (location) {
      query += ' AND location LIKE ?';
      params.push(`%${location}%`);
    }
    
    if (salaryMin) {
      query += ' AND salary_range_min >= ?';
      params.push(salaryMin);
    }
    
    const [rows] = await pool.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Get job by ID
app.get('/api/jobs/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM jobs WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

// Admin endpoints
// Add course
app.post('/api/admin/courses', async (req, res) => {
  try {
    const { title, description, duration, eligibility, stream_id, imageUrl } = req.body;
    
    const [result] = await pool.execute(
      'INSERT INTO courses (title, description, duration, eligibility, stream_id, imageUrl) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, duration, eligibility, stream_id, imageUrl]
    );
    
    res.status(201).json({ id: result.insertId, message: 'Course added successfully' });
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ error: 'Failed to add course' });
  }
});

// Update course
app.put('/api/admin/courses/:id', async (req, res) => {
  try {
    const { title, description, duration, eligibility, stream_id, imageUrl } = req.body;
    
    const [result] = await pool.execute(
      'UPDATE courses SET title = ?, description = ?, duration = ?, eligibility = ?, stream_id = ?, imageUrl = ? WHERE id = ?',
      [title, description, duration, eligibility, stream_id, imageUrl, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    res.json({ message: 'Course updated successfully' });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Failed to update course' });
  }
});

// Delete course
app.delete('/api/admin/courses/:id', async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM courses WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

// College crud operations
app.post('/api/admin/colleges', async (req, res) => {
  try {
    const { name, location, rating, description, founded, website, imageUrl, courses } = req.body;
    
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    
    try {
      const [result] = await connection.execute(
        'INSERT INTO colleges (name, location, rating, description, founded, website, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, location, rating, description, founded, website, imageUrl]
      );
      
      const collegeId = result.insertId;
      
      // Add course associations
      if (courses && courses.length > 0) {
        const courseValues = courses.map(courseId => [collegeId, courseId]);
        await connection.query(
          'INSERT INTO college_courses (college_id, course_id) VALUES ?',
          [courseValues]
        );
      }
      
      await connection.commit();
      res.status(201).json({ id: collegeId, message: 'College added successfully' });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error adding college:', error);
    res.status(500).json({ error: 'Failed to add college' });
  }
});

// Update college
app.put('/api/admin/colleges/:id', async (req, res) => {
  try {
    const { name, location, rating, description, founded, website, imageUrl, courses } = req.body;
    const collegeId = req.params.id;
    
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    
    try {
      await connection.execute(
        'UPDATE colleges SET name = ?, location = ?, rating = ?, description = ?, founded = ?, website = ?, imageUrl = ? WHERE id = ?',
        [name, location, rating, description, founded, website, imageUrl, collegeId]
      );
      
      // Update course associations
      if (courses) {
        // Remove existing associations
        await connection.execute('DELETE FROM college_courses WHERE college_id = ?', [collegeId]);
        
        // Add new associations
        if (courses.length > 0) {
          const courseValues = courses.map(courseId => [collegeId, courseId]);
          await connection.query(
            'INSERT INTO college_courses (college_id, course_id) VALUES ?',
            [courseValues]
          );
        }
      }
      
      await connection.commit();
      res.json({ message: 'College updated successfully' });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error updating college:', error);
    res.status(500).json({ error: 'Failed to update college' });
  }
});

// Delete college
app.delete('/api/admin/colleges/:id', async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM colleges WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'College not found' });
    }
    
    res.json({ message: 'College deleted successfully' });
  } catch (error) {
    console.error('Error deleting college:', error);
    res.status(500).json({ error: 'Failed to delete college' });
  }
});

// Job crud operations
app.post('/api/admin/jobs', async (req, res) => {
  try {
    const { title, company, location, salary_range_min, salary_range_max, job_type, description, requirements, posted_date, company_logo } = req.body;
    
    const [result] = await pool.execute(
      'INSERT INTO jobs (title, company, location, salary_range_min, salary_range_max, job_type, description, requirements, posted_date, company_logo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, company, location, salary_range_min, salary_range_max, job_type, description, requirements, posted_date || new Date(), company_logo]
    );
    
    res.status(201).json({ id: result.insertId, message: 'Job added successfully' });
  } catch (error) {
    console.error('Error adding job:', error);
    res.status(500).json({ error: 'Failed to add job' });
  }
});

// Update job
app.put('/api/admin/jobs/:id', async (req, res) => {
  try {
    const { title, company, location, salary_range_min, salary_range_max, job_type, description, requirements, company_logo } = req.body;
    
    const [result] = await pool.execute(
      'UPDATE jobs SET title = ?, company = ?, location = ?, salary_range_min = ?, salary_range_max = ?, job_type = ?, description = ?, requirements = ?, company_logo = ? WHERE id = ?',
      [title, company, location, salary_range_min, salary_range_max, job_type, description, requirements, company_logo, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.json({ message: 'Job updated successfully' });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ error: 'Failed to update job' });
  }
});

// Delete job
app.delete('/api/admin/jobs/:id', async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM jobs WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

// User authentication
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // For demo purposes, we'll accept admin/admin123
    // In a real app, you should use proper password hashing
    if (username === 'admin' && password === 'admin123') {
      res.json({ 
        success: true, 
        user: { 
          id: 1, 
          username: 'admin', 
          role: 'admin' 
        } 
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
