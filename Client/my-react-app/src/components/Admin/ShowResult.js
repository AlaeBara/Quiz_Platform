import React, { useState } from 'react';
import axios from 'axios';
import './ShowResult.css';
import Navbar from './Navbar';
import ResultTable from './ResultTable';

const ShowResult = () => {
  const [selectedSection, setSelectedSection] = useState('');
  const allowedSections = ["ISIL", "GI", "IDSD"];
  const [results, setResults] = useState([]); 
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8000/admin/result",
        {
          params: { filier: selectedSection },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMsg(`Result for ${selectedSection} will be shown here.`);
      console.log(response.data);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="show-result-container">
        <h2>Show Result</h2>
        <div className="input-container">
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="">Select Section</option>
            {allowedSections.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
          <button onClick={handleSubmit} className="btnShow">
            Show Result
          </button>
        </div>
        <div className="result-container">
          <p>{msg}</p>
        </div>
      </div>

      <div className="result-container">
        {results && results.length > 0 ? (
          <ResultTable results={results} />
        ) : (
          <p>No results available.</p>
        )}
      </div>
    </>
  );
};

export default ShowResult;
