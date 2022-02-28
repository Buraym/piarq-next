import Head from "next/head";

interface Params {
  title: string;
  icon?: string;
}

export default function NextHead({ title, icon }: Params) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href={icon} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
}
