import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

const Home = () => {
    const [text, setText] = useState('');
    const [link, setLink] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();

    useEffect(() => {
        resetForm();
    }, [location]);

    const resetForm = () => {
        setText('');
        setLink('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/paste', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, password }),
        })

        const result = await response.json();
        setLink(result.link);
    };

    const handleCopy = () => {
        if (link) {
            navigator.clipboard.writeText(link);
            toast.success('Lien copié!');
        } else {
            toast.error('Erruer');
        }
    };

    return (
        <main className="main-container">
            <ToastContainer autoClose={1500} />
            <section className="editor-section">
                <div className="additional-settings">
                    <h2>Additional settings</h2>
                    <ul>
                        <li>File</li>
                        <li>
                            Protect with password
                            <input
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </li>
                        <li>
                            <Link to="/myPastes">List all the pastes</Link>
                        </li>
                    </ul>
                </div>
                <div className="editor-container">
                    <div className="editor-toolbar">
                        <button className="btn editor-btn">Editor</button>
                    </div>
                    <form onSubmit={handleSubmit} className="editor-form">
                        <textarea
                            className="editor"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type your text here..."
                        />
                        <button className="btn publish" type="submit">Upload</button>
                    </form>
                    {link && (
                        <div className="link-container">
                            <p>Shareable link:</p>
                            <div className="link-wrapper">
                                <a
                                    href={link}
                                    className="shareable-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {link}
                                </a>
                                <button className="btn copy-btn" onClick={handleCopy}>
                                    Copy
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default Home;