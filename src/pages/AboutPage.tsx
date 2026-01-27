import * as React from 'react';
import { useState } from 'react';
import {
    TrophyIcon,
    UserGroupIcon,
    GlobeAltIcon,
    LightBulbIcon,
    SparklesIcon,
    BuildingOfficeIcon,
    ShieldCheckIcon,
    ArrowTrendingUpIcon,
    CheckBadgeIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
    const [activeTeam, setActiveTeam] = useState<string>('Michael Roberts');

    const leadershipTeam = [
        {
            name: 'Michael Roberts',
            role: 'Founder & Chief Executive Officer',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
            bio: 'Former executive at major automotive corporations with 20+ years in luxury mobility. MBA from Harvard Business School.',
            expertise: ['Strategic Vision', 'Luxury Market Expansion', 'Corporate Governance'],
            achievements: ['Founded Vision One in 2010', 'Expanded to 50+ locations', 'Industry Innovation Awards 2023'],
            linkedin: '#'
        },
        {
            name: 'Sarah Johnson',
            role: 'Chief Operations Officer',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
            bio: 'Specializes in operational excellence and premium service delivery. Former Director at Four Seasons Hotels.',
            expertise: ['Service Excellence', 'Operational Efficiency', 'Client Experience'],
            achievements: ['99.7% Client Satisfaction', 'Streamlined 40% Operations', 'Service Excellence Award 2022'],
            linkedin: '#'
        },
        {
            name: 'David Chen',
            role: 'Chief Technology Officer',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
            bio: 'Technology visionary with expertise in mobility solutions and digital transformation. Former Google Product Lead.',
            expertise: ['Digital Innovation', 'Fleet Management Systems', 'AI Integration'],
            achievements: ['Developed Proprietary Fleet Platform', 'Reduced Downtime by 60%', 'Tech Innovation Award 2023'],
            linkedin: '#'
        },
        {
            name: 'Emma Wilson',
            role: 'Chief Experience Officer',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=600&q=80',
            bio: 'Dedicated to creating exceptional client journeys. Former Luxury Hospitality Director at Ritz-Carlton.',
            expertise: ['Client Journey Design', 'Premium Service Standards', 'Brand Experience'],
            achievements: ['Designed Platinum Service Program', 'Increased NPS by 45%', 'Customer Experience Award 2023'],
            linkedin: '#'
        }
    ];

    const milestones = [
        { year: '2010', title: 'Vision Founded', description: 'Established with 5 premium vehicles in New York', color: '#FF6B35' },
        { year: '2013', title: 'National Expansion', description: 'Expanded operations to 3 major metropolitan areas', color: '#FF7B35' },
        { year: '2016', title: 'Fleet Excellence', description: 'Grew premium fleet to over 100 luxury vehicles', color: '#FF8B35' },
        { year: '2019', title: 'Digital Transformation', description: 'Launched proprietary booking platform and mobile app', color: '#FF6B35' },
        { year: '2022', title: 'Elite Recognition', description: 'Served 10,000+ premium clients nationwide', color: '#FF7B35' },
        { year: '2024', title: 'Global Vision', description: 'Expanded to 50+ locations with international partnerships', color: '#FF8B35' }
    ];

    const coreValues = [
        {
            icon: TrophyIcon,
            title: 'Excellence in Everything',
            description: 'We pursue perfection in every interaction, vehicle, and service touchpoint.',
            principles: ['Zero Tolerance for Mediocrity', 'Continuous Improvement', 'Premium Standards'],
            color: 'from-[#FF6B35] to-[#FF8B35]'
        },
        {
            icon: ShieldCheckIcon,
            title: 'Uncompromising Integrity',
            description: 'Transparency, honesty, and ethical conduct define every business decision.',
            principles: ['Full Transparency', 'Ethical Governance', 'Client Trust First'],
            color: 'from-[#FF8B35] to-[#FF6B35]'
        },
        {
            icon: UserGroupIcon,
            title: 'Client-Centric Excellence',
            description: 'Our clients aspirations and needs drive our innovation and service design.',
            principles: ['Personalized Service', 'Proactive Solutions', 'Lifetime Relationships'],
            color: 'from-[#FF6B35] to-[#FF7B35]'
        },
        {
            icon: GlobeAltIcon,
            title: 'Sustainable Leadership',
            description: 'Committed to environmental responsibility and sustainable luxury mobility.',
            principles: ['Electric Fleet Expansion', 'Carbon Neutral Operations', 'Green Technology'],
            color: 'from-[#FF7B35] to-[#FF8B35]'
        }
    ];

    const achievements = [
        {
            award: 'Best Premium Car Hire Service 2024',
            issuer: 'Luxury Travel Awards',
            year: '2024',
            icon: '🏆',
            highlight: true
        },
        {
            award: 'Excellence in Customer Service',
            issuer: 'International Service Awards',
            year: '2023',
            icon: '⭐',
            highlight: false
        },
        {
            award: 'Innovation in Mobility Technology',
            issuer: 'Tech & Travel Summit',
            year: '2023',
            icon: '🚀',
            highlight: false
        },
        {
            award: 'Sustainable Business Award',
            issuer: 'Green Mobility Council',
            year: '2023',
            icon: '🌱',
            highlight: false
        },
        {
            award: 'Premium Brand of the Year',
            issuer: 'Corporate Excellence Forum',
            year: '2022',
            icon: '👑',
            highlight: false
        },
        {
            award: 'Client Satisfaction Leader',
            issuer: 'Customer Experience Institute',
            year: '2022',
            icon: '💫',
            highlight: false
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24">
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
                        <span className="text-sm font-semibold text-[#FF6B35]">ABOUT VISION ONE</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
                            Redefining Premium Mobility
                        </span>
                    </h1>

                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                        For over a decade, Vision One has been at the forefront of luxury mobility,
                        combining cutting-edge technology with unparalleled service excellence for discerning clients worldwide.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="px-4 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                            <span className="text-3xl font-bold text-white">14+</span>
                            <p className="text-sm text-gray-400">Years Excellence</p>
                        </div>
                        <div className="px-4 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                            <span className="text-3xl font-bold text-white">50+</span>
                            <p className="text-sm text-gray-400">Locations</p>
                        </div>
                        <div className="px-4 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                            <span className="text-3xl font-bold text-white">10K+</span>
                            <p className="text-sm text-gray-400">Premium Clients</p>
                        </div>
                        <div className="px-4 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                            <span className="text-3xl font-bold text-white">4.9★</span>
                            <p className="text-sm text-gray-400">Average Rating</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Company Story */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80"
                                alt="Vision One Headquarters"
                                className="w-full h-[500px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>

                        {/* Floating Stats */}
                        <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                            <div className="text-5xl font-bold text-[#FF6B35] mb-2">2010</div>
                            <div className="text-gray-700 font-semibold">Year Founded</div>
                            <div className="text-sm text-gray-500">Pioneering Premium Mobility</div>
                        </div>
                    </div>

                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 rounded-full mb-6">
                            <BuildingOfficeIcon className="h-4 w-4 text-[#FF6B35]" />
                            <span className="text-sm font-semibold text-[#FF6B35]">OUR STORY</span>
                        </div>

                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            The Vision That Changed Mobility
                        </h2>

                        <div className="space-y-4 mb-8">
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Founded in 2010, Vision One emerged from a simple yet profound insight:
                                luxury mobility should be seamless, sophisticated, and consistently exceptional.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                What began as a curated collection of five premium vehicles has evolved into
                                a nationwide network of excellence, serving discerning clients who demand
                                nothing but the extraordinary.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Today, we continue to redefine industry standards through innovation,
                                impeccable service, and an unwavering commitment to our founding principles.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/contact"
                                className="px-8 py-3.5 bg-gradient-to-r from-[#FF6B35] to-[#FF8B35] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#FF6B35]/20 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                Connect With Our Team
                            </Link>
                            <Link
                                to="/fleet"
                                className="px-8 py-3.5 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-200 hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all duration-300"
                            >
                                Explore Our Premium Fleet
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Values */}
            <div className="bg-gradient-to-b from-white to-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 rounded-full mb-4">
                            <CheckBadgeIcon className="h-4 w-4 text-[#FF6B35]" />
                            <span className="text-sm font-semibold text-[#FF6B35]">CORE VALUES</span>
                        </div>

                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            The Principles That Guide Us
                        </h2>

                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Our values are the foundation of every decision, interaction, and innovation at Vision One.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {coreValues.map((value, index) => (
                            <div
                                key={index}
                                className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 transform hover:-translate-y-2"
                            >
                                {/* Gradient Header */}
                                <div className={`h-2 bg-gradient-to-r ${value.color}`} />

                                <div className="p-8">
                                    <div className="flex items-start mb-6">
                                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${value.color} text-white mr-6`}>
                                            <value.icon className="h-8 w-8" />
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#FF6B35] transition-colors duration-300">
                                                {value.title}
                                            </h3>
                                            <p className="text-gray-600">
                                                {value.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {value.principles.map((principle, idx) => (
                                            <div key={idx} className="flex items-center text-gray-700">
                                                <div className="h-2 w-2 bg-[#FF6B35] rounded-full mr-3 flex-shrink-0" />
                                                <span>{principle}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Leadership Team */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 rounded-full mb-4">
                        <UserGroupIcon className="h-4 w-4 text-[#FF6B35]" />
                        <span className="text-sm font-semibold text-[#FF6B35]">EXECUTIVE TEAM</span>
                    </div>

                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Visionary Leadership
                    </h2>

                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                        Meet the exceptional leaders who drive our commitment to excellence and innovation.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {leadershipTeam.map((member) => (
                        <div
                            key={member.name}
                            className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 ${activeTeam === member.name ? 'border-[#FF6B35]' : 'border-gray-200'
                                } transform hover:-translate-y-2 cursor-pointer`}
                            onClick={() => setActiveTeam(member.name)}
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                                {/* Active Indicator */}
                                {activeTeam === member.name && (
                                    <div className="absolute top-4 right-4 w-4 h-4 bg-[#FF6B35] rounded-full animate-pulse" />
                                )}
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {member.name}
                                </h3>
                                <p className="text-[#FF6B35] font-semibold mb-3">
                                    {member.role}
                                </p>
                                <p className="text-gray-600 text-sm mb-4">
                                    {member.bio}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {member.expertise.slice(0, 2).map((exp, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                                        >
                                            {exp}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Active Member Details */}
                {leadershipTeam.filter(member => member.name === activeTeam).map((member) => (
                    <div
                        key={member.name}
                        className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 border border-gray-200 shadow-lg"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-16 w-16 rounded-xl overflow-hidden border-2 border-[#FF6B35]/20">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                                <p className="text-[#FF6B35] font-semibold">{member.role}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-4">Key Achievements</h4>
                                <ul className="space-y-3">
                                    {member.achievements.map((achievement, idx) => (
                                        <li key={idx} className="flex items-center text-gray-600">
                                            <div className="h-2 w-2 bg-[#FF6B35] rounded-full mr-3" />
                                            {achievement}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-4">Areas of Expertise</h4>
                                <div className="flex flex-wrap gap-2">
                                    {member.expertise.map((exp, idx) => (
                                        <span
                                            key={idx}
                                            className="px-4 py-2 bg-gradient-to-r from-[#FF6B35]/10 to-[#FF8B35]/10 text-[#FF6B35] font-medium rounded-lg"
                                        >
                                            {exp}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Journey Timeline */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 backdrop-blur-sm rounded-full mb-4">
                            <ArrowTrendingUpIcon className="h-4 w-4 text-[#FF6B35]" />
                            <span className="text-sm font-semibold text-[#FF6B35]">OUR JOURNEY</span>
                        </div>

                        <h2 className="text-4xl font-bold text-white mb-4">
                            Milestones of Excellence
                        </h2>

                        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                            A timeline of innovation, growth, and achievement that defines our legacy.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Center Line */}
                        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#FF6B35] via-[#FF8B35] to-transparent" />

                        <div className="space-y-20">
                            {milestones.map((milestone, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                        }`}
                                >
                                    <div className="lg:w-1/2" />

                                    <div className="relative z-10 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
                                        <div className="relative">
                                            <div
                                                className="h-16 w-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
                                                style={{ backgroundColor: milestone.color }}
                                            >
                                                {milestone.year}
                                            </div>
                                            <div className="absolute -inset-4 border-2 border-[#FF6B35]/30 rounded-3xl animate-pulse" />
                                        </div>
                                    </div>

                                    <div className={`lg:w-1/2 mt-8 lg:mt-0 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'
                                        }`}>
                                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                                            <h3 className="text-xl font-bold text-white mb-2">
                                                {milestone.title}
                                            </h3>
                                            <p className="text-gray-300">
                                                {milestone.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Awards & Recognition */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B35]/10 rounded-full mb-4">
                        <TrophyIcon className="h-4 w-4 text-[#FF6B35]" />
                        <span className="text-sm font-semibold text-[#FF6B35]">AWARDS & RECOGNITION</span>
                    </div>

                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Industry Accolades
                    </h2>

                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                        Recognition from leading industry bodies for our commitment to excellence and innovation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {achievements.map((award, index) => (
                        <div
                            key={index}
                            className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 ${award.highlight ? 'border-[#FF6B35]' : 'border-gray-200'
                                } transform hover:-translate-y-2`}
                        >
                            {award.highlight && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span className="px-4 py-1.5 bg-[#FF6B35] text-white text-xs font-bold rounded-full shadow-md">
                                        PREMIUM AWARD
                                    </span>
                                </div>
                            )}

                            <div className="text-4xl mb-6">{award.icon}</div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FF6B35] transition-colors duration-300">
                                {award.award}
                            </h3>

                            <div className="space-y-2">
                                <p className="text-gray-600 font-medium">{award.issuer}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-[#FF6B35] font-bold">{award.year}</span>
                                    <span className="text-sm text-gray-500">Awarded</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Future Vision CTA */}
            <div className="relative overflow-hidden bg-gradient-to-r from-[#FF6B35] via-[#FF7B35] to-[#FF8B35] py-20">
                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                        <LightBulbIcon className="h-4 w-4 text-white" />
                        <span className="text-sm font-semibold text-white">FUTURE VISION</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Shaping the Future of Premium Mobility
                    </h2>

                    <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
                        We're pioneering sustainable luxury, embracing cutting-edge technology, and expanding
                        our global footprint while maintaining our unwavering commitment to exceptional experiences.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/fleet"
                            className="px-8 py-4 bg-white text-[#FF6B35] font-bold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
                        >
                            Discover Our Premium Fleet
                        </Link>
                        <Link
                            to="/contact"
                            className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300"
                        >
                            Join Our Executive Network
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;