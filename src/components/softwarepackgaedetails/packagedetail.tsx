import React, { useState } from 'react';
import '../../styles/softwarepackagedetail/packagedetails.scss';
import User from '../../@types/interface/packagedetails/packagedetails';
import { Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface InputFieldsProps {
    inputs: { [key: string]: string };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => boolean;
    errors: { [key: string]: string }; // Accept errors as a prop
    isDarkMode: boolean;
}

const PackageDetails: React.FC<InputFieldsProps> = ({
    inputs,
    errors,
    handleInputChange,
    handleSubmit,
    isDarkMode
}) => {
    const [users] = useState<User[]>([
        {
            id: 1,
            name: 'Nagayoshi, (Takayuki)',
            status: 'Active',
            department: 'Technology Foundation (Div X)',
            email: 'alan.lee@nnlife.co.jp',
        },
    ]);

    const [confirmMove, setConfirmMove] = useState(false);
    const [suggestions, setSuggestions] = useState<{ [key: string]: string[] }>({});
    // const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // const validateInputs = () => {
    //     const newErrors: { [key: string]: string } = {};

    //     // Check each input field for empty value
    //     inputLabels.forEach((_, index) => {
    //         const key = `input${index + 1}`;
    //         if (!inputs[key]) {
    //             newErrors[key] = 'This field is required';
    //         }
    //     });


    //     // Update errors state if any validation fails
    //     setErrors(newErrors);

    //     // Return if the validation passed or failed
    //     return Object.keys(newErrors).length === 0;
    // };

    const suggestionsData: { [key: string]: string[] } = {
        input1: ['Alan Lee', 'Alice Brown', 'Amelia Clarke'],
        input2: ['Ronio Caragay', 'Ravi Singh', 'Roxanne Miller'],
        input3: ['9.24', '9.25', '10.0'],
        input4: ['Alan Lee', 'Alice Green', 'Amelia Clarke'],
        input5: ['Ronio Caragay', 'Ravi Singh', 'Roxanne Taylor'],
        input6: ['Missing', 'Pending', 'Completed'],
    };

    const inputLabels = [
        'Asset Owner',
        'Delegated Asset Owner',
        'Version',
        'CMDB Owner',
        'IDN Owner',
        'AD Group Owner',
    ];
    // const handleSubmit = () => {
    //     if (validateInputs()) {
    //         console.log('All fields are filled');
    //         return true; // Validation successful
    //     } else {
    //         console.log('Please fill all fields');
    //         return false; // Validation failed
    //     }
    // };
    // const handleInputAndFilter = (key: string, value: string) => {
    //     handleInputChange({ target: { name: key, value } } as React.ChangeEvent<HTMLInputElement>);
    //     filterSuggestions(key, value);
    // };
    const handleConfirmMove = (move: boolean) => {
        setConfirmMove(false);
        if (move) {
            console.log('Move to the next item');
        } else {
            console.log('Stay on this page');
        }
    };

    const handleClose = () => setConfirmMove(false);

    const handleInputFocus = (key: string) => {
        setSuggestions((prev) => ({ ...prev, [key]: suggestionsData[key] || [] }));
    };

    const handleInputBlur = (key: string) => {
        setTimeout(() => {
            setSuggestions((prev) => ({ ...prev, [key]: [] }));
        }, 200);
    };

    const handleSuggestionClick = (key: string, value: string) => {
        handleInputChange({ target: { name: key, value } } as React.ChangeEvent<HTMLInputElement>);
        setSuggestions((prev) => ({ ...prev, [key]: [] }));
    };
    const filterSuggestions = (key: string, value: string) => {
        const filtered = (suggestionsData[key] || []).filter((s) =>
            s.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions((prev) => ({ ...prev, [key]: filtered }));
    };

    return (
        <div className={isDarkMode ? 'software-package-details dark-mode' : 'software-package-details'}>
            <div className="right-title">
                <h3>Client Software Package Details</h3>
            </div>
            <div className="package-detail">
                {inputLabels.slice(0, 3).map((label, index) => {

                    const key = `input${index + 1}`;
                    return (
                        <div className="detail-item" key={key}>
                            <span>{label}</span>
                            <strong>
                                {index === 0
                                    ? 'Alan Lee'
                                    : index === 1
                                        ? 'Ronio Caragay'
                                        : '9.24'}
                            </strong>
                            <label>
                                <input
                                    type="text"
                                    name={key}
                                    value={inputs[key]}
                                    onChange={(e) => {
                                        handleInputChange(e); // Update input and clear errors
                                        filterSuggestions(key, e.target.value); // Additional logic for suggestions
                                    }}
                                    onFocus={() => handleInputFocus(key)}
                                    onBlur={() => handleInputBlur(key)}
                                />
                                {suggestions[key] && suggestions[key].length > 0 && (
                                    <div
                                        className="dropdown-container"
                                        style={{
                                            position: 'relative', // Keep parent container positioned relative
                                        }}
                                    >
                                        {/* <input
                                            type="text"
                                            style={{
                                                // width: '100%',
                                                padding: '5px',
                                                border: '1px solid #ccc',
                                            }}
                                        /> */}
                                        <div
                                            className="suggestion-list"
                                            style={{
                                                position: 'absolute',  // Absolute positioning to overlap below content
                                                top: '100%',           // Position right below the input field
                                                left: 0,               // Align with the left of the parent container
                                                zIndex: 999,           // Ensure it overlaps other content
                                                backgroundColor: 'white',
                                                border: '1px solid #ccc', // Optional: Adds a border to the suggestion list
                                                width: '100%',           // Match the input width
                                                maxHeight: '300px',      // Optional: Limit the height if you have many suggestions
                                                overflowY: 'auto',       // Enables scrolling if there are many suggestions
                                            }}
                                        >
                                            {suggestions[key].map((suggestion, idx) => (
                                                <div
                                                    key={idx}
                                                    className="suggestion-item"
                                                    style={{
                                                        color: 'black',
                                                        padding: '5px',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => handleSuggestionClick(key, suggestion)}
                                                >
                                                    {suggestion}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {errors[key] && <p className="error-message">{errors[key]}</p>}
                            </label>
                        </div>
                    );
                })}
                <div className="detail-item">
                    <span className="ad">AD Group</span>
                    <strong className="ad-str">GRAPAC-JP-Image</strong>
                </div>
                <div className="detail-item">
                    <span>IdN No</span>
                    <strong>Missing</strong>
                </div>
            </div>
            <div className="owner-title">
                <h4>Client Software Package Owner Details</h4>
            </div>
            <div className="owner-details">
                {inputLabels.slice(3).map((label, index) => {
                    const key = `input${index + 4}`;
                    return (
                        <div className="detail-item" key={key}>
                            <span>{label}</span>
                            <strong>
                                {index === 0
                                    ? 'Alan Lee'
                                    : index === 1
                                        ? 'Ronio Caragay'
                                        : 'Missing'}
                            </strong>
                            <label>
                                <input
                                    type="text"
                                    name={key}
                                    value={inputs[key]}
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        filterSuggestions(key, e.target.value);
                                    }}
                                    onFocus={() => handleInputFocus(key)}
                                    onBlur={() => handleInputBlur(key)}
                                />
                                {suggestions[key] && suggestions[key].length > 0 && (
                                    <div
                                        className="dropdown-container"
                                        style={{
                                            position: 'relative', // Keep parent container positioned relative
                                        }}
                                    >
                                        {/* <input
                                    type="text"
                                    style={{
                                      width: '100%',
                                      padding: '5px',
                                      border: '1px solid #ccc',
                                    }}
                                  /> */}
                                        <div
                                            className="suggestion-list"
                                            style={{
                                                position: 'absolute',  // Absolute positioning to overlap below content
                                                top: '100%',           // Position right below the input field
                                                left: 0,               // Align with the left of the parent container
                                                zIndex: 999,           // Ensure it overlaps other content
                                                backgroundColor: 'white',
                                                border: '1px solid #ccc', // Optional: Adds a border to the suggestion list
                                                width: '100%',           // Match the input width
                                                maxHeight: '300px',      // Optional: Limit the height if you have many suggestions
                                                overflowY: 'auto',       // Enables scrolling if there are many suggestions
                                            }}
                                        >
                                            {suggestions[key].map((suggestion, idx) => (
                                                <div
                                                    key={idx}
                                                    className="suggestion-item"
                                                    style={{
                                                        color: 'black',
                                                        padding: '5px',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => handleSuggestionClick(key, suggestion)}
                                                >
                                                    {suggestion}
                                                </div>
                                            ))}
                                        </div>
                                    </div>


                                )}
                                {errors[key] && <p className="error-message">{errors[key]}</p>}
                            </label>
                        </div>
                    );
                })}
            </div>
            <div className="title-sec">
                <h4 className="user-title">Client Software Package User List</h4>
                <div className="checkbox-wrapper">
                    <div className="user"> Disabled user:</div>
                    <Checkbox defaultChecked className="checkbox" />
                </div>
            </div>
            <div className="user-list-container">
                <div className="user-list">
                    {users.map((user) => (
                        <div className="user-row" key={user.id}>
                            <div className="user-number">{user.id}</div>
                            <div className="user-details">
                                <div className="user-info">
                                    <p className="user-name">
                                        <strong>{user.name}</strong>
                                    </p>
                                    <p>
                                        User Status:{' '}
                                        <span className={user.status.toLowerCase()}>
                                            {user.status}
                                        </span>
                                    </p>
                                </div>
                                <div className="user-meta">
                                    <p>{user.department}</p>
                                    <div className="remove-option">
                                        <label>
                                            Remove user from Software Package?
                                            <Checkbox defaultChecked />
                                        </label>
                                    </div>
                                </div>
                                <p className="user-mail">
                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="footer">
                <button
                    className="review-complete"
                    onClick={() => {
                        // Call handleSubmit and check if validation passes
                        const isFormValid = handleSubmit();

                        // Show the confirmation popup only if the form is valid
                        if (isFormValid) {
                            setConfirmMove(true); // Move to the next step after successful validation
                        }
                    }}
                >
                    Review Complete
                </button>




                {confirmMove && (
                    <div
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                            zIndex: 1000,
                            maxWidth: '400px',
                            width: '100%',
                        }}
                    >
                        <button
                            onClick={handleClose}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0',
                            }}
                        >
                            <CloseIcon style={{ fontSize: '24px', color: '#dc3545' }} />
                        </button>

                        <h3 style={{ color: 'black' }}>We submit your data?</h3>
                        <div style={{ marginTop: '15px', textAlign: 'center' }}>
                            <button
                                onClick={() => handleConfirmMove(true)}
                                style={{
                                    marginRight: '10px',
                                    padding: '10px 20px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                Submit
                            </button>
                            <button
                                onClick={() => handleConfirmMove(false)}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PackageDetails;
