import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

const getStyles = (screenDimensions) => {
	const isTablet = screenDimensions.width > 1000;

	const styles = StyleSheet.create({
		mainContainer: {
			
		},
		gameContainer: {
			width: "80%",
			height: "75%",
			alignItems: "center",
			justifyContent: "space-evenly",
			paddingHorizontal: 20,
			backgroundColor: "rgba(255, 255, 255, 0.9)",
			borderRadius: 20,
		},

	});
	return styles
}

export default getStyles;
