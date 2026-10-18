export interface Engagement {
  /** Photo file. Put your files in public/portraits/ and name them to match. */
  src: string;
  /** What is visible in the photo, for people using a screen reader. Keep it short and literal. */
  alt: string;
  /** Heading shown when the photo is opened. */
  title: string;
  /** The story behind the photo, shown when it is opened: where, what happened, why it stuck with you. */
  description: string;
}

const BASE = (import.meta.env as { BASE_URL?: string }).BASE_URL ?? "/";

// Replace the placeholder text below with your own. Order here is the order in the carousel.
export const engagements: Engagement[] = [
  {
    src: `${BASE}portraits/1.jpg`,
    alt: "Describe what is visible in photo 1",
    title: "iPBL 2026: Autonomous Quadruped Challenge",
    description:
      "Selected as one of the USJ-R representatives for the iPBL 2026, We were tasked to collaborate with students from Southern Taiwan University of Science and Technology and Osaka Institute of Technology to develop an autonomous quadruped robot that can navigate through a set course. My specific contributions were on the assembly and the code for the movement and navigation of the robot. Although it did not work as intended, we were able to learn a lot from the experience and still managed to win the Fastest Quadro Award.",
  },
  {
    src: `${BASE}portraits/2.jpg`,
    alt: "Describe what is visible in photo 2",
    title: "Cash 3.0 Hackathon 2026",
    description:
      "As a representative of USJ-R, Me and my team participated in the Cash 3.0 Hackathon 2026 held by Paytaca. We were tasked to develop a solution that incorporates CashScript technology to address a real-world problem. Our chosen topic was on Payroll Management, My specific contribution on this event was in the research and development of the solution, and a bit on the usage of CashScript technology. The event was a great experience and we were able to make it to the Top 6 teams and win the special award for Best Use of CashScript.",
  },
  {
    src: `${BASE}portraits/3.jpg`,
    alt: "Describe what is visible in photo 3",
    title: "CEISSAFP TECH DAY Ideathon Competition 2025",
    description:
      "This was an ideathon competition held by CEISSAFP in Manila, Philippines. In this event we presented our idea Project MARAHAS: Maritime Reconnaissance and Anomaly Hunting using AI Swarms. The idea was to use a swarm of AI-powered drones to monitor and detect anomalies in the maritime environment, such as illegal fishing or pollution without the need for deploying human resources. My specific contribution on this event was in the research and the presentation of the idea. We got so close to winning but ultimately won 1st runner-up.",
  },
  {
    src: `${BASE}portraits/4.jpg`,
    alt: "Describe what is visible in photo 4",
    title: "SCS Days Computer Quiz Bowl 2024",
    description:
      "As a first year student, we were paired with a second year student to compete. This was the first time I have entered a competition in coding and in college so the nerves were there. It was a two part competition, In the first part where we were asked questions related to computer science and in the second part there was an individual programming component where we were able to showcase our skills. It was overall a fun experience where my partner and I were able to win 1st runner-up in the competition.",
  },
  {
    src: `${BASE}portraits/5.jpg`,
    alt: "Describe what is visible in photo 5",
    title: "Adelante Cup 2026",
    description:
      "Aside from my studies, I also have a passion for sports, in this particular instance it was flag football. In this event we played alongside alumni's and fellow Josenians in a friendly competition. It was a great experience and learning point being able to play with and against people who have more experience than me in the sport. I was able to learn a lot from this event and it was a great bonding experience with my teammates.",
  },
];