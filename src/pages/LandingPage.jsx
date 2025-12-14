import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Star, List } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#3b2a5f_0%,_var(--background)_100%)] text-foreground flex flex-col">
      <nav className="flex justify-between items-center p-6 md:p-10 container mx-auto">
        <div className="flex items-center gap-2">
          <span role="img" aria-label="popcorn" className="text-3xl">🍿</span>
          <h1 className="text-2xl font-bold tracking-tight text-white">usePopcorn</h1>
        </div>
      </nav>

      <div className="flex-1 flex flex-col justify-center items-center text-center px-6 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight">
          Discover Your Next <br />
          <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Favorite Movie
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Track what you want to watch. Save what you've watched.
          <br className="hidden md:inline" /> Rate movies and discover new gems with our seamless experience.
        </p>
        <Button 
          size="lg" 
          onClick={() => navigate("/dashboard")}
          className="text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1"
        >
          Start Exploring
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-6 p-6 md:p-10 pb-20">
        <FeatureCard 
          icon={<Search className="w-8 h-8 md:w-10 md:h-10 text-primary mb-3 md:mb-4" />} 
          title="Search" 
          desc="Find movies." 
        />
        <FeatureCard 
          icon={<Star className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 mb-3 md:mb-4" />} 
          title="Rate" 
          desc="Rate movies." 
        />
        <FeatureCard 
          icon={<List className="w-8 h-8 md:w-10 md:h-10 text-green-400 mb-3 md:mb-4" />} 
          title="Track" 
          desc="Organize lists." 
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <Card className="w-36 md:w-64 border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors border-none">
      <CardContent className="flex flex-col items-center pt-4 md:pt-6 text-center px-2 md:px-6">
        {icon}
        <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-primary-foreground">{title}</h3>
        <p className="text-xs md:text-base text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  )
}
