import React, { useState } from "react";
import Navbar from "../navbar/navbar"; // Ensure Navbar has a toggle button for sidebar
import Sidebar from "../sidebar/sidebar";
import SoftwareDashboard from "../software-review/software-review";
// import "./Dashboard.scss"; // Add SCSS for styling

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode] = React.useState(false);


  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="dashboard-container">
      {/* Navbar with a hamburger toggle */}
      <Navbar toggleSidebar={toggleSidebar} />
      
      {/* Sidebar component */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}isDarkMode={isDarkMode}
 />

      {/* Main content */}
      <div className={`main-content ${isSidebarOpen ? "shifted" : ""}`}>
        <SoftwareDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
