
import React from "react";
import { useNavigate } from "react-router-dom";
import { Beaker, TrendingUp, Brush } from "lucide-react";
import { Card } from "@/components/ui/card";

type Stream = "science" | "commerce" | "arts";

const streamInfo = {
  science: {
    title: "Science",
    description:
      "Explore courses in Engineering, Medicine, Research, and Technology with a foundation in Physics, Chemistry, Biology or Mathematics.",
    icon: Beaker,
    color: "bg-blue-600",
  },
  commerce: {
    title: "Commerce",
    description:
      "Discover pathways in Business, Finance, Accounting, Economics, and Management for a career in the corporate world.",
    icon: TrendingUp,
    color: "bg-green-600",
  },
  arts: {
    title: "Arts & Humanities",
    description:
      "Pursue studies in Literature, History, Psychology, Sociology, Fine Arts, and other creative or social disciplines.",
    icon: Brush,
    color: "bg-purple-600",
  },
};

const StreamSelection = () => {
  const navigate = useNavigate();

  const handleStreamSelect = (stream: Stream) => {
    navigate(`/courses?stream=${stream}`);
  };

  return (
    <div className="py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Choose Your Academic Stream</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select your preferred stream to discover tailored course recommendations
          and future career pathways aligned with your interests.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {Object.entries(streamInfo).map(([key, { title, description, icon: Icon, color }]) => (
          <Card
            key={key}
            className={`stream-card ${color} text-white card-hover`}
            onClick={() => handleStreamSelect(key as Stream)}
          >
            <div className="flex flex-col items-center text-center p-6">
              <div className="p-4 rounded-full bg-white/20 mb-4">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{title}</h3>
              <p className="text-white/90">{description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StreamSelection;
