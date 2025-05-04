
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Book, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard, { CourseProps } from "@/components/CourseCard";
import { mockAPI } from "@/services/api";

const Courses = () => {
  const [searchParams] = useSearchParams();
  const initialStream = searchParams.get("stream") || "all";
  const [activeTab, setActiveTab] = useState(initialStream);
  const [courses, setCourses] = useState<CourseProps[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // In a real app, we'd fetch from the backend
        const allCourses = mockAPI.getCourses();
        setCourses(allCourses);
        
        if (activeTab !== "all") {
          setFilteredCourses(allCourses.filter((course) => course.stream === activeTab));
        } else {
          setFilteredCourses(allCourses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [activeTab]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      // If search is empty, show courses based on active tab
      if (activeTab !== "all") {
        setFilteredCourses(courses.filter((course) => course.stream === activeTab));
      } else {
        setFilteredCourses(courses);
      }
    } else {
      // Filter by search query and active tab
      const filtered = courses.filter((course) => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             course.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (activeTab !== "all") {
          return matchesSearch && course.stream === activeTab;
        }
        return matchesSearch;
      });
      
      setFilteredCourses(filtered);
    }
  }, [searchQuery, activeTab, courses]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-portal-light">
        <div className="bg-gradient-to-r from-portal-blue to-portal-purple text-white py-12">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Explore Courses</h1>
                <p className="text-lg opacity-90">
                  Discover courses aligned with your academic interests and career goals
                </p>
              </div>
              <div className="mt-6 md:mt-0 flex items-center bg-white/10 rounded-lg p-1 backdrop-blur-sm">
                <Book className="ml-2 h-5 w-5" />
                <p className="text-sm md:text-base font-medium px-3 py-1">
                  {filteredCourses.length} Courses Available
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container-custom py-8">
          {/* Search and Filter */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                className="pl-10"
                placeholder="Search for courses by name or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="md:w-auto flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Advanced Filters
            </Button>
          </div>
          
          {/* Stream Tabs */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-4 mb-4">
              <TabsTrigger value="all" className="rounded-l-md">All</TabsTrigger>
              <TabsTrigger value="science">Science</TabsTrigger>
              <TabsTrigger value="commerce">Commerce</TabsTrigger>
              <TabsTrigger value="arts" className="rounded-r-md">Arts</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              <div className="mt-2">
                <h2 className="text-2xl font-bold mb-2 capitalize">
                  {activeTab === "all" ? "All Courses" : `${activeTab} Courses`}
                </h2>
                <p className="text-gray-600 mb-4">
                  {activeTab === "all" 
                    ? "Browse all available courses across different academic streams" 
                    : activeTab === "science" 
                      ? "Explore technical and scientific courses in engineering, medicine, and natural sciences"
                      : activeTab === "commerce"
                        ? "Discover courses in business, economics, accounting, and management"
                        : "Browse courses in literature, arts, psychology, sociology, and humanities"
                  }
                </p>
                <Separator className="my-4" />
              </div>
              
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Book className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                  <p className="text-gray-500">
                    No courses match your current search criteria. Try adjusting your filters.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
