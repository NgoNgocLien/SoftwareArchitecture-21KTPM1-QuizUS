import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const dialogStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalView: {
        marginHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        gap: 20
    },

    topView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dangerIconContainer: {
        backgroundColor: Colors.brand._200,
        borderColor: Colors.brand._50,
        borderWidth: 6,
        borderRadius: 30,
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dangerIcon: {
        color: Colors.light.primary,
        fontSize: 20,
    },
    buttonView:{
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    button:{
        width: '45%'
    },
    confirmButton: {
        backgroundColor: Colors.light.primary,
        padding: 12,
        borderRadius: 10,
        marginTop: 20,
    },
    confirmButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default dialogStyles;