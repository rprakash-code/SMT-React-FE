import React from 'react';
import '../../styles/softwarepackage/package.scss';

interface SoftwarePackageProps {
  packages: { name: string; lastReviewDate: string; lorem: string }[];
  selectedItem: string | null;
  errors: { [key: string]: string }; // Accept errors as a prop
  handleSelectItem: (item: string) => void;
  isDarkMode:boolean;
  
}

const SoftwarePackage: React.FC<SoftwarePackageProps> = ({ packages, selectedItem, handleSelectItem, isDarkMode }) => {
  return (
    <div className={isDarkMode?"package-container dark-mode" : "package-container"}>
      <div className="left-title">
        <h3>Client Software Package</h3>
      </div>
      <div className="software-package">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className={`package-item card ${selectedItem === pkg.name ? 'selected' : ''}`}
            onClick={() => handleSelectItem(pkg.name)}
            style={{
              color: selectedItem === pkg.name ? 'white' : 'black',
            }}
          >
            <span className="package-number">{index + 1}. </span>
            <div className="package-details">
              <span className="package-name">{pkg.name}</span>
              <div className="details-row">
                <span className="review-date">Last Review Date: {pkg.lastReviewDate}</span>
                <span className="package-description">Lorem: {pkg.lorem}</span>
              </div>
            </div>
            <button className="go-to-cmdb-btn">
              <a href="#!" className="go-to-cmdb">Go to CMDB</a>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoftwarePackage;
