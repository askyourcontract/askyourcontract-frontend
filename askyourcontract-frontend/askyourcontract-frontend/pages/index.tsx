import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>AskYourContract</title>
      </Head>
      <main className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-900">AskYourContract.ai</h1>
          <p className="mt-4 text-gray-600">Upload and understand legal documents instantly with AI</p>
        </div>
      </main>
    </>
  );
}
