import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const SITE_URL = 'https://mohamedsejibouallegue.tech';
const DESCRIPTION =
  'Med Seji Bouallegue — software engineering student. Full-stack developer: Java/Spring, Python/FastAPI, React & Angular.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Med Seji Bouallegue',
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Med Seji Bouallegue',
    description: DESCRIPTION,
    siteName: 'Med Seji Bouallegue',
    images: [{ url: '/photo.png', width: 800, height: 800, alt: 'Med Seji Bouallegue' }],
  },
  twitter: {
    card: 'summary',
    title: 'Med Seji Bouallegue',
    description: DESCRIPTION,
    images: ['/photo.png'],
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Med Seji Bouallegue',
  url: SITE_URL,
  image: `${SITE_URL}/photo.png`,
  jobTitle: 'Software Engineering Student',
  email: 'mailto:MohamedSeji.Bouallegue@esprit.tn',
  address: { '@type': 'PostalAddress', addressLocality: 'Tunis', addressCountry: 'TN' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'ESPRIT' },
  sameAs: ['https://github.com/bouallegueMohamedSeji'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
