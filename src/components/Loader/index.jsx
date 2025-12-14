import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center p-8 w-full h-full">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <span className="ml-2 text-lg text-muted-foreground">Loading movies...</span>
    </div>
  );
};

export default Loader;
