import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    UserIcon,
    ClockIcon,
    TagIcon,
    ArrowRightIcon,
    MagnifyingGlassIcon,
    SparklesIcon,
    ChartBarIcon,
    BuildingOfficeIcon,
    ArrowTrendingUpIcon,
    AcademicCapIcon,
    LightBulbIcon,
    ShareIcon,
    BookmarkIcon,
    EyeIcon
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    authorRole: string;
    authorImage: string;
    date: string;
    readTime: string;
    category: string;
    categoryColor: string;
    image: string;
    tags: string[];
    views: number;
    shares: number;
    featured: boolean;
}

const BlogPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
    const [trendingView, setTrendingView] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

    useEffect(() => {
        // Add scroll animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('.blog-card, .sidebar-card, .category-card').forEach(el => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const categories = [
        { name: 'All', count: 12, color: 'bg-gradient-to-r from-[#FF6B35] to-[#FF8B35]' },
        { name: 'Travel Insights', count: 4, color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
        { name: 'Corporate Mobility', count: 3, color: 'bg-gradient-to-r from-gray-800 to-gray-600' },
        { name: 'Luxury Automotive', count: 3, color: 'bg-gradient-to-r from-amber-500 to-yellow-500' },
        { name: 'Technology & EVs', count: 3, color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
        { name: 'Business Strategy', count: 2, color: 'bg-gradient-to-r from-purple-500 to-indigo-500' },
        { name: 'Premium Lifestyle', count: 2, color: 'bg-gradient-to-r from-pink-500 to-rose-500' }
    ];

    const blogPosts: BlogPost[] = [
        {
            id: '1',
            title: 'The Future of Executive Mobility: 2024 Industry Outlook',
            excerpt: 'An in-depth analysis of emerging trends in premium mobility and their impact on corporate travel strategies.',
            content: 'Full article content...',
            author: 'Michael Roberts',
            authorRole: 'CEO, Vision One',
            authorImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200',
            date: 'Jan 15, 2024',
            readTime: '8 min read',
            category: 'Corporate Mobility',
            categoryColor: 'from-gray-800 to-gray-600',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
            tags: ['Executive Travel', 'Industry Trends', 'Corporate Strategy'],
            views: 12540,
            shares: 420,
            featured: true
        },
        {
            id: '2',
            title: 'Sustainable Luxury: The Evolution of Premium Electric Vehicles',
            excerpt: 'Exploring how luxury brands are integrating sustainability without compromising on premium experiences.',
            content: 'Full article content...',
            author: 'Dr. Sarah Johnson',
            authorRole: 'Head of Innovation',
            authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200',
            date: 'Jan 12, 2024',
            readTime: '10 min read',
            category: 'Technology & EVs',
            categoryColor: 'from-green-500 to-emerald-500',
            image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
            tags: ['Sustainability', 'Electric Vehicles', 'Luxury Tech'],
            views: 8930,
            shares: 315,
            featured: true
        },
        {
            id: '3',
            title: 'Optimizing Corporate Fleet Management for ROI',
            excerpt: 'Advanced strategies for maximizing return on investment through intelligent fleet management solutions.',
            content: 'Full article content...',
            author: 'David Chen',
            authorRole: 'CTO, Vision One',
            authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200',
            date: 'Jan 8, 2024',
            readTime: '7 min read',
            category: 'Business Strategy',
            categoryColor: 'from-purple-500 to-indigo-500',
            image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
            tags: ['Fleet Management', 'Business ROI', 'Operations'],
            views: 7560,
            shares: 245,
            featured: false
        },
        {
            id: '4',
            title: 'The Art of Premium Client Experience in Mobility Services',
            excerpt: 'How exceptional service design transforms premium car hire into luxury experiences.',
            content: 'Full article content...',
            author: 'Emma Wilson',
            authorRole: 'Customer Experience Director',
            authorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=200',
            date: 'Jan 5, 2024',
            readTime: '6 min read',
            category: 'Premium Lifestyle',
            categoryColor: 'from-pink-500 to-rose-500',
            image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80',
            tags: ['Client Experience', 'Service Design', 'Premium Service'],
            views: 6840,
            shares: 210,
            featured: false
        },
        {
            id: '5',
            title: 'Global Business Travel: Navigating International Mobility',
            excerpt: 'Comprehensive guide to seamless international travel with premium mobility solutions.',
            content: 'Full article content...',
            author: 'Robert Kim',
            authorRole: 'Global Operations Lead',
            authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200',
            date: 'Jan 3, 2024',
            readTime: '9 min read',
            category: 'Travel Insights',
            categoryColor: 'from-blue-500 to-cyan-500',
            image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
            tags: ['Global Travel', 'International Business', 'Mobility Solutions'],
            views: 5920,
            shares: 180,
            featured: false
        },
        {
            id: '6',
            title: 'Investment Perspectives: The Luxury Mobility Market',
            excerpt: 'Analyzing investment opportunities and market trends in the premium mobility sector.',
            content: 'Full article content...',
            author: 'Lisa Thompson',
            authorRole: 'Market Analyst',
            authorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200',
            date: 'Dec 28, 2023',
            readTime: '8 min read',
            category: 'Business Strategy',
            categoryColor: 'from-purple-500 to-indigo-500',
            image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
            tags: ['Market Analysis', 'Investment', 'Industry Insights'],
            views: 5230,
            shares: 165,
            featured: false
        }
    ];

    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
        const matchesSearch = searchQuery === '' ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesSearch;
    });

    const trendingPosts = [...blogPosts].sort((a, b) => b.views - a.views).slice(0, 4);
    const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

    const toggleSavePost = (id: string) => {
        setSavedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-px h-px bg-[#FF6B35] rounded-full animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.3}s`,
                                boxShadow: '0 0 20px 2px rgba(255, 107, 53, 0.5)'
                            }}
                        />
                    ))}
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 backdrop-blur-sm rounded-full border border-[#FF6B35]/20 mb-6">
                        <SparklesIcon className="h-4 w-4 text-[#FF6B35]" />
                        <span className="text-sm font-semibold text-[#FF6B35]">EXECUTIVE INSIGHTS</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
                            Vision One Insights
                        </span>
                    </h1>

                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                        Expert analysis, industry trends, and strategic perspectives on premium mobility,
                        executive travel, and corporate transportation solutions.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="px-4 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                            <span className="text-2xl font-bold text-white">100+</span>
                            <p className="text-sm text-gray-400">Executive Articles</p>
                        </div>
                        <div className="px-4 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                            <span className="text-2xl font-bold text-white">50K+</span>
                            <p className="text-sm text-gray-400">Industry Readers</p>
                        </div>
                        <div className="px-4 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                            <span className="text-2xl font-bold text-white">4.8★</span>
                            <p className="text-sm text-gray-400">Reader Rating</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        {/* Category Navigation */}
                        <div className="w-full lg:w-auto overflow-x-auto pb-2">
                            <div className="flex space-x-1">
                                {categories.map((category) => (
                                    <button
                                        key={category.name}
                                        onClick={() => setSelectedCategory(category.name === 'All' ? 'all' : category.name)}
                                        className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${(selectedCategory === 'all' && category.name === 'All') ||
                                            selectedCategory === category.name
                                            ? 'text-[#FF6B35] bg-white shadow-md'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <span className="text-lg">{category.name}</span>
                                            <span>{category.name}</span>
                                            <span className={`px-2 py-1 rounded-full text-xs ${(selectedCategory === 'all' && category.name === 'All') ||
                                                selectedCategory === category.name
                                                ? 'bg-[#FF6B35]/10 text-[#FF6B35]'
                                                : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {category.count}
                                            </span>
                                        </span>
                                        {(selectedCategory === 'all' && category.name === 'All') ||
                                            selectedCategory === category.name ? (
                                            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#FF6B35] rounded-full" />
                                        ) : null}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Search & Trending Filter */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
                            <div className="relative flex-1 max-w-md">
                                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search insights, topics, or authors..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B35]/30 focus:border-[#FF6B35] transition-all duration-300 outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl">
                                <ArrowTrendingUpIcon className="h-5 w-5 text-gray-600" />
                                <span className="text-sm font-medium text-gray-700 mr-2">Trending:</span>
                                {(['daily', 'weekly', 'monthly'] as const).map((period) => (
                                    <button
                                        key={period}
                                        onClick={() => setTrendingView(period)}
                                        className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${trendingView === period
                                            ? 'bg-[#FF6B35] text-white'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                                            }`}
                                    >
                                        {period.charAt(0).toUpperCase() + period.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Articles Column */}
                    <div className="lg:col-span-3">
                        {/* Featured Article */}
                        {filteredPosts.find(post => post.featured) && (
                            <div className="mb-12">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 rounded-full mb-6">
                                    <SparklesIcon className="h-4 w-4 text-[#FF6B35]" />
                                    <span className="text-sm font-semibold text-[#FF6B35]">FEATURED INSIGHT</span>
                                </div>

                                <div className="blog-card bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 opacity-0">
                                    {filteredPosts.find(post => post.featured) && (
                                        <>
                                            <div className="relative h-96 overflow-hidden">
                                                <img
                                                    src={filteredPosts.find(post => post.featured)!.image}
                                                    alt={filteredPosts.find(post => post.featured)!.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                                {/* Featured Badge */}
                                                <div className="absolute top-6 left-6">
                                                    <span className="px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white text-sm font-bold rounded-full shadow-lg">
                                                        FEATURED
                                                    </span>
                                                </div>

                                                {/* Category Badge */}
                                                <div className="absolute bottom-6 left-6">
                                                    <span className={`px-4 py-2 bg-gradient-to-r ${filteredPosts.find(post => post.featured)!.categoryColor} text-white text-sm font-semibold rounded-lg`}>
                                                        {filteredPosts.find(post => post.featured)!.category}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-8">
                                                <div className="flex items-center justify-between mb-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-2 text-gray-500">
                                                            <UserIcon className="h-4 w-4" />
                                                            <span className="font-medium">{filteredPosts.find(post => post.featured)!.author}</span>
                                                            <span className="text-sm">• {filteredPosts.find(post => post.featured)!.authorRole}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-gray-500">
                                                        <div className="flex items-center gap-1">
                                                            <EyeIcon className="h-4 w-4" />
                                                            <span className="text-sm">{filteredPosts.find(post => post.featured)!.views.toLocaleString()}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <ShareIcon className="h-4 w-4" />
                                                            <span className="text-sm">{filteredPosts.find(post => post.featured)!.shares}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                                    {filteredPosts.find(post => post.featured)!.title}
                                                </h2>

                                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                                    {filteredPosts.find(post => post.featured)!.excerpt}
                                                </p>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-wrap gap-2">
                                                        {filteredPosts.find(post => post.featured)!.tags.map((tag) => (
                                                            <span
                                                                key={tag}
                                                                className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full"
                                                            >
                                                                #{tag}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    <Link
                                                        to={`/blog/${filteredPosts.find(post => post.featured)!.id}`}
                                                        className="group flex items-center px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#FF6B35]/20 transition-all duration-300"
                                                    >
                                                        <span>Read Executive Analysis</span>
                                                        <ArrowRightIcon className="ml-3 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Articles Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {filteredPosts.filter(post => !post.featured).map((post) => (
                                <div
                                    key={post.id}
                                    className="blog-card group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 transform hover:-translate-y-2 opacity-0"
                                >
                                    {/* Save Button */}
                                    <button
                                        onClick={() => toggleSavePost(post.id)}
                                        className="absolute top-4 right-4 z-20 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300"
                                        aria-label={savedPosts.has(post.id) ? "Remove from saved" : "Save article"}
                                    >
                                        {savedPosts.has(post.id) ? (
                                            <BookmarkSolid className="h-5 w-5 text-[#FF6B35]" />
                                        ) : (
                                            <BookmarkIcon className="h-5 w-5 text-gray-400 hover:text-[#FF6B35]" />
                                        )}
                                    </button>

                                    <div className="relative h-56 overflow-hidden rounded-t-2xl">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                                        {/* Category */}
                                        <div className="absolute bottom-4 left-4">
                                            <span className={`px-3 py-1.5 bg-gradient-to-r ${post.categoryColor} text-white text-sm font-semibold rounded-lg`}>
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-full overflow-hidden border border-gray-200">
                                                    <img
                                                        src={post.authorImage}
                                                        alt={post.author}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{post.author}</p>
                                                    <p className="text-xs text-gray-500">{post.authorRole}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 text-gray-500 text-sm">
                                                <div className="flex items-center gap-1">
                                                    <EyeIcon className="h-4 w-4" />
                                                    <span>{post.views.toLocaleString()}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <ShareIcon className="h-4 w-4" />
                                                    <span>{post.shares}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FF6B35] transition-colors duration-300 line-clamp-2">
                                            {post.title}
                                        </h3>

                                        <p className="text-gray-600 mb-6 line-clamp-2">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-wrap gap-2">
                                                {post.tags.slice(0, 2).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex items-center text-gray-500 text-sm">
                                                <ClockIcon className="h-4 w-4 mr-1" />
                                                {post.readTime}
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-6 border-t border-gray-100">
                                            <Link
                                                to={`/blog/${post.id}`}
                                                className="group/read flex items-center text-[#FF6B35] font-semibold hover:text-[#FF5A20] transition-colors duration-300"
                                            >
                                                <span>Continue Reading</span>
                                                <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover/read:translate-x-1 transition-transform duration-300" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More */}
                        {filteredPosts.length > 0 && (
                            <div className="mt-12 text-center">
                                <button className="px-8 py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all duration-300 border border-gray-300">
                                    Load More Insights
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Trending Now */}
                        <div className="sidebar-card bg-white rounded-2xl shadow-xl border border-gray-200 p-6 opacity-0">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900">
                                    Trending Now
                                </h3>
                                <ArrowTrendingUpIcon className="h-5 w-5 text-[#FF6B35]" />
                            </div>

                            <div className="space-y-6">
                                {trendingPosts.map((post, index) => (
                                    <div
                                        key={post.id}
                                        className="group flex items-start gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0"
                                    >
                                        <div className="flex-shrink-0">
                                            <div className="relative">
                                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-700">
                                                    {index + 1}
                                                </div>
                                                {index < 3 && (
                                                    <div className="absolute -inset-1 border border-[#FF6B35]/20 rounded-lg" />
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-[#FF6B35] transition-colors duration-300 line-clamp-2">
                                                {post.title}
                                            </h4>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span>{post.category}</span>
                                                <div className="flex items-center gap-1">
                                                    <EyeIcon className="h-3 w-3" />
                                                    <span>{post.views.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Executive Newsletter */}
                        <div className="sidebar-card relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 opacity-0">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF6B35]/10 rounded-full -translate-y-20 translate-x-20" />

                            <div className="relative">
                                <div className="inline-flex p-3 bg-[#FF6B35]/20 rounded-xl mb-6">
                                    <AcademicCapIcon className="h-6 w-6 text-[#FF6B35]" />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-4">
                                    Executive Briefing
                                </h3>

                                <p className="text-gray-300 mb-6">
                                    Subscribe for exclusive industry insights, strategic analysis, and premium mobility trends.
                                </p>

                                <form className="space-y-4">
                                    <input
                                        type="email"
                                        placeholder="Business email address"
                                        className="w-full px-5 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full py-3.5 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#FF6B35]/20 transition-all duration-300"
                                    >
                                        Join Executive Circle
                                    </button>
                                </form>

                                <p className="text-gray-400 text-xs mt-4">
                                    12,000+ executives already subscribed
                                </p>
                            </div>
                        </div>

                        {/* Popular Tags */}
                        <div className="sidebar-card bg-white rounded-2xl shadow-xl border border-gray-200 p-6 opacity-0">
                            <div className="flex items-center gap-2 mb-6">
                                <TagIcon className="h-5 w-5 text-[#FF6B35]" />
                                <h3 className="text-xl font-bold text-gray-900">
                                    Explore Topics
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {allTags.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => setSearchQuery(tag)}
                                        className="category-card px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 opacity-0"
                                    >
                                        #{tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Featured Report */}
                        <div className="sidebar-card bg-gradient-to-r from-[#FF6B35] via-[#FF7B35] to-[#FF8B35] rounded-2xl p-8 text-white opacity-0">
                            <div className="inline-flex p-3 bg-white/20 rounded-xl mb-6">
                                <ChartBarIcon className="h-6 w-6" />
                            </div>

                            <h3 className="text-xl font-bold mb-4">
                                2024 Industry Report
                            </h3>

                            <p className="text-white/90 mb-6">
                                Download our comprehensive analysis of premium mobility trends and market insights.
                            </p>

                            <button className="w-full py-3.5 bg-white text-[#FF6B35] font-bold rounded-xl hover:bg-gray-100 transition-all duration-300">
                                Download Report (PDF)
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expert Contributors */}
            <div className="py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 rounded-full mb-6">
                            <BuildingOfficeIcon className="h-4 w-4 text-[#FF6B35]" />
                            <span className="text-sm font-semibold text-[#FF6B35]">EXPERT CONTRIBUTORS</span>
                        </div>

                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Industry Thought Leaders
                        </h2>

                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Insights from leading experts in mobility, corporate travel, and premium services.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {blogPosts.slice(0, 4).map((post) => (
                            <div
                                key={post.id}
                                className="text-center group"
                            >
                                <div className="relative mb-6">
                                    <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
                                        <img
                                            src={post.authorImage}
                                            alt={post.author}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -inset-2 border-2 border-[#FF6B35]/20 rounded-full group-hover:border-[#FF6B35]/40 transition-colors duration-300" />
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {post.author}
                                </h3>

                                <p className="text-[#FF6B35] font-semibold mb-3">
                                    {post.authorRole}
                                </p>

                                <p className="text-gray-600 text-sm mb-4">
                                    {post.category} Expert
                                </p>

                                <div className="flex justify-center space-x-3">
                                    <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                                        {post.views.toLocaleString()} reads
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative overflow-hidden py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 rounded-full mb-6">
                        <LightBulbIcon className="h-4 w-4 text-[#FF6B35]" />
                        <span className="text-sm font-semibold text-[#FF6B35]">CONTRIBUTE INSIGHTS</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Share Your Expertise
                    </h2>

                    <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                        Join our network of industry experts and contribute to the conversation on premium mobility and corporate travel.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#FF6B35]/20 transition-all duration-300 transform hover:-translate-y-1">
                            Submit Article Proposal
                        </button>
                        <button className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-300 hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all duration-300">
                            Join Expert Network
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default BlogPage;