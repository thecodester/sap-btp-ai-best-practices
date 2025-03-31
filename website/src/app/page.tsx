import Navbar from "@/components/navigation/NavBar";
import Landing from "@/components/sections/landing";

export async function generateMetadata() {
  return {
    metadataBase: new URL("https://sap-btp-ai-best-practices.com/"),
    title: "SAP BTP AI Best Practices",
    description: "Your Ultimate Guide for Building AI Solutions on BTP",
    openGraph: {
      images: "/images/thumbnail-en.jpg"
    },
    icons: {
      icon: "/images/icon.png",
      shortcut: "/images/icon.png",
      apple: "/images/icon.png"
    }
  };
}

export default async function RootPage() {
  return (
    <>
      <Navbar />
      <Landing />
    </>
  );
}
