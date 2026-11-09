import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_URL } from '@/data/site';

// Shared shell for the plain content pages (About, Terms, Privacy).
const InfoPage = ({ path, title, metaTitle, description, eyebrow, intro, updated, schema, children }) => {
  const url = `${SITE_URL}${path}`;
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: title, item: url },
    ],
  };

  return (
    <div className="noise-bg min-h-screen bg-background text-foreground flex flex-col">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
        {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
      </Helmet>

      <Header />

      <main className="flex-1">
        <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 px-4 border-b border-border overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-gold/15 rounded-full blur-[80px]" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto max-w-3xl text-center relative z-10"
          >
            {eyebrow && <p className="text-xs uppercase tracking-widest font-bold text-gold-ink">{eyebrow}</p>}
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight mt-3 text-foreground">{title}</h1>
            {intro && <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mt-5">{intro}</p>}
            {updated && <p className="text-xs text-muted-foreground mt-4">Last updated: {updated}</p>}
          </motion.div>
        </section>

        <article className="container mx-auto max-w-3xl px-4 py-12 md:py-16 prose-info">
          {children}
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default InfoPage;
