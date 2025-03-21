
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center max-w-lg px-4 animate-slide-up">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-blue-50 dark:bg-blue-900/20 text-finance-blue mb-6 mx-auto">
            <span className="text-4xl font-bold">404</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-6 py-3 bg-finance-blue text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
