import React from 'react';
import { Metadata } from 'next';
import BlogsView from '@/components/blogs/BlogsView';
import { ALL_BLOG_POSTS } from '@/data/blogsData';

export const metadata: Metadata = {
  title: 'Engineering Blogs & Technical Whitepapers | Neptune Automatic',
  description:
    'Explore 36+ expert articles and technical insights on automatic boom barriers, crash-rated bollards, FASTag smart parking, and hostile vehicle mitigation engineering in India.',
  keywords: [
    'Access Automation Blog',
    'Boom Barrier Technical Guide',
    'Crash Rated Bollard Standards',
    'FASTag Parking Solutions India',
    'Perimeter Security Whitepapers',
    'Neptune Automatic Blogs',
    'Car Parking Sensors',
    'Turnstiles and Pedestrian Gates',
  ],
};

export default function BlogsPage() {
  return <BlogsView initialPosts={ALL_BLOG_POSTS} />;
}
