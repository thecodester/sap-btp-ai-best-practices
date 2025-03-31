"use client";

import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faXTwitter, faYoutube, faThreads } from "@fortawesome/free-brands-svg-icons"; // Import the specific FontAwesome icon

const SocialButtons = () => {
	const t = useTranslations("Social");

	return (
		<div className="social-buttons">
			<a href={t("instagramUrl")} target="_blank" rel="noopener noreferrer">
				<FontAwesomeIcon icon={faInstagram} />
			</a>
			<a href={t("facebookUrl")} target="_blank" rel="noopener noreferrer">
				<FontAwesomeIcon icon={faFacebook} />
			</a>
			<a href={t("xUrl")} target="_blank" rel="noopener noreferrer">
				<FontAwesomeIcon icon={faXTwitter} />
			</a>
			<a href={t("youtubeUrl")} target="_blank" rel="noopener noreferrer">
				<FontAwesomeIcon icon={faYoutube} />
			</a>
			<a href={t("threadsUrl")} target="_blank" rel="noopener noreferrer">
				<FontAwesomeIcon icon={faThreads} />
			</a>
		</div>
	);
};

export default SocialButtons;
