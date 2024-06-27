import React, { useState } from "react";
import axios from "axios";
import Navbar from './Navbar'

const AddQuiz = () => {

  const initialFormData = {
    filier: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
    title: "",
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
        "http://localhost:8000/admin/addquiz",
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
      console.error("Error adding quiz:", error);
    }
  };

  return (
    <>
        <Navbar/>
        <div className="add-student-form">
        <h2>Add Quiz</h2>
        <form onSubmit={handleSubmit}>
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

            <label>
            Question:
            <input
                type="text"
                name="question"
                className="pws"
                value={formData.question}
                onChange={handleChange}
                required
            />
            </label>

            <label>
            Option 1:
            <input
                type="text"
                name="option1"
                value={formData.option1}
                onChange={handleChange}
                required
            />
            </label>

            <label>
                Option 2:
            <input
                type="text"
                name="option2"
                value={formData.option2}
                onChange={handleChange}
                required
            />
            </label>

            <label>
                Option 3:
            <input
                type="text"
                name="option3"
                value={formData.option3}
                onChange={handleChange}
                required
            />
            </label>

            <label>
                Option 4:
            <input
                type="text"
                name="option4"
                value={formData.option4}
                onChange={handleChange}
                required
            />
            </label>

            <label>
                Asnwer:
            <input
                type="text"
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                required
            />
            </label>

            <label>
                Title:
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
            />
            </label>

            

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button type="submit" className="buttonn">Add Student</button>
        </form>
        </div>
    </>
  );
};

export default AddQuiz;
