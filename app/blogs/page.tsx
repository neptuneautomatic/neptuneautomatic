import React from 'react';
import { Metadata } from 'next';
import BlogsView from '@/components/blogs/BlogsView';
import { ALL_BLOG_POSTS, BlogPost } from '@/data/blogsData';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

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

export default async function BlogsPage() {
  let posts: BlogPost[] = ALL_BLOG_POSTS;

  try {
    const dbPosts = await prisma.post.findMany({
      where: { status: 'published' },
      include: {
        categories: { include: { category: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (dbPosts && dbPosts.length > 0) {
      const dbPostMap = new Map<string, BlogPost>();

      // Base static posts
      ALL_BLOG_POSTS.forEach((p) => dbPostMap.set(p.slug, p));

      // Overlay database posts
      dbPosts.forEach((dbp, idx) => {
        const existing = dbPostMap.get(dbp.slug);
        const catName = dbp.categories[0]?.category.name || 'Access Automation';
        const formattedDate = dbp.publishedAt
          ? new Date(dbp.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
          : new Date(dbp.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        if (existing) {
          dbPostMap.set(dbp.slug, {
            ...existing,
            title: dbp.title,
            excerpt: dbp.excerpt || existing.excerpt,
            category: catName,
            image: dbp.featuredImage || existing.image,
            readTime: dbp.readTime || existing.readTime,
          });
        } else {
          dbPostMap.set(dbp.slug, {
            id: 1000 + idx,
            slug: dbp.slug,
            title: dbp.title,
            category: catName,
            date: formattedDate,
            rawDate: dbp.createdAt.toISOString(),
            readTime: dbp.readTime || '5 min read',
            image: dbp.featuredImage || '/assets/images/blog/blog-1.jpg',
            excerpt: dbp.excerpt || '',
            author: dbp.authorName || 'Neptune Technical Team',
            contentHtml: dbp.contentHtml || '',
            tableOfContents: [],
          });
        }
      });

      posts = Array.from(dbPostMap.values());
    }
  } catch (err) {
    console.error('Fallback to static posts due to DB query error', err);
    posts = ALL_BLOG_POSTS;
  }

  return <BlogsView initialPosts={posts} />;
}
