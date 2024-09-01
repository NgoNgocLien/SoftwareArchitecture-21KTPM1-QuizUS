import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, ViewProps } from "react-native";
import { StyleSheet } from "react-native";
import { Heading } from "./text/Heading";
import { Paragraph } from "./text/Paragraph";
import Toast from "react-native-root-toast";

export type ToastBarProps = ViewProps & {
    type?: 'success' | 'error' | 'warning' | 'info'; 
    message: string;
}

export function ToastBar({
    type = 'info',
    message,
    ...rest
}: ToastBarProps) {
    return (
        <View style={[styles.container, {borderLeftColor: type === 'info' ? Colors.feedback.info : type === 'success' ? Colors.feedback.success : type === 'error' ? Colors.feedback.error : Colors.feedback.warning}, rest.style]}>
            <MaterialCommunityIcons 
            name={type === 'info' ? 'information' : type === 'success' ? 'check-circle' : type === 'error' ? 'close-circle' : 'alert'} 
            color={type === 'info' ? Colors.feedback.info : type === 'success' ? Colors.feedback.success : type === 'error' ? Colors.feedback.error : Colors.feedback.warning} 
            size={24} 
            />
            <View style={styles.messageContainer}>
                <Heading type='h6'>{type === 'info' ? 'Lưu ý' : type === 'success' ? 'Thành công' : type === 'error' ? 'Thất bại' : 'Cảnh báo'}</Heading>
                <Paragraph type='p3'>{message}</Paragraph>
            </View>

        </View>
    );
};

export const ToastBarOptions = {
    duration: Toast.durations.LONG, 
    backgroundColor: 'transparent', 
    shadow: false, 
    opacity: 1,
    containerStyle: 
    {
        marginHorizontal: 20, 
        marginBottom: 60,
        padding: 0, 
        width: 'auto', 
        shadowColor: 'black', 
        shadowOffset: { width: 0, height: 0 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
        elevation: 5
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 8,
        borderLeftColor: Colors.light.info,
        borderLeftWidth: 4,
        gap: 8
    },
    messageContainer: {
        marginLeft: 8,
    },
});