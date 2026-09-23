import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import { Component, ErrorInfo, ReactNode, Suspense, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
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
import FloatingWidgets from './components/FloatingWidgets';
import Feedback from './pages/Feedback';
import Maintenance from './pages/Maintenance';

// ============================================
// Site Status — evaluated once at module load
// ============================================
type SiteStatus = 'live' | 'maintenance' | 'suspended' | 'expired';

const VALID_STATUSES: SiteStatus[] = ['live', 'maintenance', 'suspended', 'expired'];

const ENV_STATUS = import.meta.env.VITE_SITE_STATUS as SiteStatus | undefined;

const INITIAL_SITE_STATUS: SiteStatus =
    ENV_STATUS && VALID_STATUSES.includes(ENV_STATUS) ? ENV_STATUS : 'live';

// ============================================
// Error Boundary
// ============================================
interface ErrorBoundaryProps {
    children: ReactNode;
}
interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        // TODO: Send to Sentry / LogRocket / your backend
        console.error('App crashed:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
                    <div className="max-w-md text-center">
                        <h1 className="text-3xl font-bold text-slate-900 mb-4">
                            Something went wrong
                        </h1>
                        <p className="text-slate-600 mb-6">
                            Please refresh the page. If the problem persists, contact support.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

// ============================================
// App
// ============================================
function App() {
    const [showCookiePopup, setShowCookiePopup] = useState(false);

    // Cookie consent check
    useEffect(() => {
        const hasConsent = localStorage.getItem('vision-one-cookie-consent');
        if (!hasConsent) {
            const timer = setTimeout(() => setShowCookiePopup(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    // 🚨 Non-live statuses — full-screen takeover
    if (INITIAL_SITE_STATUS !== 'live') {
        return (
            <ErrorBoundary>
                <HelmetProvider>
                    <Maintenance status={INITIAL_SITE_STATUS} />
                </HelmetProvider>
            </ErrorBoundary>
        );
    }

    // ✅ Normal app
    return (
        <ErrorBoundary>
            <HelmetProvider>
                <Router
                    future={{
                        v7_startTransition: true,
                        v7_relativeSplatPath: true,
                    }}
                >
                    <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-x-hidden w-full max-w-full">
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
                                    <Route path="/feedback" element={<Feedback />} />
                                    <Route path="/terms" element={<Terms />} />
                                    <Route path="/privacy" element={<PrivacyPolicy />} />
                                    <Route path="/faq" element={<FAQ />} />
                                    <Route path="/seo" element={<SEO />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </Suspense>
                        </main>
                        <Footer />
                        <FloatingWidgets />
                        <ToastContainer position="top-right" autoClose={5000} />
                    </div>
                </Router>
            </HelmetProvider>
        </ErrorBoundary>
    );
}

export default App;