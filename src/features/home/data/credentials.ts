export interface Education {
  school: string;
  /** e.g. "Bachelor of Science in Information Technology" */
  degree: string;
  /** e.g. "2023 to present" */
  period: string;
  /** Shown under the period. Remove the line in the section if you don't want it. */
  status: string;
  /**
   * Optional short lines shown as a list. Leave empty to hide the list.
   * Ideas: expected graduation, relevant coursework, honors (Dean's list, scholarships),
   * a capstone or thesis title, student organizations you belong to.
   */
  highlights: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  /** e.g. "March 2025" */
  issued: string;
  /** Optional. Adds a "Verify" link to the issuer's verification page. */
  verifyUrl?: string;
  qrSrc?: string;
  imageSrc?: string;
}

const BASE = (import.meta.env as { BASE_URL?: string }).BASE_URL ?? "/";

// Replace the placeholder text below with your own.
export const education: Education = {
  school: "University of San Jose - Recoletos",
  degree: "Bachelor of Science in Information Technology",
  period: "2023 to present",
  status: "Currently enrolled",
  highlights: ["Major: Mobile Application Development", "Capstone Project: Cont/x - A Low-Level Keyboard-Hook Lockdown and On-Device Compiler-Based Assessment Engine for Secure Programming Exams", "Relevant Coursework: Web Application Development, Information Management, Information Assurance and Security, Networking"],
};

// Order here is the order on the page. Delete the examples you don't need.
export const certifications: Certification[] = [
  {
    title: "AI Fundamentals: Language and Vision in AI",
    issuer: "Cisco Networking Academy in collaboration with IBM SkillsBuild",
    issued: "October 2026",
    verifyUrl: "https://www.credly.com/badges/4dd416af-2e59-486c-8f00-29bdfa716fe5/public_url",
    qrSrc: `${BASE}certificates/6.jpg`,
  },
  {
    title: "AI Fundamentals: Foundations for Understanding AI",
    issuer: "Cisco Networking Academy in collaboration with IBM SkillsBuild",
    issued: "October 2026",
    verifyUrl: "https://www.credly.com/badges/e35b9acb-06dc-4c82-a208-356b7a98bddb/public_url",
    qrSrc: `${BASE}certificates/5.jpg`,
  },
  {
    title: "Operating Systems Basics",
    issuer: "Cisco Networking Academy",
    issued: "October 2026",
    verifyUrl: "https://www.credly.com/badges/eaf2ca98-63ae-4154-b384-ed77b7fa98fb/public_url",
    qrSrc: `${BASE}certificates/4.jpg`,
  },
  {
    title: "Linux Unhatched",
    issuer: "Cisco Networking Academy in collaboration with NDG",
    issued: "September 2026",
    verifyUrl: "https://www.credly.com/badges/934b6926-a56b-4118-854a-1937239bcaac/public_url",
    qrSrc: `${BASE}certificates/3.jpg`,
  },
  {
    title: "Introduction to Modern AI",
    issuer: "Cisco Networking Academy",
    issued: "September 2026",
    verifyUrl: "https://www.credly.com/badges/762bed38-11bd-4409-81bf-8aea94df7b91/public_url",
    qrSrc: `${BASE}certificates/2.jpg`,
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    issued: "September 2026",
    verifyUrl: "https://www.credly.com/badges/bcdabd87-e327-49ca-a559-57e02899fd40/public_url",
    qrSrc: `${BASE}certificates/1.jpg`,
  },
  {
    title: "Test of Practical Competency in ICT (TopCIT) Level 2",
    issuer: "Institute for Information & Communications Technology Promotion (IITP)",
    issued: "July 2026",
    imageSrc: `${BASE}certificates/7.jpg`,
  }
];