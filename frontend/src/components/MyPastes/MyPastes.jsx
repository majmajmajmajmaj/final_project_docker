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

  const requestToDelete = async (link) => {
    try {
      const response = await fetch(`http://localhost:5000/api/pastes/${link}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPastes(pastes.filter((paste) => paste.link !== link));
      } else {
        console.error('Erreur:', await response.json());
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="my-pastes">
      <h1>My Pastes</h1>
      <ul>
        {pastes.map((paste, index) => (
          <li key={index}>
            <a
              href={`http://localhost:80/${paste.link}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {`http://localhost:80/${paste.link}`}
            </a>
            <button
              className="delete-btn"
              onClick={() => requestToDelete(paste.link)}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPastes;