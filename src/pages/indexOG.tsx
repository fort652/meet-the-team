import { useEffect } from "react";

const Home: React.FC = () => {
	const numImages = 8;
	const angle =
		360 / numImages; // Evenly spaced rotation angle
	const translateZDistance =
		300 /
		(2 *
			Math.tan(
				Math.PI / numImages
			)); // Dynamically calculated to close the gap

	useEffect(() => {
		const audio =
			document.getElementById(
				"background-audio"
			) as HTMLAudioElement;
		audio.volume = 0.1; // Set to a soft volume

		function attemptPlayAudio() {
			audio
				.play()
				.catch(() => {
					setTimeout(
						attemptPlayAudio,
						1000
					);
				});
		}

		window.addEventListener(
			"load",
			attemptPlayAudio
		);

		return () => {
			window.removeEventListener(
				"load",
				attemptPlayAudio
			);
		};
	}, []);

	return (
		<>
			<div className="box">
				{[
					...Array(numImages),
				].map((_, i) => (
					<span
						key={i}
						style={
							{
								"--i": i + 1,
								transform: `rotateY(${
									i * angle
								}deg) translateZ(${translateZDistance}px)`,
							} as React.CSSProperties
						}>
						<img
							src={`/images/p${
								i + 1
							}.jpeg`}
							alt={`Image ${
								i + 1
							}`}
						/>
					</span>
				))}
			</div>

			<audio
				id="background-audio"
				src="/sound/inspirational-uplifting-calm-piano.mp3"
				loop
			/>
		</>
	);
};

export default Home;
