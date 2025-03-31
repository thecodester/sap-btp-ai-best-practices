import Navbar from "@/components/navigation/NavBar";
import PageViewTracker from "@/components/tracking/PageViewTracker";

export default async function RootPage() {
  return (
    <>
      <PageViewTracker featureName="HOME" />
      <Navbar />
      <section id="landing" className="p-0">
        <h1>Landing</h1>
      </section>
    </>
  );
}
