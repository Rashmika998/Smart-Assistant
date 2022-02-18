import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Searches from './components/Searches';

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route exact path='/' element={<Home/>} />
                <Route exact path='/searches' element={<Searches/>} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    )

}

