import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from '../views/Auth/Auth'
import Chat from '../views/Chat/Chat'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/" element={<div>Home</div>} />
                <Route path="/about" element={<div>About</div>} />
                <Route path="/contact" element={<div>Contact</div>} /> {/* New route added */}
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes