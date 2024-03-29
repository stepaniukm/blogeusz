import satori, { type SatoriOptions } from "satori";
import { stringToUint8Array, toUint8Array } from "uint8array-extras";
import sharp from "sharp";
import { SITE } from "@config";

const fetchFonts = async () => {
	// Regular Font
	const fontFileRegular = await fetch(
		"https://www.1001fonts.com/download/font/ibm-plex-mono.regular.ttf"
	);
	const fontRegular = await fontFileRegular.arrayBuffer();

	// Bold Font
	const fontFileBold = await fetch(
		"https://www.1001fonts.com/download/font/ibm-plex-mono.bold.ttf"
	);
	const fontBold = await fontFileBold.arrayBuffer();

	return {
		fontRegular: toUint8Array(fontRegular),
		fontBold: toUint8Array(fontBold),
	};
};

const { fontRegular, fontBold } = await fetchFonts();

const ogImage = (text: string) => {
	return {
		type: "div",
		props: {
			style: {
				background: "#fefbfb",
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			},
			childen: [
				{
					type: "div",
					props: {
						style: {
							position: "absolute",
							top: "-1px",
							right: "-1px",
							border: "4px solid #000",
							background: "#ecebeb",
							opacity: "0.9",
							borderRadius: "4px",
							display: "flex",
							justifyContent: "center",
							margin: "2.5rem",
							width: "88%",
							height: "80%",
						},
					},
				},
				{
					type: "div",
					props: {
						style: {
							border: "4px solid #000",
							background: "#fefbfb",
							borderRadius: "4px",
							display: "flex",
							justifyContent: "center",
							margin: "2rem",
							width: "88%",
							height: "80%",
						},
						children: [
							{
								type: "div",
								props: {
									style: {
										display: "flex",
										flexDirection: "column",
										justifyContent: "space-between",
										margin: "20px",
										width: "90%",
										height: "90%",
									},
									children: [
										{
											type: "p",
											props: {
												style: {
													fontSize: 72,
													fontWeight: "bold",
													maxHeight: "84%",
													overflow: "hidden",
												},
												children: text,
											},
										},
										{
											type: "div",
											props: {
												style: {
													display: "flex",
													justifyContent: "space-between",
													width: "100%",
													marginBottom: "8px",
													fontSize: 28,
												},
												children: [
													{
														type: "span",
														props: {
															style: {
																overflow: "hidden",
																fontWeight: "bold",
															},
															children: "by",
														},
													},
													{
														type: "span",
														props: {
															style: {
																overflow: "hidden",
																fontWeight: "bold",
															},
															children: SITE.author,
														},
													},
													text !== SITE.title
														? {
																type: "span",
																props: {
																	style: {
																		overflow: "hidden",
																		fontWeight: "bold",
																	},
																	children: SITE.title,
																},
															}
														: undefined,
												],
											},
										},
									],
								},
							},
						],
					},
				},
			],
		},
	};
};

const options = {
	width: 1200,
	height: 630,
	embedFont: true,
	fonts: [
		{
			name: "IBM Plex Mono",
			data: fontRegular,
			weight: 400,
			style: "normal",
		},
		{
			name: "IBM Plex Mono",
			data: fontBold,
			weight: 600,
			style: "normal",
		},
	],
} satisfies SatoriOptions;

const generateOgImage = async (myText = SITE.title) => {
	const svg = await satori(ogImage(myText) as any, options);
	const uint8Array = stringToUint8Array(svg);
	const png = sharp(uint8Array).png();
	const buffer = await png.toBuffer();

	return toUint8Array(buffer);
};

export default generateOgImage;
