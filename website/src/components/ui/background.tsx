"use client";

// import { Controller, Scene } from "react-scrollmagic";
import Image from "next/image";
import backgroundImage from "../../../public/images/background-clean.avif";
import backgroundMedos from "../../../public/images/background-medos.avif";

import { useScrollReveal } from "../../hooks/useScrollReveal";

const Background = () => {
	useScrollReveal({ onLoadSkipTriggerOffset: true });

	useScrollReveal({
		elementSelector: ".trigger-change-background",
		activeClass: "trigger-change-background__active",
		removeActiveClassOnExitViewport: true,
		revealTriggerOffset: 300,
		onEnterViewport: (element) => {
			const background = document.querySelector(".main-background");
			const backgroundMedos = document.querySelector(".main-background-medos");
			if (!background || !backgroundMedos) {
				return;
			}

			background.classList.add(`background__${element.id}`);
			backgroundMedos.classList.add(`background__${element.id}`);
		},
		onExitViewport: (element) => {
			const background = document.querySelector(".backgroundFadeIn");
			const backgroundMedos = document.querySelector(".main-background-medos");
			if (!background || !backgroundMedos) {
				return;
			}

			background.classList.remove(`background__${element.id}`);
			backgroundMedos.classList.remove(`background__${element.id}`);
		}
	});

	return (
		<>
			<div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: "-1", background: "#000" }}>
				<Image
					src={backgroundImage}
					alt="Background image"
					placeholder="blur"
					fill
					// sizes="100vw"
					objectFit="cover"
					className="main-background backgroundFadeIn"
					style={{ maxWidth: "100vw", maxHeight: "100vh", animation: "backgroundFadeIn 3s ease-in" }}
				/>

				<Image
					src={backgroundMedos}
					alt="Medos"
					fill
					// sizes="100vw"
					objectFit="cover"
					className="main-background-medos medosFadeIn"
					style={{ maxWidth: "100vw", maxHeight: "100vh", animation: "medosFadeIn 2s ease-out" }}
				/>
			</div>
		</>
	);
};

export default Background;
