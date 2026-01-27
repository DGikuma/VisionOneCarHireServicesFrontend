import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import { Suspense, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import FleetPage from './pages/FleetPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import TermsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import SEOPage from './pages/SEOPage';
import BlogPage from './pages/BlogPage';
import SingleBlogPage from './pages/SingleBlogPage';
import LocationsPage from './pages/LocationsPage';
import NotFoundPage from './pages/NotFoundPage';

// Loader
import SolarFlareLoader from './components/SolarFlareLoader';

function App() {
    const [isAppReady, setIsAppReady] = useState(false);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        let loadFinished = false;
        let minDelayFinished = false;

        const checkReady = () => {
            if (loadFinished && minDelayFinished) {
                setIsAppReady(true);

                // Keep loader visible for a tiny fade duration (0.5s)
                setTimeout(() => {
                    setShowLoader(false);
                }, 500);
            }
        };

        // Minimum 5-second delay
        const delayTimer = setTimeout(() => {
            minDelayFinished = true;
            checkReady();
        }, 1000);

        // Wait for browser load
        const handleLoad = () => {
            loadFinished = true;
            checkReady();
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => {
            clearTimeout(delayTimer);
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    return (
        <HelmetProvider>
            <Router>
                <div className="min-h-screen bg-gray-50 flex flex-col relative">
                    {/* Page content */}
                    {isAppReady && (
                        <>
                            <Navbar />
                            <main className="flex-grow">
                                <Suspense fallback={<SolarFlareLoader />}>
                                    <Routes>
                                        <Route path="/" element={<HomePage />} />
                                        <Route path="/booking" element={<BookingPage />} />
                                        <Route path="/fleet" element={<FleetPage />} />
                                        <Route path="/services" element={<ServicesPage />} />
                                        <Route path="/about" element={<AboutPage />} />
                                        <Route path="/contact" element={<ContactPage />} />
                                        <Route path="/locations" element={<LocationsPage />} />
                                        <Route path="/blog" element={<BlogPage />} />
                                        <Route path="/blog/:id" element={<SingleBlogPage />} />
                                        <Route path="/terms" element={<TermsPage />} />
                                        <Route path="/privacy" element={<PrivacyPolicyPage />} />
                                        <Route path="/faq" element={<FAQPage />} />
                                        <Route path="/seo" element={<SEOPage />} />
                                        <Route path="*" element={<NotFoundPage />} />
                                    </Routes>
                                </Suspense>
                            </main>
                            <Footer />
                            <ToastContainer position="top-right" autoClose={5000} />
                        </>
                    )}

                    {/* Loader overlay */}
                    {showLoader && (
                        <div
                            className={`absolute inset-0 z-50 transition-opacity duration-500 ${isAppReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
                                }`}
                        >
                            <SolarFlareLoader />
                        </div>
                    )}
                </div>
            </Router>
        </HelmetProvider>
    );
}

export default App;
