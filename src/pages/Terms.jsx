import React from 'react';
import { Link } from 'react-router-dom';
import InfoPage from '@/components/InfoPage';
import { institute } from '@/data/site';

const Terms = () => (
  <InfoPage
    path="/terms"
    title="Terms of Use"
    metaTitle="Terms of Use | Let's Study MS"
    description="Terms of use for the Let's Study MS website, study material and enquiries."
    eyebrow="Legal"
    updated="8 November 2026"
  >
    <p>
      These terms apply to your use of letsstudyms.com (the "website"), run by {institute.name} ("we", "us"),
      {' '}{institute.address.street}, {institute.address.locality} - {institute.address.postalCode}, {institute.address.region}, India.
      By using the website you agree to them.
    </p>

    <h2>Information on this website</h2>
    <p>
      We try to keep course details, schedules, results and faculty information accurate and current, but they
      may change. Admission, fees and batch timings are confirmed only when you speak to us directly. Results
      shown are those of past students and are not a guarantee of any individual outcome.
    </p>

    <h2>Study material</h2>
    <p>
      Notes, videos, problem sets and other material we share are for your personal, non-commercial study.
      Please do not resell, republish or redistribute them without our written permission. Links to past exam
      papers point to the bodies that publish them, and those papers remain theirs.
    </p>

    <h2>Enquiries</h2>
    <p>
      When you send an enquiry, please give accurate details so we can reply. How we handle those details is
      described in our <Link to="/privacy">privacy policy</Link>.
    </p>

    <h2>Fees and enrolment</h2>
    <p>
      Fees, payment schedules and refund terms for a batch are shared with you before you enrol and form part of
      your agreement with us for that batch.
    </p>

    <h2>Other websites</h2>
    <p>
      The website links to other sites, such as YouTube, WhatsApp, Instagram and our school division at
      {' '}<a href={institute.schoolDivision.url} target="_blank" rel="noopener noreferrer">ls2mschool.com</a>.
      We are not responsible for the content or policies of sites we do not run.
    </p>

    <h2>Acceptable use</h2>
    <p>
      Do not misuse the website, for example by trying to break its security, overload it, or submit content that
      is unlawful or abusive. Automated agents may read public pages, subject to our robots.txt.
    </p>

    <h2>Liability</h2>
    <p>
      The website is provided "as is". To the extent the law allows, we are not liable for indirect losses arising
      from its use. Nothing in these terms limits rights you have under Indian consumer law.
    </p>

    <h2>Changes and governing law</h2>
    <p>
      We may update these terms; the date above shows the latest version. These terms are governed by the laws of
      India, and the courts of Kolkata, West Bengal have jurisdiction.
    </p>

    <h2>Contact</h2>
    <p>
      Questions about these terms: <a href={`mailto:${institute.email}`}>{institute.email}</a> or our <Link to="/contact">contact page</Link>.
    </p>
  </InfoPage>
);

export default Terms;
