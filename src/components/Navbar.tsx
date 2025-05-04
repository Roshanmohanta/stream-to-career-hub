
import React from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, Book } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Book className="h-6 w-6 text-portal-purple" />
            <span className="text-xl font-bold bg-gradient-to-r from-portal-blue to-portal-purple bg-clip-text text-transparent">
              CareerPathways
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-portal-dark hover:text-portal-blue transition-colors">
              Home
            </Link>
            <Link to="/courses" className="text-portal-dark hover:text-portal-blue transition-colors">
              Courses
            </Link>
            <Link to="/jobs" className="text-portal-dark hover:text-portal-blue transition-colors">
              Job Finder
            </Link>
            <Button asChild variant="outline" className="border-portal-blue text-portal-blue hover:bg-portal-blue hover:text-white">
              <Link to="/admin">
                <User className="mr-2 h-4 w-4" />
                Admin Login
              </Link>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mt-4 pb-4 space-y-4 md:hidden animate-fade-in">
            <Link 
              to="/" 
              className="block px-4 py-2 text-portal-dark hover:bg-portal-light rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className="block px-4 py-2 text-portal-dark hover:bg-portal-light rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Link 
              to="/jobs" 
              className="block px-4 py-2 text-portal-dark hover:bg-portal-light rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Job Finder
            </Link>
            <Link 
              to="/admin"
              className="block px-4 py-2 bg-portal-blue text-white rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
