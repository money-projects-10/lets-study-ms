// Single source of truth for facts about the institute.
// Plain ESM with no JSX so both the browser bundle and server.js (Node) can import it.

export const SITE_URL = 'https://letsstudyms.com';

export const institute = {
  name: "Let's Study MS - School of Mathematics",
  shortName: "Let's Study MS",
  description:
    "Mathematics institute in Khardaha, Kolkata (West Bengal) preparing students for BSc Honours, MSc entrances (IIT JAM, ISI, TIFR, NBHM, CMI), M.Tech / Data Science / MSc Economics entrances, engineering mathematics and PhD entrances. Faculty from IIT, ISI and IISc.",
  foundingYear: 2022,
  affiliation: 'Ramanujan School of Mathematics (RSM)',
  address: {
    street: '118/105, Rabindrapally, Khardaha',
    landmark: 'Near Maya Apartment, landmark: Rabindrapally Kali Mandir',
    locality: 'Kolkata',
    region: 'West Bengal',
    postalCode: '700117',
    country: 'IN',
  },
  geo: { latitude: 22.5744, longitude: 88.3629 },
  phones: ['+91-8777484102', '+91-8481819726'],
  email: 'letsstudy2022bu@gmail.com',
  social: {
    youtube: 'https://www.youtube.com/@LetsStudyMS',
    facebook: 'https://www.facebook.com/profile.php?id=61584835031140',
    instagram: 'https://www.instagram.com/the.ls2m',
    linkedin: 'https://www.linkedin.com/in/let-s-study-school-of-mathematics-3443073a4/',
    telegram: 'https://t.me/LetsstudySOM',
  },
  schoolDivision: {
    name: "Let's Study School",
    url: 'https://ls2mschool.com',
    summary: 'School coaching for Std 5–12 (CBSE, ICSE, WB Board) in micro-batches of 3–5 students.',
  },
};

export const courses = [
  {
    slug: 'foundation-batch',
    name: 'Foundation Batch',
    summary: 'Build strong mathematical fundamentals for undergraduate (BSc) studies.',
    audience: 'First-year BSc Mathematics students and anyone starting university mathematics.',
  },
  {
    slug: 'semester-batch',
    name: 'Semester Batch',
    summary: 'Targeted preparation for university semester examinations in BSc Mathematics.',
    audience: 'BSc Honours students preparing for semester exams.',
  },
  {
    slug: 'msc-mathematics',
    name: 'M.Sc Mathematics Entrances',
    summary: 'Coaching for MSc entrance exams: IIT JAM, ISI, TIFR, NBHM, CMI and university entrances.',
    audience: 'Final-year BSc students and graduates aiming for MSc programmes.',
  },
  {
    slug: 'mtech-datascience',
    name: 'M.Tech / Data Science / M.Sc Economics Entrances',
    summary: 'Preparation for interdisciplinary programmes such as ISI M.Tech, data science and MSQE / MSc Economics.',
    audience: 'Graduates targeting ISI, RKMVERI and similar interdisciplinary programmes.',
  },
  {
    slug: 'engineering-mathematics',
    name: 'Engineering Mathematics',
    summary: 'Comprehensive engineering mathematics for all branches.',
    audience: 'BTech / BE students.',
  },
  {
    slug: 'phd-entrances',
    name: 'PhD Entrances',
    summary: 'Advanced preparation for doctoral admissions: CSIR-NET, GATE, NBHM and institute interviews.',
    audience: 'MSc students and graduates aiming for PhD programmes.',
  },
  {
    slug: 'advanced-courses',
    name: 'Advanced Courses',
    summary: 'Specialised research-level topics for competitive and research excellence.',
    audience: 'Advanced MSc students and research aspirants.',
  },
].map((c) => ({ ...c, path: `/courses/${c.slug}`, url: `${SITE_URL}/courses/${c.slug}` }));

// Every page the app serves. server.js returns 404 for anything else.
export const pages = [
  { path: '/', title: "Let's Study MS | Top Math Institute in West Bengal" },
  { path: '/about', title: "About Let's Study MS" },
  { path: '/contact', title: "Contact Let's Study MS" },
  { path: '/testimonials', title: "Success Stories | Let's Study MS" },
  { path: '/login', title: "Study Material | Let's Study MS" },
  { path: '/terms', title: "Terms of Use | Let's Study MS" },
  { path: '/privacy', title: "Privacy Policy | Let's Study MS" },
  ...courses.map((c) => ({ path: c.path, title: `${c.name} | Let's Study MS` })),
];

export const contactText = () =>
  [
    `${institute.name}`,
    `Address: ${institute.address.street}, ${institute.address.locality} - ${institute.address.postalCode}, ${institute.address.region}, India (${institute.address.landmark})`,
    `Phone: ${institute.phones.join(', ')}`,
    `Email: ${institute.email}`,
    `Enquiry form: ${SITE_URL}/contact`,
  ].join('\n');

export const courseText = (c) =>
  `${c.name}\n${c.summary}\nFor: ${c.audience}\nDetails: ${c.url}`;
