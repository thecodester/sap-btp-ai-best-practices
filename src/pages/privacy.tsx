import Heading from "@theme/Heading";
import Layout from "@theme/Layout";

export default function Privacy() {
  return (
    <Layout title="Privacy" description="Privacy Page">
      <main className="container container--fluid margin-vert--lg">
        <div className="container">
          <Heading as="h1">Privacy</Heading>
          <p>
            This site is hosted by{" "}
            <a href="https://pages.github.com/" target="_blank" rel="noopener noreferrer">
              GitHub Pages
            </a>
            . Please see the{" "}
            <a href="https://docs.github.com/en/github/site-policy/github-privacy-statement" target="_blank" rel="noopener noreferrer">
              GitHub Privacy Statement
            </a>{" "}
            for any information how GitHub processes your personal data.
          </p>
        </div>
      </main>
    </Layout>
  );
}
