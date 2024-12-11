import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <header>
            <div className="logo">
                <Link to="/">Quick Past</Link>
            </div>
            <nav>
                <Link to="/" className="btn add-note">New paste</Link>
                <Link to="/premium" className="btn premium">Test premium</Link>
            </nav>
        </header>
    );
};

export default Navbar;