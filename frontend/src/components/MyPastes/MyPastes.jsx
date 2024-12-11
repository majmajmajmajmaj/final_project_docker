import React, { useState, useEffect } from 'react';
import './MyPastes.css';

const MyPastes = () => {
  const [pastes, setPastes] = useState([]);

  useEffect(() => {
    const fetchPastes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pastes');
        const data = await response.json();
        setPastes(data);
      } catch (error) {
        console.error('Error au moment de fectch pastes:', error);
      }
    };

    fetchPastes();
  }, []);

  return (
    <div className="my-pastes">
      <h1>My Pastes</h1>
      <ul>
        {pastes.map((paste, index) => (
          <li key={index}>
            <a href={`http://localhost:3000/${paste.link}`} target="_blank" rel="noopener noreferrer">
              {`http://localhost:3000/${paste.link}`}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPastes;
