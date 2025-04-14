import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import clsx from "clsx";
import type { ReactNode } from "react";
import styles from "./styles.module.css";

type SectionItem = {
  title: string;
  description: ReactNode;
  link: string;
  icon: ReactNode;
  color: string;
};

const SectionList: SectionItem[] = [
  {
    title: "Functional View",
    description: (
      <>
        Navigate an organized view of AI capabilities and patterns describing what AI can functionally do in the context of an AI use-case. Find the related Best Practices for
        implementing them.
      </>
    ),
    link: "/docs/category/functional-view",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4L4 14V34L24 44L44 34V14L24 4Z" fill="currentColor" fillOpacity="0.1" />
        <path d="M24 4L4 14V34L24 44L44 34V14L24 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 4V44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 14L44 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 34L44 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "#0A6ED1"
  },
  {
    title: "Technical View",
    description: <>Navigate the implementation Best Practices based on a structured and consistent view of technical requirements and solutions.</>,
    link: "/docs/category/technical-view",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8H40V40H8V8Z" fill="currentColor" fillOpacity="0.1" />
        <path d="M8 8H40V40H8V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 16H32V32H16V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 8V40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 24H40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "#0A6ED1"
  }
];

function Section({ title, description, link, icon, color }: SectionItem) {
  return (
    <div className={clsx("col col--6", styles.section)}>
      <Link to={link} className={styles.sectionLink}>
        <div className={styles.sectionContent} style={{ "--sap-color": color } as React.CSSProperties}>
          <div className={styles.icon}>{icon}</div>
          <div className={styles.textContent}>
            <Heading as="h2" className={styles.title}>
              {title}
            </Heading>
            <p className={styles.description}>{description}</p>
            <div className={styles.ctaLink}>
              Explore {title}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrow}>
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageSections(): ReactNode {
  return (
    <section className={styles.sections}>
      <div className="container" style={{ marginBottom: "150px" }}>
        <div className="row">
          <div className="col col--12">
            <div className={styles.taglineWrapper}>
              <p className={styles.tagline}>From intelligent capabilities to implementation-ready guidance, discover a seamless connection between concept and execution.</p>
            </div>
          </div>
          <div className="col col--12">
            <Heading as="h2" className={styles.sectionTitle}>
              Choose your path:
            </Heading>
          </div>
        </div>
        <div className="row">
          {SectionList.map((props, idx) => (
            <Section key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
