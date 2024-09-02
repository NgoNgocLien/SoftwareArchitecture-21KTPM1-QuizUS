import React from 'react';
import { StyleSheet, Keyboard, TouchableWithoutFeedback, View, ScrollView, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import { Link, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function Profile() {
    const router = useRouter();

    const quiz: Quiz = {
        quiz_id: "1",
        description: "Sample Quiz",
        questions: [
          {
            question_id: "q1",
            question_text: "Câu hỏi 1?",
            answers: [
              { answer_id: "a1", answer_text: "Đáp án A", is_correct: false },
              { answer_id: "a2", answer_text: "Đáp án B", is_correct: true },
              { answer_id: "a3", answer_text: "Đáp án C", is_correct: false },
              { answer_id: "a4", answer_text: "Đáp án D", is_correct: false },
            ],
          },
          {
            question_id: "q2",
            question_text: "Câu hỏi 2?",
            answers: [
              { answer_id: "a1", answer_text: "Đáp án A", is_correct: true },
              { answer_id: "a2", answer_text: "Đáp án B", is_correct: false },
              { answer_id: "a3", answer_text: "Đáp án C", is_correct: false },
              { answer_id: "a4", answer_text: "Đáp án D", is_correct: false },
            ],
          },
        ],
    };

    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.background}>

    
        <View style={styles.container}>
            <View style={styles.questionContainer}>

            </View>
        </View>

    </SafeAreaView>
    </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.light.brand_100,
        justifyContent: 'center',
        alignContent: 'center'
    },
    container: {
        paddingHorizontal: 20,
        flex: 1,
    },
    questionContainer: {
        height: "75%",
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingHorizontal: 20,
        backgroundColor: Colors.light.background,
        borderRadius: 20,
    },
    
});