import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <main className='min-h-screen'>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div >
    );
};

export default RootLayout;