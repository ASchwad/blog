import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const meta = {
    title: "Alexander Schoenenwald",
    description: "Software Engineer at Palantir. Excited about end-to-end feature design and implementation.",
    image: "https://avatars.githubusercontent.com/u/33654656?v=4",
  };

  return (
    <Html lang="en">
      <Head>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
