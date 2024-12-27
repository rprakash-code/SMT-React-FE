interface TicketHistoryProps {
    selectedCard: { name: string; lastReviewDate: string; lorem: string } | null;
    isItemLoading: boolean; // Add this property
    isDarkMode:boolean;
}

export default TicketHistoryProps;
