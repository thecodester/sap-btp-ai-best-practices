import Navbar from "@/components/navigation/NavBar";
import PageViewTracker from "@/components/tracking/PageViewTracker";

// export async function generateMetadata() {
//   return {
//     metadataBase: new URL(process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://sap-samples.github.io/sap-btp-ai-best-practices/"),
//     title: "SAP BTP AI Best Practices",
//     description: "Your Ultimate Guide for Building AI Solutions on BTP",
//     openGraph: {
//       images: ["/images/icon-square.png"]
//     },
//     icons: {
//       icon: [{ url: "/images/icon.png" }, { url: "/images/icon-square.png" }, { url: "/images/icon.svg" }],
//       shortcut: "/images/icon-square.png",
//       apple: "/images/icon-square.png"
//     }
//   };
// }

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
