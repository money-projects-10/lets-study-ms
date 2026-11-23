import React from 'react';
import { Link } from 'react-router-dom';
import InfoPage from '@/components/InfoPage';
import { institute, courses, SITE_URL } from '@/data/site';

const About = () => (
  <InfoPage
    path="/about"
    title="About Let's Study MS"
    metaTitle="About Let's Study MS | School of Mathematics, Kolkata"
    description="Let's Study MS is a mathematics institute in Khardaha, Kolkata, founded in 2022. Faculty from IIT, ISI and IISc prepare students for BSc, MSc, IIT JAM, ISI, TIFR and PhD entrances."
    eyebrow="Who we are"
    intro="A School of Mathematics in Khardaha, Kolkata, built by mathematicians from IIT, ISI and IISc to help students move from university mathematics to India's top research institutes."
    schema={{
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: "About Let's Study MS",
      url: `${SITE_URL}/about`,
      about: { '@id': `${SITE_URL}/#organization` },
    }}
  >
    <h2>Our story</h2>
    <p>
      {institute.shortName} started in {institute.foundingYear} with a simple aim: give students in West Bengal
      the same depth of mathematical training that students at IITs, ISI and IISc receive. Today we teach
      undergraduate, postgraduate and research-entrance mathematics from our centre in Khardaha, Kolkata, and
      online. We are affiliated with the {institute.affiliation}.
    </p>

    <h2>What we teach</h2>
    <ul>
      {courses.map((c) => (
        <li key={c.slug}>
          <Link to={c.path}>{c.name}</Link>: {c.summary}
        </li>
      ))}
      <li>
        <Link to="/contact">Personalised coaching</Link>: one-to-one mentorship tailored to a student's goals.
      </li>
    </ul>

    <h2>Our mentors</h2>
    <p>
      Our faculty studied and researched at IIT Kanpur, IIT Bombay, ISI Kolkata, ISI Delhi, IISc Bangalore and
      the IISERs, with ranks such as CSIR-NET AIR 6, GATE AIR 25 and JAM AIR 78. Several are alumni who now work
      in research and industry, and come back to mentor the next batch.
    </p>

    <h2>Results</h2>
    <p>
      Our students have gone on to ISI, IISc, TIFR, HRI, the IITs, the IISERs and PhD programmes abroad. Read
      their stories on our <Link to="/testimonials">success stories</Link> page.
    </p>

    <h2>School division</h2>
    <p>
      For students in Std 5–12, our sister institute <a href={institute.schoolDivision.url} target="_blank" rel="noopener noreferrer">{institute.schoolDivision.name}</a> offers
      CBSE, ICSE and WB Board coaching in micro-batches of 3–5 students.
    </p>

    <h2>Visit or contact us</h2>
    <p>
      {institute.address.street}, {institute.address.locality} - {institute.address.postalCode}, {institute.address.region}.
      <br />
      Phone: {institute.phones.map((p, i) => (
        <React.Fragment key={p}>{i > 0 && ', '}<a href={`tel:${p.replace(/-/g, '')}`}>{p.replace('+91-', '+91 ')}</a></React.Fragment>
      ))}
      <br />
      Email: <a href={`mailto:${institute.email}`}>{institute.email}</a>
    </p>
    <p>
      Or send an enquiry through our <Link to="/contact">contact page</Link>.
    </p>
  </InfoPage>
);

export default About;
