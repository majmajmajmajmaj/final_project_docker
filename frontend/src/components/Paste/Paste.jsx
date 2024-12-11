import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Paste.css';

const Paste = () => {
  const { link } = useParams();
  const [paste, setPaste] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(true);

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        const response = await fetch(`http://localhost:5000/${link}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Paste not found');
        }
        const result = await response.json();
        if (result.password) {
          setShowPasswordInput(true);
        } else {
          setPaste(result);
          setShowPasswordInput(false);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaste();
  }, [link]);

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/${link}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        throw new Error('Invalid password');
      }
      const result = await response.json();
      setPaste(result);
      setShowPasswordInput(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCopy = () => {
    if (paste) {
      navigator.clipboard
        .writeText(paste.text)
        .then(() => {
          setCopied(true);
          toast.success('The text is copied to the clipboard');
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          toast.error('Failed to copy tex');
        });
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="paste-container">
      <ToastContainer autoClose={1500} />
      <div className="paste-content">
        <h1>Paste Content</h1>
        {showPasswordInput ? (
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
            />
            <button type="submit">Submit</button>
          </form>
        ) : (
          <div className="paste-text">
            {paste && <p>{paste.text}</p>}
          </div>
        )}

        <button onClick={handleCopy} className="copy-btn">
          Copy Text
        </button>
      </div>
    </div>
  );
};

export default Paste;