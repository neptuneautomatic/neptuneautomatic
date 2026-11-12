import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { PRODUCT_CATEGORIES } from '../data/productsData';
import { ALL_BLOG_POSTS, BLOG_CATEGORIES } from '../data/blogsData';
import { CLIENTS_LIST } from '../data/clientsData';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting comprehensive database seeding for Neptune Automatic...');

  // --------------------------------------------------------------------------
  // 1. ROLES & PERMISSIONS
  // --------------------------------------------------------------------------
  console.log('👉 Seeding roles and permissions...');

  const modules = [
    'dashboard',
    'pages',
    'posts',
    'products',
    'categories',
    'media',
    'menus',
    'forms',
    'seo',
    'users',
    'settings',
    'backups',
    'audit_logs',
  ];

  const actions = ['view', 'create', 'edit', 'delete', 'publish', 'manage'];

  const createdPermissions: { id: string; slug: string }[] = [];

  for (const mod of modules) {
    for (const act of actions) {
      const slug = `${mod}:${act}`;
      const name = `${act.charAt(0).toUpperCase() + act.slice(1)} ${mod}`;
      const permission = await prisma.permission.upsert({
        where: { slug },
        update: {},
        create: {
          name,
          slug,
          module: mod,
          description: `Can ${act} in ${mod} module`,
        },
      });
      createdPermissions.push({ id: permission.id, slug: permission.slug });
    }
  }

  // Create Roles
  const rolesData = [
    {
      name: 'Super Administrator',
      slug: 'super_admin',
      description: 'Unrestricted access to all system functions, database, and configurations.',
      isSystem: true,
    },
    {
      name: 'Administrator',
      slug: 'admin',
      description: 'Full administrative access except destructive server/security overrides.',
      isSystem: true,
    },
    {
      name: 'Editor',
      slug: 'editor',
      description: 'Can publish and manage all pages, posts, products, and forms.',
      isSystem: false,
    },
    {
      name: 'Author',
      slug: 'author',
      description: 'Can create and edit their own articles and media submissions.',
      isSystem: false,
    },
    {
      name: 'SEO Manager',
      slug: 'seo_manager',
      description: 'Can manage meta tags, redirects, sitemaps, and robots.txt.',
      isSystem: false,
    },
    {
      name: 'Media Manager',
      slug: 'media_manager',
      description: 'Can upload, organize, tag, and curate assets in the media library.',
      isSystem: false,
    },
    {
      name: 'Contributor',
      slug: 'contributor',
      description: 'Can draft articles without direct publish permissions.',
      isSystem: false,
    },
  ];

  const roleMap: Record<string, string> = {};

  for (const r of rolesData) {
    const role = await prisma.role.upsert({
      where: { slug: r.slug },
      update: { name: r.name, description: r.description },
      create: r,
    });
    roleMap[r.slug] = role.id;

    // Grant all permissions to super_admin
    if (r.slug === 'super_admin') {
      for (const perm of createdPermissions) {
        await prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: role.id,
              permissionId: perm.id,
            },
          },
          update: {},
          create: {
            roleId: role.id,
            permissionId: perm.id,
          },
        });
      }
    }
  }

  // --------------------------------------------------------------------------
  // 2. DEFAULT SUPER ADMIN USER
  // --------------------------------------------------------------------------
  console.log('👉 Creating default super administrator account...');
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync('Password@123', salt);

  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@neptuneautomatic.com' },
    update: {
      passwordHash,
      roleId: roleMap['super_admin'],
      status: 'active',
    },
    create: {
      name: 'Neptune System Administrator',
      email: 'admin@neptuneautomatic.com',
      passwordHash,
      roleId: roleMap['super_admin'],
      status: 'active',
      avatar: '/assets/images/logo.png',
    },
  });

  // Secondary editor user for RBAC verification
  await prisma.user.upsert({
    where: { email: 'editor@neptuneautomatic.com' },
    update: {},
    create: {
      name: 'Technical Editorial Team',
      email: 'editor@neptuneautomatic.com',
      passwordHash: bcrypt.hashSync('Editor@123', salt),
      roleId: roleMap['editor'],
      status: 'active',
      avatar: '/assets/images/logo.png',
    },
  });

  // --------------------------------------------------------------------------
  // 3. PRODUCT CATEGORIES & ALL 93 PRODUCTS
  // --------------------------------------------------------------------------
  console.log('👉 Seeding product categories and products...');

  for (let cIdx = 0; cIdx < PRODUCT_CATEGORIES.length; cIdx++) {
    const cat = PRODUCT_CATEGORIES[cIdx];

    const categoryRecord = await prisma.productCategory.upsert({
      where: { slug: cat.categorySlug },
      update: {
        name: cat.categoryName,
        division: cat.division,
        divisionSlug: cat.divisionSlug,
        title: cat.title,
        h1: cat.h1,
        tagline: cat.tagline,
        description: cat.description,
        heroImage: cat.heroImage,
        highlightsJson: JSON.stringify(cat.highlights || []),
        overviewSpecsJson: JSON.stringify(cat.overviewSpecs || []),
        orderIndex: cIdx,
      },
      create: {
        name: cat.categoryName,
        slug: cat.categorySlug,
        division: cat.division,
        divisionSlug: cat.divisionSlug,
        title: cat.title,
        h1: cat.h1,
        tagline: cat.tagline,
        description: cat.description,
        heroImage: cat.heroImage,
        highlightsJson: JSON.stringify(cat.highlights || []),
        overviewSpecsJson: JSON.stringify(cat.overviewSpecs || []),
        orderIndex: cIdx,
      },
    });

    // Seed products inside this category
    for (let pIdx = 0; pIdx < cat.products.length; pIdx++) {
      const prod = cat.products[pIdx];

      await prisma.product.upsert({
        where: { slug: prod.slug },
        update: {
          name: prod.name,
          modelCode: prod.modelCode || null,
          division: prod.division || cat.division,
          divisionSlug: prod.divisionSlug || cat.divisionSlug,
          categorySlug: cat.categorySlug,
          categoryId: categoryRecord.id,
          tagline: prod.tagline || '',
          shortDesc: prod.shortDesc || '',
          description: prod.description || '',
          featuresJson: JSON.stringify(prod.features || []),
          specsJson: JSON.stringify(prod.specs || []),
          fastFactsJson: JSON.stringify(prod.fastFacts || []),
          imagesJson: JSON.stringify(prod.images || []),
          brochureUrl: prod.brochureUrl || null,
          status: 'published',
          featured: pIdx < 3,
          orderIndex: pIdx,
        },
        create: {
          name: prod.name,
          slug: prod.slug,
          modelCode: prod.modelCode || null,
          division: prod.division || cat.division,
          divisionSlug: prod.divisionSlug || cat.divisionSlug,
          categorySlug: cat.categorySlug,
          categoryId: categoryRecord.id,
          tagline: prod.tagline || '',
          shortDesc: prod.shortDesc || '',
          description: prod.description || '',
          featuresJson: JSON.stringify(prod.features || []),
          specsJson: JSON.stringify(prod.specs || []),
          fastFactsJson: JSON.stringify(prod.fastFacts || []),
          imagesJson: JSON.stringify(prod.images || []),
          brochureUrl: prod.brochureUrl || null,
          status: 'published',
          featured: pIdx < 3,
          orderIndex: pIdx,
        },
      });
    }
  }

  // --------------------------------------------------------------------------
  // 4. BLOG CATEGORIES & ALL 36 BLOG POSTS
  // --------------------------------------------------------------------------
  console.log('👉 Seeding blog categories and posts...');

  const blogCatMap: Record<string, string> = {};

  for (let i = 0; i < BLOG_CATEGORIES.length; i++) {
    const catName = BLOG_CATEGORIES[i];
    const catSlug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const catRecord = await prisma.category.upsert({
      where: { slug: catSlug },
      update: { name: catName, type: 'blog' },
      create: {
        name: catName,
        slug: catSlug,
        type: 'blog',
        orderIndex: i,
      },
    });
    blogCatMap[catName] = catRecord.id;
  }

  for (const post of ALL_BLOG_POSTS) {
    const postRecord = await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        contentHtml: post.contentHtml || '',
        featuredImage: (post as any).featuredImage || post.image,
        readTime: post.readTime,
        status: 'published',
        authorName: 'Neptune Technical Editorial',
        authorId: superAdmin.id,
        publishedAt: new Date(post.date || Date.now()),
      },
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        contentHtml: post.contentHtml || '',
        featuredImage: (post as any).featuredImage || post.image,
        readTime: post.readTime,
        status: 'published',
        authorName: 'Neptune Technical Editorial',
        authorId: superAdmin.id,
        publishedAt: new Date(post.date || Date.now()),
      },
    });

    // Link category
    if (post.category && blogCatMap[post.category]) {
      await prisma.postCategory.upsert({
        where: {
          postId_categoryId: {
            postId: postRecord.id,
            categoryId: blogCatMap[post.category],
          },
        },
        update: {},
        create: {
          postId: postRecord.id,
          categoryId: blogCatMap[post.category],
        },
      });
    }
  }

  // --------------------------------------------------------------------------
  // 5. CLIENTELE (ALL 101 ENTRIES)
  // --------------------------------------------------------------------------
  console.log('👉 Seeding clientele...');

  for (let i = 0; i < CLIENTS_LIST.length; i++) {
    const c = CLIENTS_LIST[i];
    await prisma.client.upsert({
      where: { clientId: c.id },
      update: {
        name: c.name,
        logoSrc: c.src,
        category: c.category,
        sectorLabel: c.sectorLabel,
        featured: !!c.featured,
        highlight: c.highlight || null,
        orderIndex: i,
      },
      create: {
        clientId: c.id,
        name: c.name,
        logoSrc: c.src,
        category: c.category,
        sectorLabel: c.sectorLabel,
        featured: !!c.featured,
        highlight: c.highlight || null,
        orderIndex: i,
      },
    });
  }

  // --------------------------------------------------------------------------
  // 6. CMS PAGES
  // --------------------------------------------------------------------------
  console.log('👉 Seeding standard CMS pages...');

  const pagesData = [
    {
      title: 'Home',
      slug: 'home',
      template: 'landing',
      contentHtml: '<h1>India’s Pioneer in Access Automation & Perimeter Security</h1><p>Engineered crash barriers, automatic bollards, and FASTag parking systems.</p>',
      status: 'published',
    },
    {
      title: 'About Neptune Automatic',
      slug: 'why-neptune',
      template: 'default',
      contentHtml: '<h1>About Neptune Automatic Pvt. Ltd.</h1><p>30+ years of engineering excellence in perimeter defense, anti-ram barriers, and smart parking automation across India.</p>',
      status: 'published',
    },
    {
      title: 'Leadership & Engineering Team',
      slug: 'leadership',
      template: 'default',
      contentHtml: '<h1>Leadership Team</h1><p>Our visionary leaders and senior systems engineers driving indigenous defense and access automation innovations.</p>',
      status: 'published',
    },
    {
      title: 'Clientele & Landmark Deployments',
      slug: 'clientele',
      template: 'full-width',
      contentHtml: '<h1>Clientele & Landmark Projects</h1><p>Trusted by India’s foremost defense establishments, international airports, tech parks, and commercial plazas.</p>',
      status: 'published',
    },
    {
      title: 'Careers at Neptune',
      slug: 'careers',
      template: 'default',
      contentHtml: '<h1>Careers at Neptune Automatic</h1><p>Join India’s premier access control engineering force. Explore open engineering, sales, and field operations roles.</p>',
      status: 'published',
    },
    {
      title: 'Video Showcase',
      slug: 'videos',
      template: 'full-width',
      contentHtml: '<h1>Video Showcase</h1><p>Watch crash-rated physical impact tests, bollard deployments, and FASTag parking lanes in live operation.</p>',
      status: 'published',
    },
    {
      title: 'Contact & Corporate Headquarters',
      slug: 'contact',
      template: 'contact',
      contentHtml: '<h1>Contact Us</h1><p>Connect with our technical solution architects at Sector 63, Noida, NCR, India.</p>',
      status: 'published',
    },
    {
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      template: 'default',
      contentHtml: '<h1>Privacy Policy</h1><p>Neptune Automatic respects your corporate data privacy and adheres to international data protection standards.</p>',
      status: 'published',
    },
    {
      title: 'Terms and Conditions',
      slug: 'terms',
      template: 'default',
      contentHtml: '<h1>Terms and Conditions</h1><p>Official commercial supply, installation, warranty, and annual maintenance contract terms.</p>',
      status: 'published',
    },
  ];

  for (let i = 0; i < pagesData.length; i++) {
    const page = pagesData[i];
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {
        title: page.title,
        template: page.template,
        contentHtml: page.contentHtml,
        status: page.status,
        authorId: superAdmin.id,
        orderIndex: i,
      },
      create: {
        title: page.title,
        slug: page.slug,
        template: page.template,
        contentHtml: page.contentHtml,
        status: page.status,
        authorId: superAdmin.id,
        orderIndex: i,
      },
    });
  }

  // --------------------------------------------------------------------------
  // 7. NAVIGATION MENUS & MENU ITEMS
  // --------------------------------------------------------------------------
  console.log('👉 Seeding website menus...');

  // Primary Header Menu
  const primaryHeader = await prisma.menu.upsert({
    where: { slug: 'primary_header' },
    update: { name: 'Primary Header Navigation', location: 'primary_header' },
    create: {
      name: 'Primary Header Navigation',
      slug: 'primary_header',
      location: 'primary_header',
      isSystem: true,
    },
  });

  const headerItems = [
    { label: 'Home', url: '/', order: 0 },
    { label: 'Access Automation', url: '/access-automation/', order: 1 },
    { label: 'Access Control', url: '/access-control/', order: 2 },
    { label: 'Parking Systems', url: '/parking-management-systems/', order: 3 },
    { label: 'Accessories', url: '/accessories/', order: 4 },
    { label: 'Clientele', url: '/clientele/', order: 5 },
    { label: 'Blogs', url: '/blogs/', order: 6 },
    { label: 'About Us', url: '/why-neptune/', order: 7 },
    { label: 'Contact', url: '/contact/', order: 8 },
  ];

  for (const item of headerItems) {
    const existing = await prisma.menuItem.findFirst({
      where: { menuId: primaryHeader.id, label: item.label },
    });
    if (!existing) {
      await prisma.menuItem.create({
        data: {
          menuId: primaryHeader.id,
          label: item.label,
          url: item.url,
          orderIndex: item.order,
        },
      });
    }
  }

  // Footer Quick Links Menu
  const footerMenu = await prisma.menu.upsert({
    where: { slug: 'footer_quick_links' },
    update: { name: 'Footer Quick Links', location: 'footer_quick_links' },
    create: {
      name: 'Footer Quick Links',
      slug: 'footer_quick_links',
      location: 'footer_quick_links',
      isSystem: true,
    },
  });

  const footerItems = [
    { label: 'Corporate Overview', url: '/why-neptune/', order: 0 },
    { label: 'Executive Leadership', url: '/leadership/', order: 1 },
    { label: 'Client Landmark Deployments', url: '/clientele/', order: 2 },
    { label: 'Careers & Culture', url: '/careers/', order: 3 },
    { label: 'Video Showcase', url: '/videos/', order: 4 },
    { label: 'Engineering Blog & Whitepapers', url: '/blogs/', order: 5 },
    { label: 'Privacy Policy', url: '/privacy-policy/', order: 6 },
    { label: 'Terms & Conditions', url: '/terms/', order: 7 },
  ];

  for (const item of footerItems) {
    const existing = await prisma.menuItem.findFirst({
      where: { menuId: footerMenu.id, label: item.label },
    });
    if (!existing) {
      await prisma.menuItem.create({
        data: {
          menuId: footerMenu.id,
          label: item.label,
          url: item.url,
          orderIndex: item.order,
        },
      });
    }
  }

  // --------------------------------------------------------------------------
  // 8. FORMS & ENQUIRY ENGINE
  // --------------------------------------------------------------------------
  console.log('👉 Seeding forms and enquiry fields...');

  const generalForm = await prisma.form.upsert({
    where: { slug: 'contact-general' },
    update: {
      title: 'General Contact & Technical Enquiry',
      submitButtonText: 'Send Message',
    },
    create: {
      title: 'General Contact & Technical Enquiry',
      slug: 'contact-general',
      description: 'Primary inquiry channel for commercial proposals, site surveys, and product technical specifications.',
      submitButtonText: 'Send Message',
      successMessage: 'Thank you! Your inquiry has been routed to our technical systems team. We will respond within 2–4 business hours.',
      emailNotificationsJson: JSON.stringify(['info@neptuneautomatic.com', 'sales@neptuneautomatic.com']),
      isSpamProtected: true,
      status: 'active',
    },
  });

  const formFieldsData = [
    { label: 'Full Name', name: 'name', fieldType: 'text', isRequired: true, order: 0 },
    { label: 'Corporate Email', name: 'email', fieldType: 'email', isRequired: true, order: 1 },
    { label: 'Mobile / Telephone', name: 'phone', fieldType: 'tel', isRequired: true, order: 2 },
    { label: 'Company / Organization', name: 'company', fieldType: 'text', isRequired: false, order: 3 },
    { label: 'System Category', name: 'category', fieldType: 'select', isRequired: false, order: 4, options: ['Automatic Boom Barriers', 'Crash-Rated Bollards', 'FASTag Parking Systems', 'Pedestrian Flap Barriers', 'Tyre Killers / Road Blockers', 'Turnkey Integration'] },
    { label: 'Project Message / RFP Details', name: 'message', fieldType: 'textarea', isRequired: true, order: 5 },
  ];

  for (const f of formFieldsData) {
    const existing = await prisma.formField.findFirst({
      where: { formId: generalForm.id, name: f.name },
    });
    if (!existing) {
      await prisma.formField.create({
        data: {
          formId: generalForm.id,
          label: f.label,
          name: f.name,
          fieldType: f.fieldType,
          isRequired: f.isRequired,
          orderIndex: f.order,
          optionsJson: f.options ? JSON.stringify(f.options) : null,
        },
      });
    }
  }

  // Seed sample initial verified submissions
  const sampleSubmissions = [
    {
      name: 'Col. Rajesh Sharma (Retd.)',
      email: 'r.sharma@dlf-infra.in',
      phone: '+91 98110 54321',
      company: 'DLF CyberCity Developers',
      subject: 'Hostile Vehicle Mitigation for CyberHub Phase 3',
      message: 'Require site survey and official BOQ for 12 units of K12 crash-rated automatic hydraulic bollards with central master PLC control.',
      sourcePage: '/products/automatic-bollards/',
      status: 'pending',
    },
    {
      name: 'Ananya Deshmukh',
      email: 'ananya.d@gmrgroup.in',
      phone: '+91 99201 88765',
      company: 'GMR Airports Infrastructure',
      subject: 'FASTag RFID Multi-Lane Parking System Upgrade',
      message: 'Upgrading terminal 2 commercial parking lanes with integrated ANPR and FASTag ETC toll controllers. Need compliance datasheets.',
      sourcePage: '/parking-management-systems/',
      status: 'contacted',
      internalNotes: 'Contacted on phone. CAD drawings sent by Senior Architect on Nov 10.',
    },
  ];

  for (const s of sampleSubmissions) {
    const existing = await prisma.formSubmission.findFirst({
      where: { email: s.email, subject: s.subject },
    });
    if (!existing) {
      await prisma.formSubmission.create({
        data: {
          formId: generalForm.id,
          formSlug: 'contact-general',
          name: s.name,
          email: s.email,
          phone: s.phone,
          company: s.company,
          subject: s.subject,
          message: s.message,
          dataJson: JSON.stringify(s),
          sourcePage: s.sourcePage,
          status: s.status,
          internalNotes: s.internalNotes || null,
        },
      });
    }
  }

  // --------------------------------------------------------------------------
  // 9. WEBSITE SETTINGS & CONFIGURATION
  // --------------------------------------------------------------------------
  console.log('👉 Seeding global website settings...');

  const settingsData = [
    // General
    { key: 'site_name', value: 'Neptune Automatic Pvt. Ltd.', group: 'general', isPublic: true },
    { key: 'site_tagline', value: 'India’s Leading Provider of Access Automation & Perimeter Security', group: 'general', isPublic: true },
    { key: 'site_url', value: 'https://www.neptuneautomatic.com', group: 'general', isPublic: true },
    { key: 'contact_email', value: 'info@neptuneautomatic.com', group: 'general', isPublic: true },
    { key: 'contact_phone', value: '+91 8010 807 000', group: 'general', isPublic: true },
    { key: 'sales_phone', value: '+91 120 4567 890', group: 'general', isPublic: true },
    { key: 'office_address', value: 'Sector 63, Noida, NCR, Uttar Pradesh - 201301, India', group: 'general', isPublic: true },
    { key: 'working_hours', value: 'Mon - Sat: 9:00 AM - 6:30 PM IST', group: 'general', isPublic: true },
    { key: 'copyright_text', value: '© 2026 Neptune Automatic Pvt. Ltd. All Rights Reserved.', group: 'general', isPublic: true },

    // Header & Appearance
    { key: 'header_logo', value: '/assets/images/logo.png', group: 'header', isPublic: true },
    { key: 'header_announcement_enabled', value: 'true', group: 'header', isPublic: true },
    { key: 'header_announcement_text', value: '🚨 Pan-India Fast Track Deployment: K4/K12 Crash Bollards & FASTag RFID Plazas', group: 'header', isPublic: true },
    { key: 'header_sticky_enabled', value: 'true', group: 'header', isPublic: true },

    // Branding Colors
    { key: 'brand_color_primary', value: '#01358b', group: 'branding', isPublic: true },
    { key: 'brand_color_accent', value: '#D32628', group: 'branding', isPublic: true },
    { key: 'brand_color_cyan', value: '#56ACDD', group: 'branding', isPublic: true },
    { key: 'brand_font_family', value: "'Lexend', sans-serif", group: 'branding', isPublic: true },

    // Social Media
    { key: 'social_linkedin', value: 'https://www.linkedin.com/company/neptune-automatic/', group: 'footer', isPublic: true },
    { key: 'social_facebook', value: 'https://www.facebook.com/neptuneautomatic/', group: 'footer', isPublic: true },
    { key: 'social_twitter', value: 'https://twitter.com/neptuneauto', group: 'footer', isPublic: true },
    { key: 'social_youtube', value: 'https://www.youtube.com/@neptuneautomatic', group: 'footer', isPublic: true },

    // Technical Integrations
    { key: 'ga4_measurement_id', value: 'G-NEPTUNE2026', group: 'integrations', isPublic: false },
    { key: 'gtm_id', value: 'GTM-NAPL01', group: 'integrations', isPublic: false },
    { key: 'google_maps_embed', value: 'https://www.google.com/maps/embed?pb=...', group: 'integrations', isPublic: true },
    { key: 'recaptcha_site_key', value: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', group: 'integrations', isPublic: false },

    // Email SMTP
    { key: 'smtp_host', value: 'smtp.sendgrid.net', group: 'email', isPublic: false },
    { key: 'smtp_port', value: '587', group: 'email', isPublic: false },
    { key: 'smtp_user', value: 'apikey', group: 'email', isPublic: false },
    { key: 'smtp_sender_email', value: 'alerts@neptuneautomatic.com', group: 'email', isPublic: false },
    { key: 'smtp_sender_name', value: 'Neptune Automatic Security Gateway', group: 'email', isPublic: false },
  ];

  for (const s of settingsData) {
    await prisma.websiteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, group: s.group, isPublic: s.isPublic },
      create: s,
    });
  }

  // --------------------------------------------------------------------------
  // 10. SEO METADATA & REDIRECTS
  // --------------------------------------------------------------------------
  console.log('👉 Seeding global SEO metadata and redirects...');

  await prisma.seoMetadata.upsert({
    where: {
      entityType_entitySlug: {
        entityType: 'global',
        entitySlug: 'default',
      },
    },
    update: {},
    create: {
      entityType: 'global',
      entitySlug: 'default',
      title: 'Neptune Automatic | Premium Access Automation & Crash-Rated Perimeter Defense India',
      description: 'Neptune Automatic Pvt. Ltd. is India’s premier manufacturer and turnkey provider of automatic boom barriers, crash bollards, road blockers, and FASTag parking management systems.',
      focusKeyword: 'access automation india',
      canonicalUrl: 'https://www.neptuneautomatic.com/',
      robotsIndex: true,
      robotsFollow: true,
      ogTitle: 'Neptune Automatic | Access Automation & High Security Systems',
      ogDescription: 'Leading turnkey security perimeter automation manufacturer across India.',
      ogImage: '/assets/images/logo.png',
      ogType: 'website',
      twitterCard: 'summary_large_image',
    },
  });

  // Sample 301 redirects for legacy preservation
  const redirectsData = [
    { sourceUrl: '/about-us/', targetUrl: '/why-neptune/', statusCode: 301 },
    { sourceUrl: '/boom-barrier/', targetUrl: '/products/automatic-boom-barrier/', statusCode: 301 },
    { sourceUrl: '/bollards/', targetUrl: '/products/automatic-bollards/', statusCode: 301 },
    { sourceUrl: '/parking-system/', targetUrl: '/products/parking-management-system/', statusCode: 301 },
  ];

  for (const red of redirectsData) {
    await prisma.redirect.upsert({
      where: { sourceUrl: red.sourceUrl },
      update: { targetUrl: red.targetUrl, statusCode: red.statusCode },
      create: red,
    });
  }

  // --------------------------------------------------------------------------
  // 11. AUDIT LOG INITIAL ENTRY
  // --------------------------------------------------------------------------
  console.log('👉 Recording database provisioning audit log...');
  await prisma.auditLog.create({
    data: {
      userId: superAdmin.id,
      userName: superAdmin.name,
      action: 'SYSTEM_INITIALIZATION',
      entityType: 'database',
      detailsJson: JSON.stringify({
        message: 'Database schema provisioned and initialized with 93 products, 20 categories, 36 blog posts, 101 clients, and default RBAC roles.',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
      }),
    },
  });

  // Notification for dashboard
  await prisma.notification.create({
    data: {
      title: 'CMS Database Initialized',
      message: 'All 93 products, 36 articles, and 101 clients seeded successfully into SQLite / Prisma database.',
      type: 'success',
      link: '/admin',
    },
  });

  console.log('✅ Seeding completed successfully! Database is production-ready.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
