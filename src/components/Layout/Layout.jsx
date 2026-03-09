import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.css'; // specific layout styles if needed

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            <Navbar />
            <main className="page-container">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
