import PageViewTracker from "@/components/tracking/PageViewTracker";

export async function generateMetadata() {
  return {
    title: "About - SAP BTP AI Best Practices",
    description: "Learn more about SAP BTP AI Best Practices and how to implement them in your projects."
  };
}

export default async function AboutPage() {
  return (
    <>
      <PageViewTracker featureName="ABOUT" />
      <section id="landing" className="p-0">
        <h1>About</h1>
      </section>
    </>
  );
}
