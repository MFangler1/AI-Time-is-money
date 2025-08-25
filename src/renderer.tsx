import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>AI Time is Money - Affordable AI Solutions for SMEs & Non-Profits | AiConsultancy.org.uk</title>
        <meta name="description" content="Transform your business with AI automation. Get a comprehensive AI assessment report for just £9.99 (SMEs) or £4.99 (non-profits). Save thousands of pounds and hours every month with proven AI solutions." />
        <meta name="keywords" content="AI automation, SME AI solutions, non-profit AI, business automation, AI consulting, cost savings, time savings, chatbots, email automation" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aitimeismoney.pages.dev/" />
        <meta property="og:title" content="AI Time is Money - Affordable AI Solutions" />
        <meta property="og:description" content="Get your AI assessment report and discover how to save thousands with proven AI automation solutions." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="AI Time is Money - Affordable AI Solutions" />
        <meta property="twitter:description" content="Transform your business with AI automation. Assessment reports from £4.99." />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        
        {/* Styles */}
        <link href="/css/styles.css" rel="stylesheet" />
        
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤖</text></svg>" />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "AiConsultancy.org.uk",
          "url": "https://aiconsultancy.org.uk",
          "logo": "https://aiconsultancy.org.uk/logo.png",
          "description": "Promoting affordable AI solutions for social good",
          "serviceType": "AI Consulting and Automation Services",
          "areaServed": "Worldwide",
          "offers": {
            "@type": "Offer",
            "name": "AI Assessment Report",
            "description": "Comprehensive AI implementation roadmap for businesses",
            "price": "9.99",
            "priceCurrency": "GBP"
          }
        })}
        </script>
      </head>
      <body>
        {children}
        
        {/* JavaScript */}
        <script src="/js/main.js"></script>
        
        {/* Analytics placeholder */}
        <script>
          console.log('Analytics tracking would be initialized here');
        </script>
      </body>
    </html>
  )
})
