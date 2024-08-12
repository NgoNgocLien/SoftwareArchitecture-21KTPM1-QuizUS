import React from 'react';
import { StyleSheet, Keyboard, TouchableWithoutFeedback, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Favorite() {
    return (
        <LinearGradient
            colors={['#FFFFFF', '#FFFFFF', '#FFD7D9']} // Gradient colors
            locations={[0, 0.49, 0.79]} // Start the gradient at 49% and end at 79%
            style={styles.background}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>                
                <View style={styles.legSummary}>
                    <View style={styles.legSummaryTop}>
                        <View>
                            <Text style={styles.legTime}>10:30</Text>
                            <Text style={styles.arrivalDepartureAirport}>SFO</Text>
                        </View>
                        <View>
                            <Text>10:30</Text>
                            <Text>SFO</Text>
                        </View>
                        <View>
                            <Text style={styles.legTime}>10:30</Text>
                            <Text style={styles.arrivalDepartureAirport}>EWR</Text>
                        </View>
                    </View>
                    <View style={styles.legSummaryBottom}></View>
                    <View style={[styles.leftCut, styles.ticket]}></View>
                    <View style={[styles.rightCut, styles.ticket]}></View>
                </View>
            </TouchableWithoutFeedback>
        </LinearGradient>
  );
};

const styles = StyleSheet.create({

    background: {
        flex: 1,
      },
      container: {
          paddingHorizontal: 20,
      },

  legSummary: {
    marginTop: 10
  },
  legSummaryTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 80,
    paddingTop: 24,
    backgroundColor: "grey",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    paddingHorizontal: 16
  },
  legSummaryBottom: {
    height: 80,
    backgroundColor: "grey",
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16
  },
  ticket: {
    position: "absolute",
    bottom: 56,
    // transform: "translateY(50%)",
    borderTopColor: "transparent",
    borderTopWidth: 12,
    borderBottomColor: "transparent",
    borderBottomWidth: 12
  },
  leftCut: {
    borderLeftColor: "#F3F8FE",
    borderLeftWidth: 12
  },
  rightCut: {
    right: 0,
    borderRightColor: "#F3F8FE",
    borderRightWidth: 12
  },
  legTime: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: 20
  },
  arrivalDepartureAirport: {
    fontSize: 12,
    marginTop: 8
  }
});
