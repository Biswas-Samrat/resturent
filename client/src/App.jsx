import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';

function App() {
    const [restaurantInfo, setRestaurantInfo] = useState(null);

    useEffect(() => {
        // Fetch restaurant info on app load
        fetch('/api/info')
            .then(res => res.json())
            .then(data => setRestaurantInfo(data))
            .catch(err => console.error('Error fetching restaurant info:', err));
    }, []);

    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Navbar restaurantInfo={restaurantInfo} />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home restaurantInfo={restaurantInfo} />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/reviews" element={<Reviews restaurantInfo={restaurantInfo} />} />
                        <Route path="/contact" element={<Contact restaurantInfo={restaurantInfo} />} />
                    </Routes>
                </main>
                <Footer restaurantInfo={restaurantInfo} />
            </div>
        </Router>
    );
}

export default App;
