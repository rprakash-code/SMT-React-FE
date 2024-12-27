import React, { useContext } from "react";
import "../../styles/navbar/navbar.scss";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu"; // Import the hamburger icon
import { IconButton } from "@mui/material";
import Sidebar from "../sidebar/sidebar";
import img from '../../assets/dashboard/img.jpg';
import { ThemeContext } from "../software-review/software-review";

interface navbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<navbarProps> = ({ }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); // Destructure toggleTheme
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleDarkMode = () => {
    toggleTheme();
    
    const rootElement = document.getElementById('root');
    if (rootElement) {
      if (!isDarkMode) {
        rootElement.classList.add('dark-mode');
      } else {
        rootElement.classList.remove('dark-mode');
      }
    }// Use the context's toggle function to switch themes
  };

  return (
    <div className={`navbar ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Sidebar Toggle Button */}
      <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-label="toggle sidebar" className="toggle-icon">
        <MenuIcon />
      </IconButton>

      {/* Sidebar Component */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} isDarkMode={isDarkMode} />

      {/* Greeting */}
      <div className="navbar__greeting">
        <h4>Software Development Tool</h4>
      </div>

      {/* Icons Section */}
      <div className="navbar__icons">
        {/* Dark Mode Toggle */}
        <div className="dark-mode-toggle">
          <label className="switch">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
            <span className="slider"></span>
          </label>
        </div>
        {/* Divider */}
        <Divider orientation="vertical" flexItem className="divider" />

        {/* Avatar */}
        <div className="navbar__avatar">
          <img
            src={img} // Replace with your avatar image URL
            alt="User Avatar"
            className="navbar__avatar-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
