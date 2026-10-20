import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { CONTACT_EMAIL, OWNER_NAME } from "@/lib/site";
export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact MT Games to report a bug, ask a question or send feedback about Sky Ball: 3D Challenge.",
  alternates: { canonical: "/contact" },
};
export default function Contact() {
  return (
    <div className="prose-page">
      <h1>Contact {OWNER_NAME}</h1>
      <p>Found a bug, have a question or want to share feedback about Sky Ball? We would like to hear from you.</p>
      {CONTACT_EMAIL ? (
        <>
          <p className="text-lg">Email us at <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold">{CONTACT_EMAIL}</a></p>
          <h2>Send a message</h2>
          <p>Fill in the form and your email app will open with the message ready to send. Nothing is sent to our servers by this form.</p>
          <ContactForm to={CONTACT_EMAIL} />
          <h2>Reporting a bug?</h2>
          <p>Please tell us your device, your browser and which level you were on, and describe what happened. Screenshots help too.</p>
        </>
      ) : (
        <p>Our contact email address has not been published yet, so the message form is not available right now. Please check back soon.</p>
      )}
    </div>
  );
}
