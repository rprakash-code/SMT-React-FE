import React, { useState } from "react";
import "../../styles/form/simple-form/simple-form.scss";
import FormData from "../../@types/interface/form/form";

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        message: "",
    });

    const [submittedData, setSubmittedData] = useState<FormData[]>([]);
    const [errors, setErrors] = useState<FormData>({
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        message: "",
    });

    const validateForm = (): boolean => {
        const newErrors: FormData = {
            firstName: "",
            lastName: "",
            gender: "",
            email: "",
            message: "",
        };

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required.";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required.";
        }

        if (!formData.gender) {
            newErrors.gender = "Please select a gender.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email.";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message cannot be empty.";
        }

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === "");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear the error for the field being edited
        setErrors({ ...errors, [name]: "" });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setSubmittedData([...submittedData, formData]);
            setFormData({
                firstName: "",
                lastName: "",
                gender: "",
                email: "",
                message: "",
            });
        }
    };

    const handleCancel = () => {
        setFormData({
            firstName: "",
            lastName: "",
            gender: "",
            email: "",
            message: "",
        });
        setErrors({
            firstName: "",
            lastName: "",
            gender: "",
            email: "",
            message: "",
        });
    };

    return (
        <div className="contact-form-container">
            <h1>Contact Us</h1>
            <div className="sub-container">
                <form className="contact-form" onSubmit={handleSave}>
                    <div className="form-group full-name">
                        <label>Full name <span>*</span></label>
                        <div className="name-fields">
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="First"
                            />
                            {errors.firstName && <span className="error">{errors.firstName}</span>}
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last"
                            />
                            {errors.lastName && <span className="error">{errors.lastName}</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Gender <span>*</span></label>
                        <select name="gender" value={formData.gender} onChange={handleChange}>
                            <option value="" disabled>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.gender && <span className="error">{errors.gender}</span>}
                    </div>
                    <div className="form-group">
                        <label>Email <span>*</span></label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label>Leave us a few words <span>*</span></label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Your message"
                        ></textarea>
                        {errors.message && <span className="error">{errors.message}</span>}
                    </div>
                    <div className="button-group">
                        <button type="submit" className="save-button">Save</button>
                        <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
                <div className="submitted-data">
                    <h2>Submitted Data</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Gender</th>
                                <th>Email</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submittedData.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.firstName}</td>
                                    <td>{data.lastName}</td>
                                    <td>{data.gender}</td>
                                    <td>{data.email}</td>
                                    <td>{data.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
