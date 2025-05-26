import Head from 'next/head'

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | AskYourContract.ai</title>
        <meta name="description" content="Read our privacy policy to understand how AskYourContract.ai handles your data and privacy." />
      </Head>
      <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-4">
          At AskYourContract.ai, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <p className="mb-4">
          We collect basic personal information such as your email address when you sign in, as well as documents you upload for analysis.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <p className="mb-4">
          Your data is used solely for providing you with document analysis services. We do not share or sell your information to third parties.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
        <p className="mb-4">
          We use modern security practices including Supabase authentication and secure document storage to protect your data.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Your Rights</h2>
        <p className="mb-4">
          You can request to delete your data at any time by contacting us.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Contact</h2>
        <p className="mb-4">
          If you have any questions about this policy, please reach out at contact@askyourcontractai.com.
        </p>

        <p className="mt-8 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} AskYourContract.ai. All rights reserved.
        </p>
      </main>
    </>
  )
}