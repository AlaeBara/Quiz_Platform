import React, { useState } from "react";
import axios from "axios";

const AddStudent = () => {

  const initialFormData = {
    id: "",
    password: "",
    nom: "",
    prenom: "",
    filier: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const allowedFiliers = ["ISIL", "GI", "IDSD"];
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/admin/addstudent",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setErrorMessage(response.data);
      resetForm();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="add-student-form">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Student ID:
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            className="pws"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          First Name:
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
        </label>

        <label>
            Filier:
            <select
                name="filier"
                value={formData.filier}
                onChange={handleChange}
                required>
                <option value="">Select Filier</option>
                    {allowedFiliers.map((filier) => (
                    <option key={filier} value={filier}>
                        {filier}
                </option>))}
            </select>
        </label>


        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" className="buttonn">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
