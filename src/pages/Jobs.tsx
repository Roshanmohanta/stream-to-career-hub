import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/SearchFilters";
import JobCard, { JobProps } from "@/components/JobCard";
import { Briefcase } from "lucide-react";
import { mockAPI } from "@/services/api";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { executeTransaction } from "@/utils/database";

const Jobs = () => {
  const [jobs, setJobs] = useState<JobProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        // Use the mockAPI.getJobs method to get job data
        const jobsData = mockAPI.getJobs();
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("Failed to load job listings", {
          description: "Please try again later",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = async (filters: Record<string, any>) => {
    setLoading(true);
    try {
      // Simulate a transaction for fetching filtered jobs
      const transactionSuccess = await executeTransaction([
        async () => {
          console.log("Starting job search transaction with filters:", filters);
          // In a real app, this would be a database query
          return true;
        },
      ]);

      if (transactionSuccess) {
        // In a real app, we'd use the real API with filters
        const filteredJobs = mockAPI.getJobs(filters);
        setJobs(filteredJobs);
        
        if (filteredJobs.length === 0) {
          toast.info("No jobs found", {
            description: "Try adjusting your search filters",
          });
        } else {
          toast.success(`Found ${filteredJobs.length} jobs`, {
            description: "Results updated based on your filters",
          });
        }
      }
    } catch (error) {
      console.error("Error searching jobs:", error);
      toast.error("Error searching jobs", {
        description: "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveJobPreference = async (preference: Record<string, any>) => {
    try {
      // Simulate a transaction for saving job preference
      const transactionSuccess = await executeTransaction([
        async () => {
          console.log("Starting save job preference transaction:", preference);
          // In a real app, this would save to the database
          return true;
        },
      ]);

      if (transactionSuccess) {
        toast.success("Job preference saved", {
          description: "You'll receive notifications for matching jobs",
        });
      }
    } catch (error) {
      console.error("Error saving preference:", error);
      toast.error("Failed to save preference", {
        description: "Please try again later",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-portal-light">
        <div className="bg-gradient-to-r from-portal-blue to-portal-purple text-white py-12">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Find Your Dream Job</h1>
              <p className="text-lg opacity-90 mb-6">
                Discover opportunities that match your skills, experience, and career goals
              </p>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-portal-purple"
                  onClick={() => saveJobPreference({ notify: true })}
                >
                  Get Job Alerts
                </Button>
                <Button 
                  className="bg-white text-portal-purple hover:bg-portal-pink hover:text-white"
                  onClick={() => window.scrollTo({ top: document.getElementById('job-search')?.offsetTop || 0, behavior: 'smooth' })}
                >
                  Browse Jobs Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div id="job-search" className="container-custom py-8">
          <h2 className="text-2xl font-bold mb-6">Job Search</h2>
          
          <SearchFilters onSearch={handleSearch} />
          
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-pulse flex flex-col items-center">
                <div className="rounded-full bg-slate-200 h-12 w-12 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-32 mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-56"></div>
              </div>
            </div>
          ) : jobs.length > 0 ? (
            <div className="space-y-6">
              {jobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                We couldn't find any jobs matching your search criteria. Try broadening your search parameters or check back later for new listings.
              </p>
              <Button 
                className="bg-portal-blue hover:bg-portal-purple"
                onClick={() => handleSearch({})}
              >
                Clear All Filters
              </Button>
            </div>
          )}
          
          {/* Additional Information */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Resume Tips</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-portal-blue/10 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">1</span>
                  Tailor your resume to each job application
                </li>
                <li className="flex items-start">
                  <span className="bg-portal-blue/10 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">2</span>
                  Highlight achievements rather than just responsibilities
                </li>
                <li className="flex items-start">
                  <span className="bg-portal-blue/10 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">3</span>
                  Include relevant keywords from the job description
                </li>
                <li className="flex items-start">
                  <span className="bg-portal-blue/10 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">4</span>
                  Keep it concise and well-organized
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Interview Preparation</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-portal-purple/10 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">1</span>
                  Research the company thoroughly
                </li>
                <li className="flex items-start">
                  <span className="bg-portal-purple/10 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">2</span>
                  Practice common interview questions
                </li>
                <li className="flex items-start">
                  <span className="bg-portal-purple/10 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">3</span>
                  Prepare questions to ask the interviewer
                </li>
                <li className="flex items-start">
                  <span className="bg-portal-purple/10 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">4</span>
                  Follow up with a thank-you email
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Career Development</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-portal-pink/10 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">1</span>
                  Build a professional network
                </li>
                <li className="flex items-start">
                  <span className="bg-portal-pink/10 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">2</span>
                  Continuously update your skills
                </li>
                <li className="flex items-start">
                  <span className="bg-portal-pink/10 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">3</span>
                  Seek mentorship in your field
                </li>
                <li className="flex items-start">
                  <span className="bg-portal-pink/10 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">4</span>
                  Set clear career goals and milestones
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Jobs;
