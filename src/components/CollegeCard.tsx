
import React from 'react';
import { 
  Building, 
  GraduationCap,
  CreditCard,
  Briefcase,
  Calendar,
  ExternalLink
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface CollegeProps {
  id: number;
  name: string;
  description: string;
  location: string;
  avgSalary: string;
  fees: string;
  companies: string[];
  applicationDeadline: string;
  applicationProcess: string;
  imageUrl: string;
  websiteUrl: string;
}

const CollegeCard = ({
  id,
  name,
  description,
  location,
  avgSalary,
  fees,
  companies,
  applicationDeadline,
  applicationProcess,
  imageUrl,
  websiteUrl,
}: CollegeProps) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card className="card-hover overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-portal-blue text-white">
            Avg. Salary: {avgSalary}
          </Badge>
        </div>
      </div>

      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{name}</CardTitle>
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <Building className="h-4 w-4 mr-1" />
          {location}
        </div>
        <CardDescription className={expanded ? '' : 'line-clamp-2'}>
          {description}
        </CardDescription>
        {description.length > 100 && (
          <Button
            variant="link"
            className="p-0 h-auto text-portal-blue"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show less' : 'Show more'}
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-gray-500" />
            <span className="text-sm">Fees: {fees}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm">Deadline: {applicationDeadline}</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center">
            <Briefcase className="h-4 w-4 text-gray-500 mr-2" /> 
            Recruiting Companies
          </h4>
          <div className="flex flex-wrap gap-1">
            {companies.slice(0, 3).map((company, index) => (
              <Badge key={index} variant="outline" className="bg-gray-100">
                {company}
              </Badge>
            ))}
            {companies.length > 3 && (
              <Badge variant="outline" className="bg-gray-100">
                +{companies.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <GraduationCap className="mr-2 h-4 w-4" />
          Application Process
        </Button>
        <Button asChild className="bg-portal-purple hover:bg-portal-blue">
          <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
            Visit Website
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CollegeCard;
