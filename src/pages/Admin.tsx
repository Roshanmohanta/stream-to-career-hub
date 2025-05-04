
import React, { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Briefcase,
  Users,
  Settings,
  LogOut,
  ArrowUpRight,
  Info,
  Database,
  Plus,
  X,
  Check,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { executeTransaction } from "@/utils/database";
import { mockAPI } from "@/services/api";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showTransactionLog, setShowTransactionLog] = useState(false);

  // Mock data for admin dashboard
  const dashboardStats = {
    totalCourses: 7,
    totalColleges: 4,
    totalJobs: 4,
    totalUsers: 123,
    recentTransactions: [
      { id: 1, operation: "Course Update", status: "completed", timestamp: "2025-05-03 14:32:45", user: "admin" },
      { id: 2, operation: "Job Creation", status: "completed", timestamp: "2025-05-03 12:15:22", user: "admin" },
      { id: 3, operation: "College Update", status: "completed", timestamp: "2025-05-02 16:42:11", user: "admin" },
      { id: 4, operation: "User Preference Save", status: "failed", timestamp: "2025-05-01 09:11:05", user: "user123" },
      { id: 5, operation: "Course Creation", status: "completed", timestamp: "2025-04-30 11:32:18", user: "admin" },
    ],
  };
  
  const mockCourses = mockAPI.getCourses();
  const mockColleges = mockAPI.getColleges();
  const mockJobs = mockAPI.getJobs();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === "admin" && password === "admin123") {
      toast.success("Login successful", {
        description: "Welcome to the admin dashboard",
      });
      setIsLoggedIn(true);
    } else {
      toast.error("Login failed", {
        description: "Incorrect username or password",
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    toast.info("Logged out successfully");
  };

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const transactionSuccess = await executeTransaction([
        async () => {
          console.log("Starting course creation transaction");
          // In a real app, this would create a new course in the database
          return true;
        },
      ]);

      if (transactionSuccess) {
        toast.success("Course created successfully");
        // Reset form or update UI as needed
      }
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course", {
        description: "Please try again later",
      });
    }
  };

  const handleCollegeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const transactionSuccess = await executeTransaction([
        async () => {
          console.log("Starting college creation transaction");
          // In a real app, this would create a new college in the database
          return true;
        },
      ]);

      if (transactionSuccess) {
        toast.success("College created successfully");
        // Reset form or update UI as needed
      }
    } catch (error) {
      console.error("Error creating college:", error);
      toast.error("Failed to create college", {
        description: "Please try again later",
      });
    }
  };

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const transactionSuccess = await executeTransaction([
        async () => {
          console.log("Starting job creation transaction");
          // In a real app, this would create a new job in the database
          return true;
        },
      ]);

      if (transactionSuccess) {
        toast.success("Job created successfully");
        // Reset form or update UI as needed
      }
    } catch (error) {
      console.error("Error creating job:", error);
      toast.error("Failed to create job", {
        description: "Please try again later",
      });
    }
  };

  const simulateTransactionError = async () => {
    try {
      const transactionSuccess = await executeTransaction([
        async () => {
          console.log("Starting a transaction that will fail");
          throw new Error("Simulated transaction error");
        },
      ]);

      if (transactionSuccess) {
        // This won't execute due to the error
        toast.success("Transaction successful");
      }
    } catch (error) {
      console.error("Transaction error:", error);
    }
  };

  // Login Form
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-portal-light flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-portal-purple">Admin Portal</h1>
            <p className="text-gray-600 mt-2">Sign in to manage courses, colleges, and jobs</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Administrator Login</CardTitle>
              <CardDescription>
                Enter your credentials to access the admin dashboard
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-sm text-gray-500">
                  <Info className="h-4 w-4 inline mr-1" />
                  Default credentials: admin / admin123
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-portal-blue hover:bg-portal-purple">
                  Sign In
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <div className="mt-6 text-center">
            <Button variant="outline" asChild>
              <a href="/">
                Return to Home Page
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-portal-light flex">
      {/* Sidebar */}
      <div className="w-64 bg-portal-purple text-white min-h-screen flex flex-col">
        <div className="p-4 border-b border-white/10">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <p className="text-sm opacity-70">Career Pathways Portal</p>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-md ${
                  activeTab === "dashboard" ? "bg-white/20" : "hover:bg-white/10"
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-md ${
                  activeTab === "courses" ? "bg-white/20" : "hover:bg-white/10"
                }`}
                onClick={() => setActiveTab("courses")}
              >
                <BookOpen className="h-5 w-5" />
                <span>Courses</span>
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-md ${
                  activeTab === "colleges" ? "bg-white/20" : "hover:bg-white/10"
                }`}
                onClick={() => setActiveTab("colleges")}
              >
                <GraduationCap className="h-5 w-5" />
                <span>Colleges</span>
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-md ${
                  activeTab === "jobs" ? "bg-white/20" : "hover:bg-white/10"
                }`}
                onClick={() => setActiveTab("jobs")}
              >
                <Briefcase className="h-5 w-5" />
                <span>Jobs</span>
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-md ${
                  activeTab === "users" ? "bg-white/20" : "hover:bg-white/10"
                }`}
                onClick={() => setActiveTab("users")}
              >
                <Users className="h-5 w-5" />
                <span>Users</span>
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-md ${
                  activeTab === "database" ? "bg-white/20" : "hover:bg-white/10"
                }`}
                onClick={() => setActiveTab("database")}
              >
                <Database className="h-5 w-5" />
                <span>Database</span>
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-md ${
                  activeTab === "settings" ? "bg-white/20" : "hover:bg-white/10"
                }`}
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <button
            className="w-full flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 hover:bg-white/20"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white border-b p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold capitalize">
              {activeTab}
            </h2>
            <div className="flex items-center gap-4">
              <button 
                className="text-sm text-portal-blue hover:underline flex items-center"
                onClick={() => setShowTransactionLog(!showTransactionLog)}
              >
                {showTransactionLog ? "Hide" : "Show"} Transaction Log
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </button>
              <span className="font-medium">Admin User</span>
            </div>
          </div>
        </header>
        
        {showTransactionLog && (
          <div className="bg-gray-50 border-b p-4 animate-fade-in">
            <h3 className="font-medium mb-2 flex items-center">
              <Database className="h-4 w-4 mr-2" /> Transaction Log
            </h3>
            <div className="bg-white border rounded-md p-3 text-sm overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-2 py-1 text-left">ID</th>
                    <th className="px-2 py-1 text-left">Operation</th>
                    <th className="px-2 py-1 text-left">Status</th>
                    <th className="px-2 py-1 text-left">Timestamp</th>
                    <th className="px-2 py-1 text-left">User</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardStats.recentTransactions.map((tx) => (
                    <tr key={tx.id} className="border-b">
                      <td className="px-2 py-1">{tx.id}</td>
                      <td className="px-2 py-1">{tx.operation}</td>
                      <td className="px-2 py-1">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                          tx.status === "completed" ? "bg-green-100 text-green-800" :
                          tx.status === "failed" ? "bg-red-100 text-red-800" :
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-2 py-1">{tx.timestamp}</td>
                      <td className="px-2 py-1">{tx.user}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        <main className="p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Courses</CardDescription>
                    <CardTitle className="text-3xl">{dashboardStats.totalCourses}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-gray-500">
                      <BookOpen className="h-4 w-4 mr-1" />
                      Across {dashboardStats.totalColleges} colleges
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Colleges</CardDescription>
                    <CardTitle className="text-3xl">{dashboardStats.totalColleges}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-gray-500">
                      <GraduationCap className="h-4 w-4 mr-1" />
                      With detailed information
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Active Jobs</CardDescription>
                    <CardTitle className="text-3xl">{dashboardStats.totalJobs}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-gray-500">
                      <Briefcase className="h-4 w-4 mr-1" />
                      Currently listed
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Registered Users</CardDescription>
                    <CardTitle className="text-3xl">{dashboardStats.totalUsers}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      Active on platform
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>
                      Latest database operations and their status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardStats.recentTransactions.slice(0, 3).map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between pb-2 border-b">
                          <div>
                            <div className="font-medium">{tx.operation}</div>
                            <div className="text-sm text-gray-500">{tx.timestamp}</div>
                          </div>
                          <div>
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                              tx.status === "completed" ? "bg-green-100 text-green-800" :
                              tx.status === "failed" ? "bg-red-100 text-red-800" :
                              "bg-yellow-100 text-yellow-800"
                            }`}>
                              {tx.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full" onClick={() => setShowTransactionLog(true)}>
                      View All Transactions
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>System Health</CardTitle>
                    <CardDescription>
                      Database and server status information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Database Connection</span>
                          <span className="text-sm text-green-600">Connected</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Server Load</span>
                          <span className="text-sm">23%</span>
                        </div>
                        <Progress value={23} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Storage Usage</span>
                          <span className="text-sm">41%</span>
                        </div>
                        <Progress value={41} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Memory Usage</span>
                          <span className="text-sm">67%</span>
                        </div>
                        <Progress value={67} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      System Diagnostics
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
          
          {activeTab === "courses" && (
            <div>
              <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">Course Management</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-portal-blue hover:bg-portal-purple">
                      <Plus className="mr-2 h-4 w-4" /> Add New Course
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Course</DialogTitle>
                      <DialogDescription>
                        Fill in the details to create a new course.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCourseSubmit}>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="title">Course Title</Label>
                          <Input id="title" placeholder="B.Tech Computer Science" required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea id="description" placeholder="Enter course description" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="duration">Duration</Label>
                            <Input id="duration" placeholder="4 Years" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="stream">Stream</Label>
                            <Select defaultValue="science">
                              <SelectTrigger>
                                <SelectValue placeholder="Select stream" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="science">Science</SelectItem>
                                <SelectItem value="commerce">Commerce</SelectItem>
                                <SelectItem value="arts">Arts</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="eligibility">Eligibility</Label>
                          <Input id="eligibility" placeholder="10+2 with PCM, Min 60%" required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="image-url">Image URL</Label>
                          <Input id="image-url" placeholder="https://example.com/image.jpg" type="url" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="bg-portal-blue hover:bg-portal-purple">
                          Save Course
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Stream</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockCourses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell>{course.id}</TableCell>
                          <TableCell className="font-medium">{course.title}</TableCell>
                          <TableCell className="capitalize">{course.stream}</TableCell>
                          <TableCell>{course.duration}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
          
          {activeTab === "colleges" && (
            <div>
              <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">College Management</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-portal-blue hover:bg-portal-purple">
                      <Plus className="mr-2 h-4 w-4" /> Add New College
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New College</DialogTitle>
                      <DialogDescription>
                        Fill in the details to create a new college.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCollegeSubmit}>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">College Name</Label>
                          <Input id="name" placeholder="Indian Institute of Technology, Delhi" required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea id="description" placeholder="Enter college description" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" placeholder="New Delhi" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="avg-salary">Average Salary</Label>
                            <Input id="avg-salary" placeholder="₹16-25 LPA" required />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="fees">Fees</Label>
                            <Input id="fees" placeholder="₹2.2 Lakhs per year" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="deadline">Application Deadline</Label>
                            <Input id="deadline" placeholder="May 30, 2025" required />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="process">Application Process</Label>
                          <Textarea id="process" placeholder="JEE Advanced followed by counseling" required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="image-url">Image URL</Label>
                          <Input id="image-url" placeholder="https://example.com/image.jpg" type="url" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="website-url">Website URL</Label>
                          <Input id="website-url" placeholder="https://example.com" type="url" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="bg-portal-blue hover:bg-portal-purple">
                          Save College
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Average Salary</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockColleges.map((college) => (
                        <TableRow key={college.id}>
                          <TableCell>{college.id}</TableCell>
                          <TableCell className="font-medium">{college.name}</TableCell>
                          <TableCell>{college.location}</TableCell>
                          <TableCell>{college.avgSalary}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
          
          {activeTab === "jobs" && (
            <div>
              <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">Job Management</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-portal-blue hover:bg-portal-purple">
                      <Plus className="mr-2 h-4 w-4" /> Add New Job
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Job</DialogTitle>
                      <DialogDescription>
                        Fill in the details to create a new job listing.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleJobSubmit}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="title">Job Title</Label>
                            <Input id="title" placeholder="Software Engineer" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="company">Company</Label>
                            <Input id="company" placeholder="TechSolutions Inc." required />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" placeholder="Bangalore" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="job-type">Job Type</Label>
                            <Select defaultValue="full-time">
                              <SelectTrigger>
                                <SelectValue placeholder="Select job type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="full-time">Full-time</SelectItem>
                                <SelectItem value="part-time">Part-time</SelectItem>
                                <SelectItem value="contract">Contract</SelectItem>
                                <SelectItem value="internship">Internship</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="salary">Salary Range</Label>
                            <Input id="salary" placeholder="₹12-18 LPA" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="experience">Experience</Label>
                            <Input id="experience" placeholder="2-4 years" required />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="description">Job Description</Label>
                          <Textarea id="description" placeholder="Enter job description" required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="requirements">Requirements (one per line)</Label>
                          <Textarea id="requirements" placeholder="Bachelor's degree in Computer Science or related field&#10;2+ years of experience in software development&#10;Proficiency in JavaScript, TypeScript, and React" required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="responsibilities">Responsibilities (one per line)</Label>
                          <Textarea id="responsibilities" placeholder="Design and develop high-quality code for various projects&#10;Collaborate with cross-functional teams&#10;Debug production issues and implement fixes" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="deadline">Application Deadline</Label>
                            <Input id="deadline" type="date" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="industry">Industry</Label>
                            <Select defaultValue="technology">
                              <SelectTrigger>
                                <SelectValue placeholder="Select industry" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="technology">Technology</SelectItem>
                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                <SelectItem value="finance">Finance</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="marketing">Marketing</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="application-url">Application URL</Label>
                          <Input id="application-url" placeholder="https://example.com/apply" type="url" required />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" className="bg-portal-blue hover:bg-portal-purple">
                          Save Job
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockJobs.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell>{job.id}</TableCell>
                          <TableCell className="font-medium">{job.title}</TableCell>
                          <TableCell>{job.company}</TableCell>
                          <TableCell>{job.location}</TableCell>
                          <TableCell>{job.deadline}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
          
          {activeTab === "database" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Database Management</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Database Connection</CardTitle>
                    <CardDescription>
                      MySQL database connection status and configuration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Connection Status:</span>
                        <span className="flex items-center text-green-600">
                          <Check className="h-4 w-4 mr-1" /> Connected
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Host:</span>
                        <span className="text-gray-600">localhost</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Database:</span>
                        <span className="text-gray-600">careerrecommendationdb</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>User:</span>
                        <span className="text-gray-600">root</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Refresh</Button>
                    <Button variant="outline">Modify</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction Management</CardTitle>
                    <CardDescription>
                      Test and monitor database transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-sm text-gray-500 mb-4">
                        These tools help test transaction management, recovery mechanisms, and concurrency control.
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Recovery Mechanism Status
                        </label>
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center text-green-600">
                            <Check className="h-4 w-4 mr-1" /> Active
                          </span>
                          <Button variant="outline" size="sm">
                            Test Recovery
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={simulateTransactionError}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Test Error Handling
                    </Button>
                    <Button className="flex-1 bg-portal-blue hover:bg-portal-purple">
                      View Logs
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Database Tables</CardTitle>
                  <CardDescription>
                    Schema information and record counts
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Table Name</TableHead>
                        <TableHead>Records</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">streams</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>2025-05-04 09:15:22</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              Manage
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">courses</TableCell>
                        <TableCell>7</TableCell>
                        <TableCell>2025-05-03 16:42:11</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              Manage
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">colleges</TableCell>
                        <TableCell>4</TableCell>
                        <TableCell>2025-05-03 14:32:45</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              Manage
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">jobs</TableCell>
                        <TableCell>4</TableCell>
                        <TableCell>2025-05-02 09:11:05</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              Manage
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">transaction_logs</TableCell>
                        <TableCell>42</TableCell>
                        <TableCell>2025-05-04 11:22:15</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              Clear
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
          
          {activeTab === "users" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">User Management</h2>
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell className="font-medium">admin</TableCell>
                        <TableCell>admin@careerpathways.edu</TableCell>
                        <TableCell><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Admin</span></TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" disabled>
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell className="font-medium">user123</TableCell>
                        <TableCell>user123@example.com</TableCell>
                        <TableCell><span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">User</span></TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-end pt-4">
                  <Button>Add New User</Button>
                </CardFooter>
              </Card>
            </div>
          )}
          
          {activeTab === "settings" && (
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold mb-6">System Settings</h2>
              <Tabs defaultValue="general">
                <TabsList className="mb-6">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="backup">Backup & Recovery</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>General Settings</CardTitle>
                      <CardDescription>
                        Configure general system settings and preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="site-name">Site Name</Label>
                        <Input id="site-name" defaultValue="Career Pathways Portal" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="site-description">Site Description</Label>
                        <Textarea
                          id="site-description"
                          defaultValue="Guide students through academic and career decisions with personalized recommendations."
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="contact-email">Contact Email</Label>
                        <Input id="contact-email" type="email" defaultValue="contact@careerpathways.edu" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="bg-portal-blue hover:bg-portal-purple">
                        Save Changes
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="security" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>
                        Update account credentials and security options
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="bg-portal-blue hover:bg-portal-purple">
                        Update Password
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="backup" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Backup & Recovery</CardTitle>
                      <CardDescription>
                        Manage database backups and recovery options
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Automated Backups</h3>
                        <div className="flex items-center gap-4">
                          <span className="text-green-600 flex items-center">
                            <Check className="h-4 w-4 mr-1" />
                            Enabled (Daily at 2:00 AM)
                          </span>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Recent Backups</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center justify-between border-b pb-2">
                            <div>
                              <div className="font-medium">Daily Backup</div>
                              <div className="text-sm text-gray-500">2025-05-04 02:00:15</div>
                            </div>
                            <Button variant="outline" size="sm">
                              Restore
                            </Button>
                          </li>
                          <li className="flex items-center justify-between border-b pb-2">
                            <div>
                              <div className="font-medium">Daily Backup</div>
                              <div className="text-sm text-gray-500">2025-05-03 02:00:12</div>
                            </div>
                            <Button variant="outline" size="sm">
                              Restore
                            </Button>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="bg-portal-blue hover:bg-portal-purple">
                        Create Manual Backup
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
