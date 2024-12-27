import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/sidebar/sidebar.scss";
// import logo from "../../../assets/Dashboard/navbar/Logo.png";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
// import FaxOutlinedIcon from "@mui/icons-material/FaxOutlined";
// import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
// import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
// import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

interface SidebarProps {
  isSidebarOpen: boolean;
  isDarkMode: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen ,  isDarkMode,}) => {
  const location = useLocation(); // Get the current route
  const sidebarRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { path: "/dashboard", label: "Service Now", icon: <SaveAsOutlinedIcon /> },
    // { path: "/payslip", label: "Tools", icon: <FaxOutlinedIcon /> },
    // { path: "/idcard", label: "ID card", icon: <BadgeOutlinedIcon /> },
    // { path: "/attendence", label: "Attendance", icon: <CalendarMonthOutlinedIcon /> },
    // { path: "/request-leave", label: "Leave Request", icon: <NoteAltOutlinedIcon /> },
  ];

  const activePath =
    menuItems.find((item) => location.pathname === item.path)?.path || "/EmployeeDetails";

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, setIsSidebarOpen]);

  return (
    <div
      ref={sidebarRef}
      className={`sidebar ${
        isSidebarOpen ? "sidebar--open" : "sidebar--closed"
      } ${isDarkMode ? "dark-mode" : ""}`}
    >
  
     <div className="sidebar__greeting">
        <h4>Software Development Tool</h4></div>

      <hr className="sidebar__divider" />
      <div className="sidebar__menu">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar__item ${
              activePath === item.path ? "sidebar__item--active" : ""
            }`}
          >
            <i className="sidebar__icon">{item.icon}</i>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
      <hr className="sidebar__divider" />
      <div className={ isDarkMode ?"sidebar__footer dark-mode " : "sidebar__foote"}>
        <div className="sidebar__item">
          <i className="sidebar__icon">
            <SettingsOutlinedIcon />
          </i>
          <span>Settings</span>
        </div>
        {/* <div className="sidebar__item">
          <i className="sidebar__icon">
            <ManageAccountsOutlinedIcon />
          </i>
          <span>Support</span>
        </div> */}
        <div className="sidebar__item sidebar__item--logout">
          <i className="sidebar__icon">
            <LoginOutlinedIcon />
          </i>
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
