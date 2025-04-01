import PageViewTracker from "@/components/tracking/PageViewTracker";

export default async function RootPage() {
  return (
    <>
      <PageViewTracker featureName="HOME" />
      <section id="landing" className="p-0">
        <h1>Landing</h1>
      </section>
    </>
  );
}
