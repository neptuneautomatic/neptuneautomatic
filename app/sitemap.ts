import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';
import { ALL_BLOG_POSTS } from '@/data/blogsData';
import { PRODUCT_CATEGORIES } from '@/data/productsData';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.neptuneautomatic.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/blogs`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/clientele`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/why-neptune`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/leadership`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/video-showcase`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const sitemapUrls = [...staticRoutes];

  try {
    // 1. Database Pages
    const pages = await prisma.page.findMany({
      where: { status: 'published' },
      select: { slug: true, updatedAt: true },
    });
    pages.forEach((p) => {
      if (p.slug !== 'home') {
        sitemapUrls.push({
          url: `${baseUrl}/${p.slug}`,
          lastModified: p.updatedAt,
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    });

    // 2. Database Blog Posts (with fallback)
    const posts = await prisma.post.findMany({
      where: { status: 'published' },
      select: { slug: true, updatedAt: true },
    });

    if (posts.length > 0) {
      posts.forEach((p) => {
        sitemapUrls.push({
          url: `${baseUrl}/blogs/${p.slug}`,
          lastModified: p.updatedAt,
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      });
    } else {
      ALL_BLOG_POSTS.forEach((p) => {
        sitemapUrls.push({
          url: `${baseUrl}/blogs/${p.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      });
    }

    // 3. Products
    PRODUCT_CATEGORIES.forEach((cat) => {
      sitemapUrls.push({
        url: `${baseUrl}/products/${cat.categorySlug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
      cat.products.forEach((prod) => {
        sitemapUrls.push({
          url: `${baseUrl}/products/${cat.categorySlug}/${prod.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      });
    });
  } catch (e) {
    console.error('Error generating dynamic sitemap', e);
  }

  return sitemapUrls;
}
