
import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, Briefcase, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StreamSelection from "@/components/StreamSelection";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-portal-blue to-portal-purple text-white py-20">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                  Discover Your Perfect <span className="text-portal-pink">Academic</span> & <span className="text-portal-pink">Career</span> Path
                </h1>
                <p className="text-lg md:text-xl opacity-90 mb-8">
                  Explore courses tailored to your academic stream, find your ideal college, 
                  and connect with job opportunities aligned with your goals.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-portal-purple hover:bg-portal-pink hover:text-white"
                  >
                    <a href="#stream-section">
                      Explore Streams
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-portal-purple"
                  >
                    <Link to="/jobs">
                      Browse Jobs
                      <Briefcase className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop" 
                  alt="Students planning their career" 
                  className="rounded-lg shadow-xl max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">How We Help You Succeed</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-portal-light p-6 rounded-xl text-center">
                <div className="bg-portal-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-portal-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Stream-Based Courses</h3>
                <p className="text-gray-600">
                  Find courses perfectly aligned with your chosen academic stream.
                </p>
              </div>
              
              <div className="bg-portal-light p-6 rounded-xl text-center">
                <div className="bg-portal-purple/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-portal-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3">College Insights</h3>
                <p className="text-gray-600">
                  Access detailed information on colleges offering your preferred courses.
                </p>
              </div>
              
              <div className="bg-portal-light p-6 rounded-xl text-center">
                <div className="bg-portal-pink/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-portal-pink" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Job Recommendations</h3>
                <p className="text-gray-600">
                  Discover career opportunities perfectly suited to your skills and interests.
                </p>
              </div>
              
              <div className="bg-portal-light p-6 rounded-xl text-center">
                <div className="bg-portal-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-portal-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Expert Guidance</h3>
                <p className="text-gray-600">
                  Benefit from curated recommendations based on industry expertise.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stream Selection Section */}
        <section id="stream-section" className="bg-portal-light py-16">
          <div className="container-custom">
            <StreamSelection />
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">Student Success Stories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white border rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-portal-blue/20 rounded-full flex items-center justify-center text-portal-blue font-bold text-lg">
                    RP
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Rahul Patel</h4>
                    <p className="text-sm text-gray-500">B.Tech, Computer Science</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The stream-based course recommendations helped me find my ideal engineering program. 
                  Now I'm working at a top tech company thanks to the career guidance I received."
                </p>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-white border rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-portal-purple/20 rounded-full flex items-center justify-center text-portal-purple font-bold text-lg">
                    AS
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Ananya Sharma</h4>
                    <p className="text-sm text-gray-500">B.Com, Finance</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The college comparison tools made it easy to find a program that fit my budget 
                  and career goals. The job matching feature connected me with my dream finance position."
                </p>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-white border rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-portal-pink/20 rounded-full flex items-center justify-center text-portal-pink font-bold text-lg">
                    MK
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Mohammed Khan</h4>
                    <p className="text-sm text-gray-500">BA, Psychology</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "As an arts student, I wasn't sure about my career options. This platform 
                  showed me specialized courses and connected me with organizations in my field."
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button asChild className="bg-portal-blue hover:bg-portal-purple">
                <Link to="/courses">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
