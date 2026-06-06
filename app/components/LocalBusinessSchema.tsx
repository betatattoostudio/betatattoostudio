const siteUrl = 'https://betatattoostudio.com';

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Beta Tattoo Studio',
  url: siteUrl,
};

const navSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Site Navigasyonu',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Sanatçı',
      description: 'Realism, color realism ve black & grey uzmanı dövme sanatçımızla tanışın.',
      url: `${siteUrl}/#artist`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Galeri',
      description: 'Tamamlanan dövme çalışmalarından oluşan fotoğraf galerisi.',
      url: `${siteUrl}/#board`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Dövme Stilleri',
      description: 'Realism, color realism, black & grey ve cover-up dövme stilleri.',
      url: `${siteUrl}/#styles`,
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Süreç',
      description: 'Fikirden mürekkebe: dövme randevu ve uygulama süreci.',
      url: `${siteUrl}/#process`,
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: 'İletişim & Randevu',
      description: 'Instagram DM veya WhatsApp üzerinden randevu alın.',
      url: `${siteUrl}/#contact`,
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Nasıl randevu alabilirim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Instagram DM üzerinden @betatattoo.studio hesabımıza ulaşabilirsiniz. Fikrinizi, referans görsellerinizi ve istediğiniz bölge bilgisini paylaşmanız süreci hızlandırır.',
      },
    },
    {
      '@type': 'Question',
      name: 'Tasarımımı kendim getirebilir miyim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evet. Referans olarak getirdiğiniz görseller üzerinden birlikte özgün bir tasarım çıkartırız. Birebir kopya çalışmıyoruz; tasarım her zaman size özel.',
      },
    },
    {
      '@type': 'Question',
      name: 'Seans ne kadar sürer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Boyuta ve detaya göre değişir. Küçük bir çalışma 1-2 saat sürebilirken, büyük ve detaylı işler 4-6 saati bulabilir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Fiyatlar nasıl belirleniyor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Boyut, detay düzeyi ve uygulanacak bölge fiyatı belirler. Net teklif için DM üzerinden referans ve ölçü paylaşmanız yeterli.',
      },
    },
    {
      '@type': 'Question',
      name: 'Seans için nasıl hazırlanmalıyım?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bol su için, tok gelin, rahat ve bölgeye erişimi kolay kıyafet giyin. Seans öncesi alkol ve kan sulandırıcılardan uzak durun.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kaç seansda tamamlanır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Küçük ve orta ölçekli işler genellikle tek seansta biter. Büyük kompozisyonlar (kol, sırt vb.) birden fazla seansa yayılabilir.',
      },
    },
  ],
};

export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TattooParlor',
    name: 'Beta Tattoo Dövme ve Piercing Studio',
    alternateName: 'Beta Tattoo Studio',
    url: siteUrl,
    telephone: '+905369410087',
    image: `${siteUrl}/og-image.jpg`,
    description:
      "Maltepe'de realism, color realism, black & grey ve cover-up uzmanı dövme stüdyosu. Her tasarım sıfırdan, sana özel hazırlanır.",
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        'A Kapısı Girişi Karşısı, Cevizli Mah., Zuhal Cad. No:46/1, Ritim İstanbul Sitesi, A1 Ticari Blok, Ofis No:368',
      addressLocality: 'Maltepe',
      addressRegion: 'İstanbul',
      postalCode: '34846',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.9224,
      longitude: 29.1577,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '12:00',
        closes: '21:30',
      },
    ],
    priceRange: '₺₺',
    currenciesAccepted: 'TRY',
    paymentAccepted: 'Cash, Credit Card',
    sameAs: [
      'https://instagram.com/betatattoo.studio',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '129',
      bestRating: '5',
      worstRating: '1',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Dövme ve Piercing Hizmetleri',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Realism Dövme',
            description: 'Fotoğraf gerçekliğinde, derinlikli ve dokulu dövme çalışmaları.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Color Realism Dövme',
            description: 'Canlı, kalıcı renkler; modern pigmentlerle yıllara dayanan parlaklık.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Black & Grey Dövme',
            description: 'Klasik, zamansız gölge dili; yumuşak geçişler ve güçlü kontrast.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cover Up Dövme',
            description: 'Eski dövmeleri yeniden tasarlayarak sevilen eserlere dönüştürme.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Minimal & Fine Line Dövme',
            description: 'Sade, net ve anlamı yüksek ince çizgi dövme çalışmaları.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Piercing',
            description: 'Profesyonel piercing uygulaması, steril ortam ve premium ekipman.',
          },
        },
      ],
    },
    employee: [
      {
        '@type': 'Person',
        name: 'Hakan',
        jobTitle: 'Realism & Black/Grey Dövme Sanatçısı',
        description: '10+ yıl deneyimli realism ve black & grey dövme sanatçısı.',
        worksFor: {
          '@type': 'TattooParlor',
          name: 'Beta Tattoo Studio',
        },
      },
      {
        '@type': 'Person',
        name: 'Merve',
        jobTitle: 'Fine Line & Minimalist Dövme Sanatçısı',
        description: 'İnce çizgi ve minimalist tarzda uzmanlaşmış dövme sanatçısı.',
        worksFor: {
          '@type': 'TattooParlor',
          name: 'Beta Tattoo Studio',
        },
      },
      {
        '@type': 'Person',
        name: 'Erdinç',
        jobTitle: 'Color Realism & Cover-Up Uzmanı',
        description: 'Renk gerçekçiliği ve kapama dövmelerinde uzman sanatçı.',
        worksFor: {
          '@type': 'TattooParlor',
          name: 'Beta Tattoo Studio',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
