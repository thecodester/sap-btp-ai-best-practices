import Landing from "@/components/sections/landing";
import { getTranslations } from "@/i18n";

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(t("baseUrl") as string),
    title: t("title"),
    description: t("description"),
    openGraph: {
      images: t("openGraph.images")
    },
    icons: {
      icon: "/images/icon.png",
      shortcut: "/images/icon.png",
      apple: "/images/icon.png"
    }
  };
}

const Page = async ({ params: { locale } }: PageProps) => {
  return (
    <div>
      <Landing />
    </div>
  );
};

export default Page;
