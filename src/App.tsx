import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
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

function App() {
    return (
        <HelmetProvider>
            <Router>
                <div className="min-h-screen bg-gray-50 flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                        <Routes>
                            {/* Core Pages */}
                            <Route path="/" element={<HomePage />} />
                            <Route path="/booking" element={<BookingPage />} />
                            <Route path="/fleet" element={<FleetPage />} />
                            <Route path="/services" element={<ServicesPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/locations" element={<LocationsPage />} />

                            {/* Blog Pages */}
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/blog/:id" element={<SingleBlogPage />} />

                            {/* Legal Pages */}
                            <Route path="/terms" element={<TermsPage />} />
                            <Route path="/privacy" element={<PrivacyPolicyPage />} />
                            <Route path="/faq" element={<FAQPage />} />
                            <Route path="/seo" element={<SEOPage />} />

                            {/* Error Page */}
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </main>
                    <Footer />
                    <ToastContainer position="top-right" autoClose={5000} />
                </div>
            </Router>
        </HelmetProvider>
    );
}

export default App;