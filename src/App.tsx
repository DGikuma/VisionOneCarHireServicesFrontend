import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import { Suspense, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// s
import Home from './pages/Home';
import Booking from './pages/Booking';
import Agent_Booking from './pages/Agent_Booking';
import Fleet from './pages/Fleet';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Airbnb from './pages/Airbnb';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import PrivacyPolicy from './pages/PrivacyPolicy';
import SEO from './pages/SEO';
import Blog from './pages/Blog';
import SingleBlog from './pages/SingleBlog';
import Locations from './pages/Locations';
import NotFound from './pages/NotFound';
import CookiePopup from './components/CookiePopup';

function App() {
    const [showCookiePopup, setShowCookiePopup] = useState(false);

    // Check for cookie consent on mount
    useEffect(() => {
        const hasConsent = localStorage.getItem('vision-one-cookie-consent');
        if (!hasConsent) {
            // Wait a bit for page to settle, then show cookie popup
            const timer = setTimeout(() => {
                setShowCookiePopup(true);
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <HelmetProvider>
            <Router
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-x-hidden w-full max-w-full">
                    {/* Cookie Popup - Rendered conditionally */}
                    {showCookiePopup && <CookiePopup />}

                    <Navbar />
                    <main className="flex-grow">
                        <Suspense fallback={null}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/booking" element={<Booking />} />
                                <Route path="/agent-booking" element={<Agent_Booking />} />
                                <Route path="/fleet" element={<Fleet />} />
                                <Route path="/services" element={<Services />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/airbnb" element={<Airbnb />} />
                                <Route path="/locations" element={<Locations />} />
                                <Route path="/blog" element={<Blog />} />
                                <Route path="/blog/:id" element={<SingleBlog />} />
                                <Route path="/terms" element={<Terms />} />
                                <Route path="/privacy" element={<PrivacyPolicy />} />
                                <Route path="/faq" element={<FAQ />} />
                                <Route path="/seo" element={<SEO />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Suspense>
                    </main>
                    <Footer />
                    <ToastContainer position="top-right" autoClose={5000} />
                </div>
            </Router>
        </HelmetProvider>
    );
}

export default App;