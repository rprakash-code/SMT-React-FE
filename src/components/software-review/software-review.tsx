import React, { createContext, useState } from "react";
import SoftwarePackage from "../softwarepackage/softwarepackage";
import PackageDetails from "../softwarepackgaedetails/packagedetail";
import Navbar from "../navbar/navbar";
// import Sidebar from "../sidebar/sidebar";
import "../../styles/software-review/software-review.scss";
import TicketHistory from "../tickethistory/tickethistory";
import Tickectdetails from "../ticketdetails/tickectdetails";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "../sidebar/sidebar";



export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => { } // Function to toggle the theme
});

const SoftwareDashboard: React.FC = () => {
  const [packages] = useState([
    { name: "HYPERV STOP", lastReviewDate: "5/29/2023", lorem: "Description for HYPERV STOP" },
    { name: "Google Chrome", lastReviewDate: "5/30/2022", lorem: "Description for Google Chrome" },
    { name: "Image Ware Form Manager", lastReviewDate: "5/20/2023", lorem: "Description for Image Ware Form Manager" },
    { name: "IBM Operational Decision Manager - Rule", lastReviewDate: "6/29/2023", lorem: "Description for IBM Operational Decision Manager" },
  ]);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<{
    name: string;
    lastReviewDate: string;
    lorem: string;
  } | null>(null);
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const [inputs, setInputs] = useState(
    Array.from({ length: 6 }, (_, i) => ({ [`input${i + 1}`]: "" })).reduce(
      (acc, obj) => ({ ...acc, ...obj }),
      {}
    )
  );
  const [confirmMove, setConfirmMove] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Track errors for each input

  const [isItemLoading, setIsItemLoading] = useState(false); // State to track loading for selected item

  const handleSelectItem = (item: string) => {
    const isAnyInputFilled = Object.values(inputs).some((val) => val !== "");
    if (selectedItem !== item && isAnyInputFilled) {
      setConfirmMove(item);
    } else {
      if (selectedItem !== item) {
        setSelectedItem(item);
        setIsItemLoading(true); // Start loading for selected item
        setTimeout(() => {
          const selectedPackage = packages.find((pkg) => pkg.name === item) || null;
          setSelectedCard(selectedPackage);
          setIsItemLoading(false); // Stop loading after delay
        }, 1000);
      }
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });

    // Clear the error when the user starts typing
    if (value !== "") {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleSubmit = () => {
    let newErrors: { [key: string]: string } = {};
    let isAllInputsFilled = true;

    // Check if all input fields are filled, otherwise add error messages
    Object.keys(inputs).forEach((key) => {
      if (inputs[key] === "") {
        newErrors[key] = "This field is required."; // Mark as an error
        isAllInputsFilled = false; // Set validation failure flag
      }
    });

    if (isAllInputsFilled) {
      setErrors({}); // Clear any existing errors if all inputs are filled
      return true; // Return true when all inputs are filled (successful validation)
    } else {
      setErrors(newErrors); // Set error messages for the respective fields
      return false; // Return false if validation fails
    }
  };



  const handleConfirmMove = (proceed: boolean) => {
    if (proceed && confirmMove) {
      setSelectedItem(confirmMove);
      setIsItemLoading(true); // Start loading for selected item
      setTimeout(() => {
        const selectedPackage = packages.find((pkg) => pkg.name === confirmMove) || null;
        setSelectedCard(selectedPackage);
        setIsItemLoading(false); // Stop loading after delay
      }, 3000);
      setInputs(
        Array.from({ length: 6 }, (_, i) => ({ [`input${i + 1}`]: "" })).reduce(
          (acc, obj) => ({ ...acc, ...obj }),
          {}
        )
      );
    }
    setConfirmMove(null);
  };

  const handleClose = () => handleConfirmMove(false); // Close popup

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={`software-review-page ${isDarkMode ? "dark-mode" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} isDarkMode={isDarkMode}
        />
        <div className={isDarkMode ? 'software-review-center dark-mode' : 'software-review-center'}>
        <header className="header">
            <h1>Client Software Package Review Center</h1>
            <div className="sub-header">
              <p>
                Owner: <strong>Alan Lee</strong>
              </p>
              <p>
                # of Software: <strong>4</strong>
              </p>
            </div>
          </header>
          <div className="package-section">
            <SoftwarePackage
              packages={packages}
              selectedItem={selectedItem}
              handleSelectItem={handleSelectItem}
              errors={errors}
              isDarkMode={isDarkMode}
            />
            <PackageDetails
              inputs={inputs}
              errors={errors} // Pass errors as props
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isDarkMode={isDarkMode}
              />
          </div>
          <div className="ticket-section">
            <TicketHistory selectedCard={selectedCard} 
            isItemLoading={isItemLoading}
            isDarkMode={isDarkMode}
            
            />
            <Tickectdetails 
           isDarkMode={isDarkMode}
            />
          </div>


          {confirmMove && (
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                zIndex: 1000,
                maxWidth: "400px",
                width: "100%",
              }}
            >
              <button
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0",
                }}
              >
                <CloseIcon style={{ fontSize: "24px", color: "#dc3545" }} />
              </button>
              <h3>May we move to the next item or stay here?</h3>
              <div style={{ marginTop: "15px", textAlign: "center" }}>
                <button
                  onClick={() => handleConfirmMove(true)}
                  style={{
                    marginRight: "10px",
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Move
                </button>
                <button
                  onClick={() => handleConfirmMove(false)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Stay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ThemeContext.Provider>

  );
};

export default SoftwareDashboard;
