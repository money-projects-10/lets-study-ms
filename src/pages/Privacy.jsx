import React from 'react';
import { Link } from 'react-router-dom';
import InfoPage from '@/components/InfoPage';
import { institute } from '@/data/site';

const Privacy = () => (
  <InfoPage
    path="/privacy"
    title="Privacy Policy"
    metaTitle="Privacy Policy | Let's Study MS"
    description="How Let's Study MS collects, uses and protects the information you share through letsstudyms.com."
    eyebrow="Legal"
    updated="8 November 2026"
  >
    <p>
      This policy explains what information {institute.name} collects through letsstudyms.com and how we use it.
    </p>

    <h2>What we collect</h2>
    <ul>
      <li>
        <strong>Enquiry form.</strong> When you use the <Link to="/contact">contact form</Link> we receive your name,
        email address, phone number, current university, the batch you are interested in and your message.
      </li>
      <li>
        <strong>Messages you start.</strong> If you contact us by phone, email or WhatsApp, we receive whatever
        you send us there.
      </li>
      <li>
        <strong>Technical data.</strong> Our hosting provider records standard server logs (such as IP address,
        browser type and pages requested) to keep the website secure and running.
      </li>
    </ul>
    <p>We do not use advertising trackers, and we do not sell your information.</p>

    <h2>How we use it</h2>
    <p>
      We use enquiry details only to reply to you, advise you on batches, and arrange admission if you choose to
      join. We may contact you by phone, email or WhatsApp about your enquiry.
    </p>

    <h2>Where it is stored</h2>
    <p>
      Enquiry form submissions are stored in a Google Sheet that only our team can access, through Google Apps
      Script. The website is hosted by Hostinger. Fonts are loaded from Google Fonts, and some images and maths
      rendering scripts load from third-party content networks; those providers may see your IP address.
    </p>

    <h2>How long we keep it</h2>
    <p>
      We keep enquiry details for as long as needed to respond and, if you enrol, for the duration of your course
      and a reasonable period afterwards. You can ask us to delete them at any time.
    </p>

    <h2>Your choices</h2>
    <p>
      You can ask to see, correct or delete the information we hold about you, or ask us to stop contacting you,
      by writing to <a href={`mailto:${institute.email}`}>{institute.email}</a>. We handle personal data in line
      with India's Digital Personal Data Protection Act, 2023.
    </p>

    <h2>Children</h2>
    <p>
      Our higher-education courses are for university students and graduates. If you are under 18, please ask a
      parent or guardian to contact us on your behalf.
    </p>

    <h2>Changes</h2>
    <p>
      We may update this policy; the date above shows the latest version. See also our <Link to="/terms">terms of use</Link>.
    </p>
  </InfoPage>
);

export default Privacy;
