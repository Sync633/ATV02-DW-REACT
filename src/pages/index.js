import Head from "next/head";
import DealsContent from "@/components/DealsContent";

export default function Home() {
  return (
    <>
      <Head>
        <title>ATV-02 - Consumo de API em React</title>
        <meta name="description" content="Consumo de API no React" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <DealsContent />
      </main>
    </>
  );
}