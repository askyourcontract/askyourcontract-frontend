import Head from 'next/head'

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Terms of Service | AskYourContract.ai</title>
        <meta name="description" content="Read the terms and conditions of using AskYourContract.ai and our services." />
      </Head>
      <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

        <p className="mb-4">
          By accessing or using AskYourContract.ai, you agree to be bound by these Terms of Service. Please read them carefully.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of Services</h2>
        <p className="mb-4">
          AskYourContract.ai provides document analysis using AI technologies. You agree to use this service only for lawful purposes.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. User Responsibilities</h2>
        <p className="mb-4">
          You are responsible for any documents you upload. Do not upload sensitive personal data or documents you are not authorized to use.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Intellectual Property</h2>
        <p className="mb-4">
          All branding, content, and software used on this site are the property of AskYourContract.ai or its licensors.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Disclaimers</h2>
        <p className="mb-4">
          The AI-powered results are provided for informational purposes only and do not constitute legal advice. Always consult a legal professional for serious matters.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Termination</h2>
        <p className="mb-4">
          We reserve the right to suspend or terminate access to our services for violations of these terms.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Contact</h2>
        <p className="mb-4">
          For any questions or concerns, please email us at contact@askyourcontractai.com.
        </p>

        <p className="mt-8 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} AskYourContract.ai. All rights reserved.
        </p>
      </main>
    </>
  )
}