import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogDetailView from '@/components/blogs/BlogDetailView';
import { getBlogPostBySlug, getAllBlogSlugs, BlogPost } from '@/data/blogsData';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  let post = getBlogPostBySlug(params.slug);

  try {
    const dbPost = await prisma.post.findUnique({
      where: { slug: params.slug },
      include: {
        categories: { include: { category: true } },
      },
    });
    if (dbPost && dbPost.status === 'published') {
      return {
        title: `${dbPost.title} | Neptune Automatic Blog`,
        description: dbPost.excerpt || 'Technical insights and access automation whitepapers from Neptune Automatic.',
        openGraph: {
          title: dbPost.title,
          description: dbPost.excerpt || '',
          type: 'article',
          images: dbPost.featuredImage ? [{ url: dbPost.featuredImage }] : [],
        },
      };
    }
  } catch {
    // fallback below
  }

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

export default async function BlogPostPage({ params }: PageProps) {
  let post: BlogPost | undefined = getBlogPostBySlug(params.slug);

  try {
    const dbPost = await prisma.post.findUnique({
      where: { slug: params.slug },
      include: {
        categories: { include: { category: true } },
      },
    });

    if (dbPost && dbPost.status === 'published') {
      const catName = dbPost.categories[0]?.category.name || (post ? post.category : 'Access Automation');
      const formattedDate = dbPost.publishedAt
        ? new Date(dbPost.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : new Date(dbPost.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

      if (post) {
        post = {
          ...post,
          title: dbPost.title,
          excerpt: dbPost.excerpt || post.excerpt,
          contentHtml: dbPost.contentHtml || post.contentHtml,
          category: catName,
          image: dbPost.featuredImage || post.image,
          readTime: dbPost.readTime || post.readTime,
        };
      } else {
        post = {
          id: 9999,
          slug: dbPost.slug,
          title: dbPost.title,
          category: catName,
          date: formattedDate,
          rawDate: dbPost.createdAt.toISOString(),
          readTime: dbPost.readTime || '5 min read',
          image: dbPost.featuredImage || '/assets/images/blog/blog-1.jpg',
          excerpt: dbPost.excerpt || '',
          author: dbPost.authorName || 'Neptune Technical Team',
          contentHtml: dbPost.contentHtml || '',
          tableOfContents: [],
        };
      }
    }
  } catch (err) {
    console.error('Error fetching post from db', err);
  }

  if (!post) {
    notFound();
  }

  return <BlogDetailView post={post} />;
}
