import React from 'react';
import './ResultTable.css'

const ResultTable = ({ results }) => {
  return (
    <table className="result-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Prenom</th>
          <th>Filier</th>
          <th>Note</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result) => (
          <tr key={result._id}>
            <td>{result.Id}</td>
            <td>{result.Nom}</td>
            <td>{result.Prenom}</td>
            <td>{result.Filier}</td>
            <td>{result.Note}</td>
            <td>{result.Date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultTable;
