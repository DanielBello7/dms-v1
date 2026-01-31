import { Link } from "react-router";
import { assets } from "@/config";

export const LegalPage = () => {
  return (
    <div className="min-h-svh bg-[#fef9f0]">
      <header className="border-b border-[#1e3a5f]/10 px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={assets.logo_01}
            alt="DMs"
            className="h-8 w-8 rounded-lg object-contain"
          />
          <span className="text-xl font-bold text-[#1e3a5f]">DMs</span>
        </Link>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Legal</h1>
        <p className="mt-1 text-[#5c6b73]">
          Terms of Service and Privacy Policy. Last updated: January 2025.
        </p>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-[#1e3a5f]">
            Terms of Service
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-[#5c6b73]">
            <li>
              Use DMs for private, lawful messaging. Don’t harass, spam, or
              break the law.
            </li>
            <li>
              You’re responsible for your account and what you send. Keep your
              credentials safe.
            </li>
            <li>
              We can suspend or end access if you violate these terms or misuse
              the service.
            </li>
            <li>
              We may update the service and these terms; we’ll notify you of
              important changes.
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-[#1e3a5f]">
            Privacy Policy
          </h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-[#5c6b73]">
            <li>
              We collect what’s needed to run your account: email, profile info,
              and message content.
            </li>
            <li>
              We don’t sell your data. We use it to provide and improve DMs and
              to comply with the law.
            </li>
            <li>
              We use industry-standard security and encryption to protect your
              data.
            </li>
            <li>
              You can request access to or deletion of your data by contacting
              us.
            </li>
          </ul>
        </section>

        <p className="mt-10 text-sm text-[#5c6b73]">
          Questions? Contact us at the support or contact option in the app.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block text-sm font-medium text-[#1e3a5f] hover:underline"
        >
          ← Back to home
        </Link>
      </main>
    </div>
  );
};
