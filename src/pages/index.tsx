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
	useMediaQuery,
	useTheme,
} from "@mui/material";
import {
	team,
	Person,
} from "../libs/teamData"; // Importing team data

const Home: React.FC = () => {
	const theme = useTheme();
	const isMobile =
		useMediaQuery(
			theme.breakpoints.down(
				"sm"
			)
		);
	const numImages =
		team.length;
	const angle =
		360 / numImages;
	const translateZDistance =
		isMobile
			? 170
			: 350 /
			  (2 *
					Math.tan(
						Math.PI /
							numImages
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
					width: "100vw",
					height: "100vh",
					overflow: "hidden",
					background:
						"linear-gradient(150deg, #c4ab6c, #383840)",
					perspective:
						"1000px",
					filter: open
						? "blur(5px)"
						: "none",
					padding: isMobile
						? 2
						: 0,
				}}>
				<Box
					className="box"
					sx={{
						position:
							"relative",
						width: isMobile
							? "150px"
							: "200px",
						height: isMobile
							? "200px"
							: "280px",
						transformStyle:
							"preserve-3d",
						animation: open
							? "none"
							: "animate 30s linear infinite", // Increased animation speed to 30s
						willChange:
							"transform",
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
									willChange:
										"transform", // Hardware acceleration hint
									// Removed reflection for better performance
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
										willChange:
											"transform", // Optimize for mobile rendering
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
							fontSize:
								isMobile
									? "1.25rem"
									: "1.5rem",
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
								isMobile
									? "0.9rem"
									: "1.1rem",
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
							fontSize:
								isMobile
									? "0.9rem"
									: "1rem",
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
				fullScreen={isMobile}
				PaperProps={{
					sx: {
						maxWidth: isMobile
							? "100%"
							: 600,
						p: 3,
						borderRadius:
							isMobile
								? 0
								: "15px",
						color: "#383840",
					},
				}}>
				<DialogContent>
					<Box
						display="flex"
						flexDirection={
							isMobile
								? "column"
								: "row"
						}
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
									isMobile
										? "100%"
										: "115px",
								height:
									isMobile
										? "auto"
										: "220px",
								borderRadius:
									"8px",
								mr: isMobile
									? 0
									: 3,
								mb: isMobile
									? 2
									: 0,
							}}
						/>
						<Box
							textAlign={
								isMobile
									? "center"
									: "left"
							}>
							<Typography
								variant="h5"
								component="div"
								sx={{
									fontWeight:
										"bold",
									color:
										"#383840",
									fontSize:
										isMobile
											? "1.25rem"
											: "1.5rem",
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
							<Typography
								variant="subtitle1"
								color="textSecondary"
								gutterBottom
								sx={{
									fontSize:
										isMobile
											? "1rem"
											: "1.1rem",
								}}>
								{
									selectedPerson?.position
								}
							</Typography>
							<Typography
								variant="body2"
								color="#c4ab6c"
								sx={{
									fontStyle:
										"italic",
									fontSize:
										isMobile
											? "0.9rem"
											: "1rem",
								}}>
								{
									selectedPerson?.about
								}
							</Typography>
						</Box>
					</Box>
					<Typography
						variant="body2"
						color="textSecondary"
						paragraph
						sx={{
							mt: 2,
							lineHeight: 1.6,
							fontSize:
								isMobile
									? "0.9rem"
									: "1rem",
							textAlign:
								isMobile
									? "center"
									: "left",
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
							"center",
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
							width: isMobile
								? "100%"
								: "auto",
						}}>
						Nice meeting you
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default Home;
