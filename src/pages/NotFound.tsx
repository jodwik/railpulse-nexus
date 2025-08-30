import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="text-8xl font-bold text-primary">404</div>
        <h1 className="text-2xl font-bold text-foreground">Route Not Found</h1>
        <p className="text-muted-foreground max-w-md">
          The requested control center route could not be located. Please check the path and try again.
        </p>
        <Button asChild>
          <a href="/">Return to Control Center</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
