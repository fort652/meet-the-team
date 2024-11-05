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
	Container,
	IconButton,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";

interface Person {
	id: number;
	name: string;
	description: string;
	image: string;
}

const team: Person[] = [
	{
		id: 1,
		name: "Person 1",
		description:
			"This is person 1's description.",
		image: "/images/p1.jpeg",
	},
	{
		id: 2,
		name: "Person 2",
		description:
			"This is person 2's description.",
		image: "/images/p2.jpeg",
	},
	{
		id: 3,
		name: "Person 3",
		description:
			"This is person 3's description.",
		image: "/images/p3.jpeg",
	},
	{
		id: 4,
		name: "Person 4",
		description:
			"This is person 4's description.",
		image: "/images/p4.jpeg",
	},
	{
		id: 5,
		name: "Person 5",
		description:
			"This is person 5's description.",
		image: "/images/p5.jpeg",
	},
	{
		id: 6,
		name: "Person 6",
		description:
			"This is person 6's description.",
		image: "/images/p6.jpeg",
	},
	{
		id: 7,
		name: "Person 7",
		description:
			"This is person 7's description.",
		image: "/images/p7.jpeg",
	},
	{
		id: 8,
		name: "Person 8",
		description:
			"This is person 8's description.",
		image: "/images/p8.jpeg",
	},
];

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
	const [
		hoveredIndex,
		setHoveredIndex,
	] = useState<number | null>(
		null
	);
	const [
		selectedPerson,
		setSelectedPerson,
	] = useState<Person | null>(
		null
	);

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

	const handleImageClick = (
		person: Person
	) => {
		setSelectedPerson(person);
	};

	const handleClosePersonDialog =
		() => {
			setSelectedPerson(null);
		};

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
					{team.map(
						(person, i) => (
							<Box
								key={
									person.id
								}
								component="span"
								sx={{
									position:
										"absolute",
									top: 0,
									left: 0,
									width:
										"100%",
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
								}}
								onMouseEnter={() =>
									setHoveredIndex(
										i
									)
								}
								onMouseLeave={() =>
									setHoveredIndex(
										null
									)
								}
								onClick={() =>
									handleImageClick(
										person
									)
								}>
								<Box
									component="img"
									src={
										person.image
									}
									alt={
										person.name
									}
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
											"transform 0.3s ease",
										borderRadius:
											"15px",
										border:
											"4px double #383840",
										transform:
											hoveredIndex ===
											i
												? "translateY(-10px)"
												: "translateY(0)",
										cursor:
											"pointer",
									}}
								/>
							</Box>
						)
					)}
				</Box>
			</Box>

			<audio
				id="background-audio"
				src="/sound/inspirational-uplifting-calm-piano.mp3"
				loop
			/>

			{/* Main Dialog Component */}
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
