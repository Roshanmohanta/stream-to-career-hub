
import React from "react";
import { Link } from "react-router-dom";
import { 
  Clock, 
  GraduationCap, 
  Building, 
  ArrowRight 
} from "lucide-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface CourseProps {
  id: number;
  title: string;
  description: string;
  duration: string;
  eligibility: string;
  stream: string;
  collegeCount: number;
  imageUrl: string;
}

const CourseCard = ({ 
  id, 
  title, 
  description, 
  duration, 
  eligibility, 
  stream,
  collegeCount,
  imageUrl,
}: CourseProps) => {
  return (
    <Card className="card-hover overflow-hidden h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge variant="outline" className={`bg-${stream} text-white px-3`}>
            {stream.charAt(0).toUpperCase() + stream.slice(1)}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="grid gap-3 pb-2 flex-grow">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="text-sm">{duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-gray-500" />
          <span className="text-sm line-clamp-1">{eligibility}</span>
        </div>
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-gray-500" />
          <span className="text-sm">{collegeCount} colleges available</span>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button asChild className="w-full bg-portal-blue hover:bg-portal-purple">
          <Link to={`/colleges?courseId=${id}`}>
            View Colleges
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
