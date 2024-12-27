import React from "react";
import "../../styles/tickethistory/tickethistory.scss";
import TicketHistoryProps from "../../@types/interface/Tickethistory/Tickethistory";

// Import the necessary Font Awesome components and icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const TicketHistory: React.FC<TicketHistoryProps> = ({ selectedCard, isItemLoading,isDarkMode }) => {
  return (
    <div className={isDarkMode ? "tickect-page dark-mode" : "tickect-page"}>
      <div className="header">
        <h2>ServiceNow Ticket History</h2>
      </div>
      <div className="ticket-history-container">
        <table className="ticket-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {isItemLoading ? (
              // Show a placeholder row while loading
              <tr>
                <td colSpan={3} className="loading-spinner">
                  <FontAwesomeIcon icon={faSpinner} spin /> {/* Use the spinner icon */}
                </td>
              </tr>
            ) : selectedCard ? (
              <tr>
                <td>{selectedCard.lastReviewDate}</td>
                <td>{selectedCard.name}</td>
                <td>{selectedCard.lorem}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan={3}>No card selected</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketHistory;
