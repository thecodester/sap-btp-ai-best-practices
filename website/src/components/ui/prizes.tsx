import Image from "next/image";

const Prizes = () => {
	return (
		<div className="prizes">
			<div className="btn-prize">
				<Image src={`/images/prizes/motelx2024_laurels-official_selection-white.avif`} alt="MotelX 2024 Official Selection" width={1772} height={552} />
			</div>
			<div className="btn-prize">
				<Image src={`/images/prizes/Fantasia2024-OfficialSelection-EN-darkmode.png`} alt="Fantasia 2024 Official Selection" width={1772} height={552} />
			</div>
			<div className="btn-prize">
				<Image
					src={`/images/prizes/OFFICIALSELECTION-LitScaresInternationalHorrorFestival-2024.avif`}
					alt="Lit Scares International Horror Festival 2024 Official Selection"
					width={1772}
					height={552}
				/>
			</div>
			<div className="btn-prize">
				<Image src={`/images/prizes/altff.avif`} alt="altff" width={1772} height={552} />
			</div>

			<div className="btn-prize">
				<Image src={`/images/prizes/crown.avif`} alt="crown" width={1772} height={552} />
			</div>
			<div className="btn-prize">
				<Image src={`/images/prizes/Liff.avif`} alt="Liff" width={1772} height={552} />
			</div>
			<div className="btn-prize">
				<Image src={`/images/prizes/Mokko.avif`} alt="Mokko" width={1772} height={552} />
			</div>
			<div className="btn-prize">
				<Image src={`/images/prizes/montevideo.avif`} alt="montevideo" width={1772} height={552} />
			</div>

			<div className="btn-prize">
				<Image src={`/images/prizes/NY.avif`} alt="NY" width={1772} height={552} />
			</div>
			<div className="btn-prize">
				<Image src={`/images/prizes/NYTristate.avif`} alt="NYTristate" width={1772} height={552} />
			</div>
			<div className="btn-prize">
				<Image src={`/images/prizes/stockholm.avif`} alt="stockholm" width={1772} height={552} />
			</div>
			<div className="btn-prize">
				<Image src={`/images/prizes/TIFA.avif`} alt="TIFA" width={1772} height={552} />
			</div>
		</div>
	);
};

export default Prizes;
