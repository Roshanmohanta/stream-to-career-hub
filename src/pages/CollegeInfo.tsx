import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { 
  Building, 
  GraduationCap,
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  ChevronLeft,
  ExternalLink,
  Calendar,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CollegeCard, { CollegeProps } from "@/components/CollegeCard";
import { mockAPI } from "@/services/api";

const CollegeInfo = () => {
  const [searchParams] = useSearchParams();
  const courseId = Number(searchParams.get("courseId")) || 0;
  
  const [colleges, setColleges] = useState<CollegeProps[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<CollegeProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        // In a real app, we'd fetch from the backend
        const courseData = mockAPI.getCourses().find(course => course.id === courseId);
        setCourseName(courseData?.title || "");
        
        const allColleges = mockAPI.getColleges(courseId);
        setColleges(allColleges);
        setFilteredColleges(allColleges);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };

    if (courseId) {
      fetchColleges();
    }
  }, [courseId]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredColleges(colleges);
    } else {
      const filtered = colleges.filter(
        (college) =>
          college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          college.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          college.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredColleges(filtered);
    }
  }, [searchQuery, colleges]);

  const handleSort = (value: string) => {
    setSortBy(value);
    let sorted = [...filteredColleges];
    
    switch (value) {
      case "fees-low":
        sorted.sort((a, b) => {
          // Extract numeric values from fees strings (assuming format like "₹X Lakhs")
          const aFees = parseFloat(a.fees.replace(/[^0-9.]/g, ""));
          const bFees = parseFloat(b.fees.replace(/[^0-9.]/g, ""));
          return aFees - bFees;
        });
        break;
      case "fees-high":
        sorted.sort((a, b) => {
          const aFees = parseFloat(a.fees.replace(/[^0-9.]/g, ""));
          const bFees = parseFloat(b.fees.replace(/[^0-9.]/g, ""));
          return bFees - aFees;
        });
        break;
      case "salary-high":
        sorted.sort((a, b) => {
          // Extract the higher value from salary range (assuming format like "₹X-Y LPA")
          const aMatch = a.avgSalary.match(/\d+/g);
          const bMatch = b.avgSalary.match(/\d+/g);
          const aHighSalary = aMatch ? Math.max(...aMatch.map(Number)) : 0;
          const bHighSalary = bMatch ? Math.max(...bMatch.map(Number)) : 0;
          return bHighSalary - aHighSalary;
        });
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order
        sorted = [...colleges];
    }
    
    setFilteredColleges(sorted);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-portal-light">
        <div className="bg-gradient-to-r from-portal-blue to-portal-purple text-white py-12">
          <div className="container-custom">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 mb-4"
              asChild
            >
              <Link to="/courses">
                <ChevronLeft className="h-4 w-4 mr-1" /> Back to Courses
              </Link>
            </Button>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <div className="flex items-center">
                  <GraduationCap className="h-6 w-6 mr-2" />
                  <h1 className="text-3xl md:text-4xl font-bold">{courseName}</h1>
                </div>
                <p className="text-lg opacity-90 mt-2">
                  Explore colleges offering this program and their key details
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                <div className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  <span className="font-medium">{filteredColleges.length} Colleges Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-custom py-8">
          {/* Search and Sort */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                className="pl-10"
                placeholder="Search by college name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={sortBy} onValueChange={handleSort}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="fees-low">Fees (Low to High)</SelectItem>
                <SelectItem value="fees-high">Fees (High to Low)</SelectItem>
                <SelectItem value="salary-high">Highest Avg. Salary</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* College Comparison */}
          {filteredColleges.length > 1 && (
            <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
              <h2 className="text-xl font-bold mb-4">College Comparison</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">College</th>
                      <th className="text-left py-3 px-4">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" /> Avg. Salary
                        </div>
                      </th>
                      <th className="text-left py-3 px-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" /> Fees
                        </div>
                      </th>
                      <th className="text-left py-3 px-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" /> Location
                        </div>
                      </th>
                      <th className="text-left py-3 px-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" /> Application Deadline
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredColleges.slice(0, 3).map((college) => (
                      <tr key={college.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{college.name}</td>
                        <td className="py-3 px-4">{college.avgSalary}</td>
                        <td className="py-3 px-4">{college.fees}</td>
                        <td className="py-3 px-4">{college.location}</td>
                        <td className="py-3 px-4">{college.applicationDeadline}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* College List */}
          {filteredColleges.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {filteredColleges.map((college) => (
                <CollegeCard key={college.id} {...college} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Building className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No colleges found</h3>
              <p className="text-gray-500">
                No colleges match your current search criteria. Try adjusting your search.
              </p>
              <Button 
                className="mt-4 bg-portal-blue hover:bg-portal-purple"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            </div>
          )}
          
          {/* Additional Information */}
          <div className="mt-12 bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Application Process Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <Calendar className="h-5 w-5 text-portal-blue mr-2" />
                  Important Dates
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="bg-portal-blue/10 w-3 h-3 rounded-full mr-2"></span>
                    Application forms usually available: December-January
                  </li>
                  <li className="flex items-center">
                    <span className="bg-portal-blue/10 w-3 h-3 rounded-full mr-2"></span>
                    Last date for submission: March-April
                  </li>
                  <li className="flex items-center">
                    <span className="bg-portal-blue/10 w-3 h-3 rounded-full mr-2"></span>
                    Entrance exams: April-May
                  </li>
                  <li className="flex items-center">
                    <span className="bg-portal-blue/10 w-3 h-3 rounded-full mr-2"></span>
                    Results and counseling: June-July
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <Briefcase className="h-5 w-5 text-portal-purple mr-2" />
                  Documents Required
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="bg-portal-purple/10 w-3 h-3 rounded-full mr-2"></span>
                    10th and 12th mark sheets and certificates
                  </li>
                  <li className="flex items-center">
                    <span className="bg-portal-purple/10 w-3 h-3 rounded-full mr-2"></span>
                    Transfer certificate and migration certificate
                  </li>
                  <li className="flex items-center">
                    <span className="bg-portal-purple/10 w-3 h-3 rounded-full mr-2"></span>
                    Character certificate from previous institution
                  </li>
                  <li className="flex items-center">
                    <span className="bg-portal-purple/10 w-3 h-3 rounded-full mr-2"></span>
                    Passport size photographs and ID proof
                  </li>
                </ul>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-3">Need Assistance?</h3>
              <p className="text-gray-600 mb-4">Our counselors can help you choose the right college for your career goals</p>
              <Button className="bg-portal-purple hover:bg-portal-blue">
                Request Counseling Session
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CollegeInfo;
