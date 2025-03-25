import { getTranslations } from "@/i18n";
import i18nextConfig from "../../next-i18next.config";

import LanguageRedirect from "@/lib/languageRedirect";

export async function generateMetadata() {
	const t = await getTranslations({ locale: i18nextConfig.i18n.defaultLocale, namespace: "Metadata" });

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

export default async function RootPage() {
	return <LanguageRedirect />;
}
