import React from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import LeftSidebar from "../components/shared/LeftSidebar";
import Feedbacks from "../components/shared/Feedbacks";

interface FlowLayoutProps {
  children?: React.ReactNode;
}

const FlowLayout: React.FC<FlowLayoutProps> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const problemStatement: string | null = searchParams.get("problemStatement");
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar pageTitle={problemStatement?.split("-").join(" ")} />
      <main className="flex items-center relative">
        <LeftSidebar />
        <div className="flex-1">{children || <Outlet />}</div>
        <Feedbacks />
      </main>
    </div>
  );
};

export default FlowLayout;
