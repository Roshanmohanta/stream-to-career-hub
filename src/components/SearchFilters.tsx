
import React from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Filter,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export interface FiltersProps {
  onSearch: (filters: any) => void;
}

const SearchFilters = ({ onSearch }: FiltersProps) => {
  const [keyword, setKeyword] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [jobType, setJobType] = React.useState('');
  const [salaryRange, setSalaryRange] = React.useState('');
  const [experience, setExperience] = React.useState('');
  const [industry, setIndustry] = React.useState('');
  
  const handleSearch = () => {
    onSearch({
      keyword,
      location,
      jobType,
      salaryRange,
      experience,
      industry
    });
  };
  
  const clearFilters = () => {
    setKeyword('');
    setLocation('');
    setJobType('');
    setSalaryRange('');
    setExperience('');
    setIndustry('');
  };

  const filters = [
    { name: 'Location', value: location },
    { name: 'Job Type', value: jobType },
    { name: 'Salary', value: salaryRange },
    { name: 'Experience', value: experience },
    { name: 'Industry', value: industry },
  ].filter(filter => filter.value);

  const FiltersContent = () => (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">Location</label>
        <div className="flex gap-2 items-center">
          <MapPin className="h-4 w-4 text-gray-500" />
          <Input 
            placeholder="City, State or Remote" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block">Job Type</label>
        <Select value={jobType} onValueChange={setJobType}>
          <SelectTrigger>
            <div className="flex gap-2 items-center">
              <Briefcase className="h-4 w-4 text-gray-500" />
              <SelectValue placeholder="Select job type" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="part-time">Part-time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="internship">Internship</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block">Salary Range</label>
        <Select value={salaryRange} onValueChange={setSalaryRange}>
          <SelectTrigger>
            <div className="flex gap-2 items-center">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <SelectValue placeholder="Select salary range" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-300000">₹0 - ₹3,00,000</SelectItem>
            <SelectItem value="300000-600000">₹3,00,000 - ₹6,00,000</SelectItem>
            <SelectItem value="600000-1000000">₹6,00,000 - ₹10,00,000</SelectItem>
            <SelectItem value="1000000+">₹10,00,000+</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block">Experience Level</label>
        <Select value={experience} onValueChange={setExperience}>
          <SelectTrigger>
            <SelectValue placeholder="Select experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
            <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
            <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block">Industry</label>
        <Select value={industry} onValueChange={setIndustry}>
          <SelectTrigger>
            <SelectValue placeholder="Select industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex gap-3 pt-4">
        <Button 
          variant="outline" 
          className="flex-1" 
          onClick={clearFilters}
        >
          Clear
        </Button>
        <Button 
          className="flex-1 bg-portal-blue hover:bg-portal-purple" 
          onClick={handleSearch}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );

  return (
    <div className="mb-6">
      <div className="bg-white rounded-lg shadow-sm p-4 border">
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">Search Keywords</label>
            <div className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 text-sm">
              <Search className="h-4 w-4 mr-2 text-gray-500" />
              <input
                className="flex-1 bg-transparent outline-none"
                placeholder="Job title, keywords, or company"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>
          
          {/* Desktop Filters */}
          <div className="hidden md:flex gap-3 flex-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full flex justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </div>
                  {filters.length > 0 && (
                    <span className="bg-portal-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {filters.length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <FiltersContent />
              </PopoverContent>
            </Popover>

            <Button
              className="bg-portal-blue hover:bg-portal-purple"
              onClick={handleSearch}
            >
              Search Jobs
            </Button>
          </div>
          
          {/* Mobile Filters */}
          <div className="flex gap-3 md:hidden w-full">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex-1 flex justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </div>
                  {filters.length > 0 && (
                    <span className="bg-portal-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {filters.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Search Filters</SheetTitle>
                  <SheetDescription>
                    Narrow down job results to find your perfect match
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4">
                  <FiltersContent />
                </div>
              </SheetContent>
            </Sheet>

            <Button
              className="flex-1 bg-portal-blue hover:bg-portal-purple"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>
        
        {/* Active filters */}
        {filters.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.map((filter, index) => (
              <div 
                key={index} 
                className="bg-gray-100 text-sm rounded-full px-3 py-1 flex items-center"
              >
                <span>{filter.name}: {filter.value}</span>
                <button 
                  className="ml-1 text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    switch(filter.name) {
                      case 'Location':
                        setLocation('');
                        break;
                      case 'Job Type':
                        setJobType('');
                        break;
                      case 'Salary':
                        setSalaryRange('');
                        break;
                      case 'Experience':
                        setExperience('');
                        break;
                      case 'Industry':
                        setIndustry('');
                        break;
                    }
                  }}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            
            <button 
              className="text-sm text-portal-blue hover:text-portal-purple flex items-center"
              onClick={clearFilters}
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
