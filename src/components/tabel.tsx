import React from "react";

interface TableProps {
  items: string[];
  selectedItem: string | null;
  handleSelectItem: (item: string) => void;
}

const Table: React.FC<TableProps> = ({ items, selectedItem, handleSelectItem }) => {
  return (
    <table border={1} style={{ width: "100%", marginBottom: "20px" }}>
      <thead>
        <tr>
          <th>Items</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            key={item}
            style={{
              cursor: "pointer",
              background: selectedItem === item ? "#f0f8ff" : "white",
            }}
            onClick={() => handleSelectItem(item)}
          >
            <td>{item}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
