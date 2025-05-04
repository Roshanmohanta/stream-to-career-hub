
import React from 'react';
import { 
  Building, 
  MapPin, 
  Briefcase, 
  Clock, 
  DollarSign, 
  Bookmark,
  ExternalLink
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface JobProps {
  id: number;
  title: string;
  company: string;
  location: string;
  jobType: string; // Full-time, Part-time, Contract, etc.
  salary: string;
  experience: string;
  postedDate: string;
  deadline: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  companyLogoUrl: string;
  applicationUrl: string;
}

const JobCard = ({
  id,
  title,
  company,
  location,
  jobType,
  salary,
  experience,
  postedDate,
  deadline,
  description,
  requirements,
  responsibilities,
  companyLogoUrl,
  applicationUrl,
}: JobProps) => {
  const [expanded, setExpanded] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  // Calculate days remaining until deadline
  const deadlineDate = new Date(deadline);
  const currentDate = new Date();
  const daysRemaining = Math.ceil((deadlineDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

  const handleSaveJob = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(!saved);
  };

  return (
    <Card className={`card-hover ${expanded ? '' : 'cursor-pointer'}`} 
          onClick={() => !expanded && setExpanded(true)}>
      <CardHeader className="flex flex-row items-start space-y-0 gap-4 pb-2">
        <div className="w-12 h-12 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
          {companyLogoUrl ? (
            <img src={companyLogoUrl} alt={company} className="w-full h-full object-contain" />
          ) : (
            <Building className="h-6 w-6 text-gray-400" />
          )}
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Building className="h-4 w-4 mr-1" />
            {company}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={saved ? 'text-portal-pink' : 'text-gray-400'}
          onClick={handleSaveJob}
        >
          <Bookmark className="h-5 w-5" />
        </Button>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {location}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Briefcase className="h-3 w-3" /> {jobType}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {experience}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 font-medium">
            <DollarSign className="h-3 w-3" /> {salary}
          </Badge>
        </div>
        
        <div className="text-sm text-gray-600 mb-4">
          <p className={expanded ? '' : 'line-clamp-2'}>{description}</p>
          {!expanded && description.length > 150 && (
            <Button variant="link" className="p-0 h-auto text-portal-blue" onClick={() => setExpanded(true)}>
              Read more
            </Button>
          )}
        </div>
        
        {expanded && (
          <div className="space-y-3 mt-3 animate-fade-in">
            <div>
              <h4 className="text-sm font-medium mb-1">Requirements:</h4>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Responsibilities:</h4>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center pt-2">
        <div className="text-sm">
          {daysRemaining > 0 ? (
            <span className={`${daysRemaining <= 3 ? 'text-red-500' : 'text-gray-500'}`}>
              {daysRemaining} days remaining
            </span>
          ) : (
            <span className="text-red-500">Deadline passed</span>
          )}
        </div>
        
        <div className="flex gap-2">
          {expanded && (
            <Button variant="outline" onClick={() => setExpanded(false)}>
              Show Less
            </Button>
          )}
          <Button asChild className="bg-portal-blue hover:bg-portal-purple">
            <a href={applicationUrl} target="_blank" rel="noopener noreferrer">
              Apply Now
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
