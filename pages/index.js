import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Scida</title>
        <meta charset="utf-8" />
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
    </div>
  )
}
