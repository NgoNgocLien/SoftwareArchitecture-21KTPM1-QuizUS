import { StyleSheet} from 'react-native';
import { Colors } from '@/constants/Colors';


const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: Colors.light.background,
    },

    container: {
        paddingHorizontal: 20,
    },

    header: {
        height: 100,
        backgroundColor: Colors.light.background,
        justifyContent: 'center',
        paddingBottom: -10,

        // Shadow for iOS
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 }, // Adds shadow below the header
        shadowOpacity: 0.08,
        shadowRadius: 4,

        // Shadow for Android
        elevation: 7, // Elevation for the shadow effect
    },

    backIcon: {
        position: 'relative',
        left: 20,
    },

    titleContainer: {
        marginVertical: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    searchIcon: {
        fontSize: 24,
        color: Colors.gray._500,
    },

    searchBar: {
        height: 52,
        width: '100%',
        borderColor: Colors.light.subText,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: Colors.light.background,
    },

    emptyTab: {
        width: 20,
        height: 35,
        borderBottomColor: Colors.gray._500,
        borderBottomWidth: 1,    
    },

    categoryTab: {
        width: 'auto',
        height: 35,
        paddingHorizontal: 18,
        justifyContent: 'center',
        borderBottomColor: Colors.gray._500,
        borderBottomWidth: 1,
        flexDirection: 'row',
        gap: 8
    },

    categoryText: {
        color: Colors.light.subText,
        fontWeight: 'medium',
        fontSize: 16,
    },

    categoryAmountText:{
        backgroundColor: Colors.gray._100,
        borderRadius: 8,
        paddingHorizontal: 5,
        paddingTop: 1,
        height: '60%'
    },

    focusedTab: {
        borderBottomColor: Colors.light.primary,
        borderBottomWidth: 2,
    },

    focusedText: {
        color: Colors.light.primary,
        fontWeight: 500,
    }
});

export default styles;