import React, { useState } from "react";
import Table from "./tabel";
import InputFields from "./inputfields";

const Demo: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [inputs, setInputs] = useState(
    Array.from({ length: 6 }, (_, i) => ({ [`input${i + 1}`]: "" })).reduce(
      (acc, obj) => ({ ...acc, ...obj }),
      {}
    )
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Track errors for each input
  const [confirmMove, setConfirmMove] = useState<string | null>(null);

  const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

  const handleSelectItem = (item: string) => {
    const isAnyInputFilled = Object.values(inputs).some((val) => val !== "");
    if (selectedItem !== item && isAnyInputFilled) {
      setConfirmMove(item);
    } else {
      if (selectedItem !== item) {
        setSelectedItem(item);
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
        newErrors[key] = "This field is required.";
        isAllInputsFilled = false;
      }
    });

    if (isAllInputsFilled) {
      setErrors({});
      alert(`Submitted: ${Object.values(inputs).join(", ")}`);
    } else {
      setErrors(newErrors); // Set error messages for the respective fields
    }
  };

  const handleConfirmMove = (proceed: boolean) => {
    if (proceed && confirmMove) {
      setSelectedItem(confirmMove);
      setInputs(
        Array.from({ length: 6 }, (_, i) => ({ [`input${i + 1}`]: "" })).reduce(
          (acc, obj) => ({ ...acc, ...obj }),
          {}
        )
      );
    }
    setConfirmMove(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Select an Item</h3>

      {/* Table Component */}
      <Table
        items={items}
        selectedItem={selectedItem}
        handleSelectItem={handleSelectItem}
      />

      {/* InputFields Component */}
      <InputFields
        inputs={inputs}
        errors={errors} // Pass errors as props
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

      {confirmMove && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid red",
            background: "#ffe6e6",
          }}
        >
          <p>May we move to the next item or stay here?</p>
          <button onClick={() => handleConfirmMove(true)}>Move</button>
          <button onClick={() => handleConfirmMove(false)}>Stay</button>
        </div>
      )}

      {/* Review Button */}
      <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
        Review
      </button>
    </div>
  );
};

export default Demo;
