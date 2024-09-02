import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.brand._100,
        justifyContent: 'center',
        alignContent: 'center'
    },
    container: {
        paddingHorizontal: 20,
        flex: 1,
    },
    overlayContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: 20,
      flex: 1,
      backgroundColor: Colors.gray._900,
      opacity: 0.5,
      zIndex: 100
    },
    exitContainer:{
      width: '80%',
      top: '40%',
      left: '10%',
      padding: 20,
      backgroundColor: Colors.light.background,
      borderRadius: 20,
      gap: 10,
      position: 'absolute',
      zIndex: 101
    },
    exitButtons:{
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    exitButton:{
      width: '48%',
      marginBottom: 0
    },
    statusContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 15,
      alignItems: 'center',
      marginBottom: 20,
    },
    circleMC: {
      width: 55, 
      height: 55,
      borderRadius: 50, 
      backgroundColor: Colors.light.primary, 
    },
    rectangleStatus:{
      width: '25%',
      height: '45%',
      backgroundColor: Colors.light.primary,
      borderRadius: 10,
      gap: 8,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    exitIcon:{
  
    },
    progressBar:{
      width: '100%',
      height: 13,
      backgroundColor: Colors.gray._200,
      borderRadius: 20,
      overflow: 'hidden',
    },
    progress: {
      height: '100%',
      backgroundColor: Colors.light.primary,
    },
    questionContainer: {
        padding: 20,
        backgroundColor: Colors.light.background,
        borderRadius: 20,
        gap: 30
    },
    answerContainer:{
      gap: 1
    },
    continueButton:{
      marginTop: 'auto',
    },
  
  });

  export default styles;