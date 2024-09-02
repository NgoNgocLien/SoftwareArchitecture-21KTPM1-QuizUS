import React, {useEffect, useRef, useState} from 'react';
import { StyleSheet, Keyboard, TouchableWithoutFeedback, View, ScrollView, Text, Pressable, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import { Link, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Label } from '@/components/text/Label';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Paragraph } from '@/components/text/Paragraph';
import { Heading } from '@/components/text/Heading';

const quiz: Quiz = {
  quiz_id: "1",
  description: "Sample Quiz",
  questions: [
    {
      question_id: "q1",
      question_text: "Grab là dịch vụ cung cấp xe công nghệ đến từ đâu và thành lập năm bao nhiêu?",
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

export default function Profile() {
  const router = useRouter();
  const questions = quiz.questions;
  const quizLength = questions.length;

  const [count, setCount] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const [showExitPopup, setShowExitPopup] = useState(false);

  const duration = 6000;
  const [isRunning, setIsRunning] = useState(true); // Track whether the timer is running
  const [elapsedTime, setElapsedTime] = useState(0); // Track elapsed time
  const [showTimeUpPopup, setShowTimeUpPopup] = useState(false);


  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isRunning) {
      const remainingTime = duration - elapsedTime;
      const animation = Animated.timing(progress, {
        toValue: 100,
        duration: remainingTime,
        useNativeDriver: false,
      });

      animation.start(({ finished }) => {
        if (finished) {
          setShowTimeUpPopup(true);
        }
      });

      return () => {
        animation.stop();
      };
    }
  }, [isRunning, elapsedTime]);

  const handlePause = () => {
    progress.stopAnimation((value) => {
      const currentTime = (value / 100) * duration;
      setElapsedTime(currentTime);
      setIsRunning(false);
    });
  };

  const handleResume = () => {
    setIsRunning(true);
  };

  const animatedWidth = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <SafeAreaView style={styles.background}>
    {
      showExitPopup && !showTimeUpPopup && (
        <>
        <View style={styles.exitContainer}>
          <Heading type={'h5'}>Kết thúc</Heading>
          <Paragraph type={'p1'} color={Colors.light.subText}>Bạn có chắc chắn muốn thoát trò chơi không?</Paragraph>
          <View style={styles.exitButtons}>
            <Button text="Quay lại" type="tertiary" style={styles.exitButton} onPress={() => {
              setShowExitPopup(false);
              handleResume();
            }} />
            <Button text="Đồng ý" type="primary" style={styles.exitButton}
              onPress={() => {
                setShowExitPopup(false);
                // handleFinishGame();
                router.replace({
                  pathname: '/quiz/result',
                  params: {
                    score: correctAnswer,
                    point: 100,
                    passedTime: 1,
                    id_quiz: 1
                  }
                });
              }} />
          </View>
        </View>
        <View style={styles.overlayContainer}>
        </View>
        </>
      )
    }

    {
      showTimeUpPopup && (
        <>
        <View style={styles.exitContainer}>
          <Heading type={'h5'}>Kết thúc</Heading>
          <Paragraph type={'p1'} color={Colors.light.subText}>Đã hết thời gian</Paragraph>
          <View style={styles.exitButtons}>
            <Button text="Xem kết quả" type="primary" style={{marginBottom: 0}}
              onPress={() => {
                setShowExitPopup(false);
                // handleFinishGame();
                router.replace({
                  pathname: '/quiz/result',
                  params: {
                    score: correctAnswer,
                    point: 100,
                    passedTime: 1,
                    id_quiz: 1
                  }
                });
              }} />
          </View>
        </View>
        <View style={styles.overlayContainer}>
        </View>
        </>
      )
    }

    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <View style={styles.circleMC} />
        <View style={styles.rectangleStatus}>
          <TabBarIcon name={'trophy-variant-outline'} size={25} color={Colors.light.background} />
          <Paragraph color={Colors.light.background} type={'p1'}>{correctAnswer}/{quizLength}</Paragraph>
        </View>
        <TabBarIcon name={'exit-to-app'} size={32} color={Colors.light.primary} 
          onPress={() => {
            setShowExitPopup(true);
            handlePause();
          } }/>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progress, { width: animatedWidth }]} />
        </View>
      </View>

      <View style={styles.questionContainer}>
        <View>
          <Paragraph type={'p2'}>Câu {count + 1}</Paragraph>
          <Paragraph color={Colors.light.subText} type={'p3'}>Trên tổng 10 câu</Paragraph>
        </View>
        <Heading type={'h3'}>{questions[count].question_text}</Heading>
        <View style={styles.answerContainer}>
          {!showAnswerKey 
            ? 
            questions[count].answers.map((answer, index) => (
            <Button key={answer.answer_id} text={answer.answer_text} style={{marginBottom: 10}}
              type={'secondary'} 
              onPress={() => {
                if (answer.is_correct){
                  setCorrectAnswer(correctAnswer + 1);
                }
                setSelectedAnswer(index);
                setShowAnswerKey(true);
              }} 
              />
            ))
            :
            questions[count].answers.map((answer, index) => {
              let typeButton: 'secondary' | 'correctAnswer' | 'wrongAnswer' = 'secondary';

              if (answer.is_correct)
                typeButton = 'correctAnswer'
              else if (selectedAnswer === index)
                typeButton = 'wrongAnswer'

              return (
                <Button key={answer.answer_id} text={answer.answer_text} style={{marginBottom: 10}}
                  type={typeButton} 
              />
              )
            })            
          }
        </View>
      </View>

      {
        showAnswerKey && (
          <Button 
            type={'primary'} 
            text={(count + 1 === quizLength) ? 'Xem kết quả' : 'Tiếp tục'} 
            style={[styles.continueButton]}
            onPress={() => {
              setCount(count + 1);
              setShowAnswerKey(false);
              if (count + 1 === quizLength) 
                // handleFinishGame();
                router.replace({
                  pathname: '/quiz/result',
                  params: {
                    score: correctAnswer,
                    point: 100,
                    passedTime: 1,
                    id_quiz: 1
                  }
                });
          }}></Button>
        )
      }
      
    </View>
  </SafeAreaView>
  </TouchableWithoutFeedback>
  )
}

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
    width: '45%',
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