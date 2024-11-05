import {
	useEffect,
	useState,
} from "react";
import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
	Typography,
} from "@mui/material";

const Home: React.FC = () => {
	const numImages = 8;
	const angle =
		360 / numImages;
	const translateZDistance =
		300 /
		(2 *
			Math.tan(
				Math.PI / numImages
			));
	const [open, setOpen] =
		useState(true);

	// Start audio and enable rotation when user clicks "Meet the Team"
	const startAudio = () => {
		const audio =
			document.getElementById(
				"background-audio"
			) as HTMLAudioElement;
		audio.volume = 1;
		audio
			.play()
			.catch((error) =>
				console.log(
					"Autoplay blocked:",
					error
				)
			);
		setOpen(false); // Close dialog and enable rotation
	};

	useEffect(() => {
		if (!open) {
			const audio =
				document.getElementById(
					"background-audio"
				) as HTMLAudioElement;
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
		}
	}, [open]);

	return (
		<>
			<Box
				sx={{
					display: "flex",
					justifyContent:
						"center",
					alignItems:
						"center",
					minHeight: "100vh",
					background:
						"linear-gradient(150deg, #c4ab6c, #383840)",
					perspective:
						"1000px",
					filter: open
						? "blur(5px)"
						: "none",
				}}>
				<Box
					className="box"
					sx={{
						position:
							"relative",
						width: "180px",
						height: "300px",
						transformStyle:
							"preserve-3d",
						animation: open
							? "none"
							: "animate 30s linear infinite",
						"&:hover": {
							animationPlayState:
								"paused",
						},
						"@keyframes animate":
							{
								"0%": {
									transform:
										"rotateY(0deg)",
								},
								"100%": {
									transform:
										"rotateY(360deg)",
								},
							},
					}}>
					{[
						...Array(
							numImages
						),
					].map((_, i) => (
						<Box
							key={i}
							component="span"
							sx={{
								position:
									"absolute",
								top: 0,
								left: 0,
								width: "100%",
								height:
									"100%",
								transformOrigin:
									"center",
								transformStyle:
									"preserve-3d",
								transform: `rotateY(${
									i * angle
								}deg) translateZ(${translateZDistance}px)`,
								WebkitBoxReflect:
									"below 2px linear-gradient(transparent, transparent, rgba(4, 4, 4, 0.267))",
							}}>
							<Box
								component="img"
								src={`/images/p${
									i + 1
								}.jpeg`}
								alt={`Image ${
									i + 1
								}`}
								sx={{
									position:
										"absolute",
									top: 0,
									left: 0,
									width:
										"100%",
									height:
										"100%",
									transition:
										"0.5s",
									borderRadius:
										"15px",
									border:
										"4px double #383840",
									"&:hover": {
										transform:
											"translateY(-10px)",
									},
								}}
							/>
						</Box>
					))}
				</Box>
			</Box>

			<audio
				id="background-audio"
				src="/sound/inspirational-uplifting-calm-piano.mp3"
				loop
			/>

			{/* Dialog Component */}
			<Dialog
				open={open}
				onClose={() =>
					setOpen(false)
				}
				PaperProps={{
					sx: {
						backgroundColor:
							"#383840",
						color: "#c4ab6c",
						borderRadius:
							"15px",
						border:
							"2px solid #c4ab6c",
						padding: 2,
					},
				}}>
				<DialogTitle>
					<Typography
						variant="h5"
						color="#c4ab6c"
						align="center"
						sx={{
							fontWeight:
								"bold",
						}}>
						Meet the Team
					</Typography>
				</DialogTitle>
				<DialogContent>
					<DialogContentText
						sx={{
							color:
								"#e0cfa9",
							fontSize:
								"1.1rem",
							textAlign:
								"center",
						}}>
						Our team is a
						group of
						passionate,
						talented, and
						innovative
						individuals who
						work tirelessly to
						bring amazing
						ideas to life.
						Each member brings
						unique strengths,
						collaborating
						seamlessly to
						create experiences
						that are both
						impactful and
						inspiring. We’re
						excited to share
						our journey with
						you!
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={
							startAudio
						}
						sx={{
							color:
								"#383840",
							backgroundColor:
								"#c4ab6c",
							":hover": {
								backgroundColor:
									"#e0cfa9",
							},
							fontWeight:
								"bold",
							borderRadius:
								"10px",
							width: "100%",
						}}>
						Meet the Team
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default Home;
