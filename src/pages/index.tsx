import { useState } from "react";
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
import {
	team,
	Person,
} from "../libs/teamData"; // Importing team data

const Home: React.FC = () => {
	const numImages =
		team.length;
	const angle =
		360 / numImages;
	const translateZDistance =
		350 /
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

	const startAudio = () => {
		const audio =
			document.getElementById(
				"background-audio"
			) as HTMLAudioElement;
		audio.volume = 0.5;
		audio
			.play()
			.catch((error) =>
				console.log(
					"Autoplay blocked:",
					error
				)
			);
		setOpen(false);
	};

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
						width: "200px",
						height: "280px",
						transformStyle:
							"preserve-3d",
						animation: open
							? "none"
							: "animate 60s linear infinite",
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
						Not your ordinary
						financial
						institution.
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
						Meet the Kastelo
						executives, the
						powerhouse fueling
						our mission to
						make finance
						accessible to
						everyone. Our team
						unites experience
						in finance,
						technology, and an
						unyielding passion
						to empower people,
						ensuring that
						Kastelo remains
						true to our values
						and focused on our
						goals.
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

			{/* Dialog for Selected Person */}
			<Dialog
				open={Boolean(
					selectedPerson
				)}
				onClose={
					handleClosePersonDialog
				}
				PaperProps={{
					sx: {
						maxWidth: 600,
						p: 3,
						borderRadius:
							"15px",
						color: "#383840",
					},
				}}>
				<DialogContent>
					<Box
						display="flex"
						alignItems="center"
						mb={2}>
						{/* Display Person Image */}
						<Box
							component="img"
							src={
								selectedPerson?.bioImage
							}
							alt={
								selectedPerson?.name
							}
							sx={{
								width:
									"115px",
								height:
									"220px",
								borderRadius:
									"8px",
								mr: 3,
							}}
						/>
						<Box>
							{/* Title */}
							<Typography
								variant="h5"
								component="div"
								sx={{
									fontWeight:
										"bold",
									color:
										"#383840",
								}}>
								Hi,{" "}
								<span
									style={{
										fontWeight: 700,
									}}>
									{
										selectedPerson?.name
									}
								</span>
							</Typography>
							{/* Position */}
							<Typography
								variant="subtitle1"
								color="textSecondary"
								gutterBottom>
								{
									selectedPerson?.position
								}
							</Typography>
							{/* Tagline */}
							<Typography
								variant="body2"
								color="#c4ab6c"
								sx={{
									fontStyle:
										"italic",
								}}>
								Visionary ·
								International
								Finance Whiz ·
								Overachiever
							</Typography>
						</Box>
					</Box>
					{/* Description */}
					<Typography
						variant="body2"
						color="textSecondary"
						paragraph
						sx={{
							mt: 2,
							lineHeight: 1.6,
						}}>
						{
							selectedPerson?.bio
						}
					</Typography>
				</DialogContent>
				<DialogActions
					sx={{
						display: "flex",
						justifyContent:
							"flex-end",
					}}>
					<Button
						onClick={
							handleClosePersonDialog
						}
						sx={{
							color:
								"#383840",

							fontWeight:
								"bold",
							backgroundColor:
								"#c4ab6c",
							":hover": {
								backgroundColor:
									"#e0cfa9",
							},
							px: 5,
						}}>
						Nice meeting you
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default Home;
