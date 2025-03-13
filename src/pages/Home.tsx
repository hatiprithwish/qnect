import React from "react";
import { Link } from "react-router-dom";
import { Box, ArrowRight, Layout, Share2, History } from "lucide-react";
import useAuthStore from "../store/authStore";

const Home: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-16">
        <Box className="w-16 h-16 text-blue-500 mx-auto mb-6" />
        <h1 className="text-5xl font-bold mb-6">System Design Judge</h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Create, share, and collaborate on system design diagrams with our
          powerful and intuitive platform.
        </p>
        <Link
          to={isAuthenticated ? "/problems" : "/oauth"}
          className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium"
        >
          Get Started <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 py-12">
        <div className="bg-gray-800 p-6 rounded-lg">
          <Layout className="w-10 h-10 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Intuitive Design</h3>
          <p className="text-gray-300">
            Create complex system designs with our drag-and-drop interface and
            extensive component library.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <Share2 className="w-10 h-10 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
          <p className="text-gray-300">
            Share your designs with team members and control access with
            granular permissions.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <History className="w-10 h-10 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Version Control</h3>
          <p className="text-gray-300">
            Track changes and maintain a complete history of your system
            designs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
