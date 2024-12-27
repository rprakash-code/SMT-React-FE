interface SoftwarePackageProps {
    packages: { name: string; lastReviewDate: string; lorem: string }[];
    selectedItem: number | null;
    handleSelectItem: (index: number | null) => void; // Allow `null` as a valid value
}

export default SoftwarePackageProps;