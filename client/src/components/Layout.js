import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Navbar />
            <main style={{ minHeight: '80vh' }}>
                {children}
            </main>
            <Footer />
        </React.Fragment>
    );
};

export default Layout;
