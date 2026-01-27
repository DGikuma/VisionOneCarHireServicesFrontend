import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    CalendarIcon,
    ClockIcon,
    TagIcon,
    ArrowLeftIcon,
    BookmarkIcon,
    ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';

import { Button } from "@heroui/react";

const SingleBlogPage: React.FC = () => {

    // Mock blog data - in real app, fetch based on id
    const blogPost = {
        id: '1',
        title: 'Top 10 Road Trip Destinations for 2024',
        excerpt: 'Discover the most breathtaking road trip destinations to explore this year with your rental car.',
        content: `
      <h2>Introduction to Road Trip Adventures</h2>
      <p>Road trips offer an unparalleled sense of freedom and adventure. As we enter 2024, the open road calls with new destinations waiting to be explored. At Vision One Car Hire, we believe that the journey is just as important as the destination, which is why we've curated this list of must-visit road trip destinations for the coming year.</p>
      
      <h2>1. Pacific Coast Highway, California</h2>
      <p>Often called one of the most scenic drives in the world, the Pacific Coast Highway offers breathtaking ocean views, rugged cliffs, and charming coastal towns. Start in San Francisco and wind your way down to Los Angeles, stopping at iconic spots like Big Sur, Monterey, and Santa Barbara.</p>
      
      <h2>2. Blue Ridge Parkway, Virginia to North Carolina</h2>
      <p>Known as "America's Favorite Drive," this 469-mile parkway offers stunning mountain views, especially during fall foliage season. The road winds through the Appalachian Highlands with numerous overlooks, hiking trails, and historic sites.</p>
      
      <h2>3. Route 66, Chicago to Santa Monica</h2>
      <p>Experience classic Americana on this historic route. While much of the original road has been replaced by interstates, preserved sections offer a glimpse into America's past with vintage diners, motels, and roadside attractions.</p>
      
      <h2>Road Trip Tips from Vision One</h2>
      <ul>
        <li><strong>Choose the Right Vehicle:</strong> For family trips, consider our spacious SUVs. For couples, a luxury convertible might be perfect.</li>
        <li><strong>Plan Your Stops:</strong> Don't just focus on the destination. The best road trips include interesting stops along the way.</li>
        <li><strong>Check Your Vehicle:</strong> Ensure your rental is properly maintained and suited for the terrain you'll encounter.</li>
        <li><strong>Book in Advance:</strong> Popular travel seasons can mean high demand for rental vehicles.</li>
      </ul>
      
      <h2>Why Choose Vision One for Your Road Trip</h2>
      <p>Our premium fleet is meticulously maintained and equipped with the latest features for comfort and safety. We offer flexible rental terms, unlimited mileage options, and 24/7 roadside assistance to ensure your journey is worry-free.</p>
      
      <h2>Conclusion</h2>
      <p>Whether you're seeking coastal views, mountain adventures, or historic routes, 2024 offers endless possibilities for road trip enthusiasts. With the right planning and the perfect vehicle from Vision One Car Hire, your dream road trip awaits.</p>
    `,
        author: 'Sarah Johnson',
        authorBio: 'Travel expert with 10+ years of experience in luxury travel and car hire services.',
        authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400',
        date: 'Jan 15, 2024',
        readTime: '5 min read',
        category: 'Road Trips',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200',
        tags: ['Road Trips', 'Travel', 'Adventure', 'California', 'USA'],
        relatedPosts: [
            {
                id: '2',
                title: 'Essential Car Maintenance Tips',
                excerpt: 'Keep your rental car in perfect condition.',
                image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w-400',
                date: 'Jan 5, 2024'
            },
            {
                id: '3',
                title: 'Family Vacation Planning Guide',
                excerpt: 'Choosing the right vehicle for your family.',
                image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w-400',
                date: 'Dec 20, 2023'
            },
            {
                id: '4',
                title: 'Luxury Car Features Explained',
                excerpt: 'Understanding premium vehicle features.',
                image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w-400',
                date: 'Dec 15, 2023'
            }
        ]
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Back Button */}
            <div className="mb-8">
                <Link
                    to="/blog"
                    className="inline-flex items-center text-primary-600 hover:text-primary-700"
                >
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Blog
                </Link>
            </div>

            {/* Article Header */}
            <header className="mb-12">
                <div className="flex items-center space-x-4 mb-6">
                    <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full font-semibold">
                        {blogPost.category}
                    </span>
                    <div className="flex items-center text-gray-500">
                        <CalendarIcon className="h-5 w-5 mr-2" />
                        {blogPost.date}
                    </div>
                    <div className="flex items-center text-gray-500">
                        <ClockIcon className="h-5 w-5 mr-2" />
                        {blogPost.readTime}
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    {blogPost.title}
                </h1>

                <p className="text-xl text-gray-600 mb-8">
                    {blogPost.excerpt}
                </p>

                {/* Author Info */}
                <div className="flex items-center justify-between border-t border-b border-gray-200 py-6">
                    <div className="flex items-center">
                        <img
                            src={blogPost.authorImage}
                            alt={blogPost.author}
                            className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                            <h3 className="font-bold text-gray-900">{blogPost.author}</h3>
                            <p className="text-gray-600 text-sm">{blogPost.authorBio}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button className="p-2 hover:bg-gray-100 rounded-full">
                        </Button>
                        <Button className="p-2 hover:bg-gray-100 rounded-full">
                            <BookmarkIcon className="h-5 w-5 text-gray-600" />
                        </Button>
                    </div>
                </div>
            </header >

            {/* Featured Image */}
            < div className="mb-12" >
                <img
                    src={blogPost.image}
                    alt={blogPost.title}
                    className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
            </div >

            {/* Article Content */}
            < article className="prose prose-lg max-w-none mb-12" >
                <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
            </article >

            {/* Tags */}
            < div className="mb-12" >
                <div className="flex items-center mb-4">
                    <TagIcon className="h-5 w-5 mr-2 text-gray-500" />
                    <span className="font-semibold text-gray-700">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-3">
                    {blogPost.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 cursor-pointer transition-colors"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div >

            {/* Action Buttons */}
            < div className="flex flex-wrap gap-4 mb-12" >
                <Button className="flex-1 min-w-[200px] bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                    Book a Car for Your Road Trip
                </Button>
                <Button className="flex-1 min-w-[200px] border border-primary-600 text-primary-600 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                    Download Road Trip Guide (PDF)
                </Button>
            </div >

            {/* Author Bio Expanded */}
            < div className="bg-gray-50 rounded-2xl p-8 mb-12" >
                <div className="flex items-start">
                    <img
                        src={blogPost.authorImage}
                        alt={blogPost.author}
                        className="w-20 h-20 rounded-full mr-6"
                    />
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            About {blogPost.author}
                        </h3>
                        <p className="text-gray-700 mb-4">
                            {blogPost.authorBio} Sarah has traveled to over 50 countries and has extensive experience in luxury travel planning. She regularly contributes to travel publications and specializes in creating unforgettable road trip experiences.
                        </p>
                        <div className="flex space-x-4">
                            <span className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm">
                                Travel Expert
                            </span>
                            <span className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm">
                                Luxury Specialist
                            </span>
                            <span className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm">
                                10+ Years Experience
                            </span>
                        </div>
                    </div>
                </div>
            </div >

            {/* Comments Section */}
            < div className="mb-12" >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <ChatBubbleLeftIcon className="h-6 w-6 mr-3" />
                    Comments (24)
                </h2>
                <div className="space-y-6">
                    {[1, 2].map((comment) => (
                        <div key={comment} className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
                                <div>
                                    <h4 className="font-bold text-gray-900">John Doe</h4>
                                    <p className="text-gray-500 text-sm">2 days ago</p>
                                </div>
                            </div>
                            <p className="text-gray-700">
                                Great article! Planning my road trip using these tips. Can't wait to rent from Vision One!
                            </p>
                        </div>
                    ))}
                </div>
                <form className="mt-6">
                    <textarea
                        placeholder="Add a comment..."
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <Button
                        type="submit"
                        className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700"
                    >
                        Post Comment
                    </Button>
                </form>
            </div >

            {/* Related Posts */}
            < div className="mb-12" >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Related Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {blogPost.relatedPosts.map((post) => (
                        <Link
                            key={post.id}
                            to={`/blog/${post.id}`}
                            className="group"
                        >
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
                                    <div className="text-gray-500 text-sm">{post.date}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div >

            {/* Newsletter CTA */}
            < div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white text-center" >
                <h3 className="text-2xl font-bold mb-4">
                    Never Miss a Travel Tip
                </h3>
                <p className="text-primary-100 mb-6 max-w-md mx-auto">
                    Subscribe to our newsletter for the latest road trip guides, car hire tips, and exclusive offers.
                </p>
                <form className="max-w-md mx-auto flex gap-4">
                    <input
                        type="email"
                        placeholder="Your email address"
                        className="flex-1 px-4 py-3 rounded-lg text-gray-900"
                    />
                    <Button
                        type="submit"
                        className="px-6 py-3 bg-white text-primary-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Subscribe
                    </Button>
                </form>
            </div >
        </div >
    );
};

export default SingleBlogPage;