import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogDetailView from '@/components/blogs/BlogDetailView';
import { getBlogPostBySlug, getAllBlogSlugs } from '@/data/blogsData';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Blog Article Not Found | Neptune Automatic',
      description: 'The requested engineering blog article could not be located.',
    };
  }

  return {
    title: `${post.title} | Neptune Automatic Blog`,
    description: post.excerpt,
    keywords: [
      post.category,
      'Neptune Automatic Blog',
      'Access Automation India',
      'Smart Parking Technology',
      'Crash Bollards',
      'Boom Barrier Systems',
    ],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.rawDate,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogDetailView post={post} />;
}
