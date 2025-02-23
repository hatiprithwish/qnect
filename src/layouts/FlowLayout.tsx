import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import LeftSidebar from "../components/shared/LeftSidebar";
import Feedbacks from "../components/shared/Feedbacks";

interface FlowLayoutProps {
  children?: React.ReactNode;
}

const FlowLayout: React.FC<FlowLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-700 text-white">
      <Navbar />
      <main className="flex relative">
        <LeftSidebar />
        <div className="flex-1">{children || <Outlet />}</div>
        <Feedbacks />
      </main>
    </div>
  );
};

export default FlowLayout;
