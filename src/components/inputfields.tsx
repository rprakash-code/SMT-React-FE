import React from "react";

interface InputFieldsProps {
  inputs: { [key: string]: string };
  errors: { [key: string]: string }; // Accept errors as a prop
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}

const InputFields: React.FC<InputFieldsProps> = ({
  inputs,
  errors,
  handleInputChange,
  // handleSubmit,
}) => {
  return (
    <div>
      {Object.keys(inputs).map((key) => (
        <div key={key} style={{ marginBottom: "10px" }}>
          <label>{key}</label>
          <input
            type="text"
            name={key}
            value={inputs[key]}
            onChange={handleInputChange}
            style={{
              display: "block",
              marginBottom: "5px",
              padding: "8px",
              width: "100%",
              borderColor: errors[key] ? "red" : "#ccc", // Add red border if there's an error
            }}
          />
          {errors[key] && (
            <p style={{ color: "red", margin: "5px 0" }}>{errors[key]}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default InputFields;
