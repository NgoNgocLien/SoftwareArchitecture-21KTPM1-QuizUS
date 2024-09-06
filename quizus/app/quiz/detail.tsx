import React, {useEffect, useRef, useState} from 'react';
import { Keyboard, TouchableWithoutFeedback, View, Animated, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import {  useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Paragraph } from '@/components/text/Paragraph';
import { Heading } from '@/components/text/Heading';
import styles from './detail.styles';
import config from '@/constants/config';
import { McCard } from '@/components/card/McCard';

export default function QuizDetail() {
  const router = useRouter();
  const params = useLocalSearchParams(); 

  const id_campaign = params.id_campaign as string;
  const score = config.QUIZ_SCORE;
  const quizInfoString = Array.isArray(params.quizInfo) ? params.quizInfo[0] : params.quizInfo;
  const quizInfo = JSON.parse(quizInfoString);
  const questions = quizInfo.questions.splice(1,3);
  const quizLength = questions.length;

  const [count, setCount] = useState(0);

  const [showMC, setShowMC] = useState(true);
  const [millisecondMC, setMillisecondMC] = useState(0);

  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const [showExitPopup, setShowExitPopup] = useState(false);

  const duration = config.DURATION;
  const [isRunning, setIsRunning] = useState(false); // Track whether the timer is running
  const [elapsedTime, setElapsedTime] = useState(0); // Track elapsed time
  const [showTimeUpPopup, setShowTimeUpPopup] = useState(false);

  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isRunning) {
      const remainingTime = duration - elapsedTime;
      const animation = Animated.timing(progress, {
        toValue: (elapsedTime / duration) * 100 + 100,
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

  useEffect(() => {
    if (millisecondMC > 0){
      setShowMC(true);
      const timer = setTimeout(() => {
        console.log(millisecondMC)
        setShowMC(false);
        handleResume();
      }, 2000); 
  
      return () => clearTimeout(timer);
    }
  },[count, millisecondMC])

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

  const handleFinishGame = async () => {
    try {
      const response = await fetch(`${config.CAMPAIGN_BE}/api/game`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_player: "100006",
          id_campaign: id_campaign
        }),
      });

      const result = await response.json();

      if (response.ok) {

        if (correctAnswer == questions.length){
          await fetch(`${config.USER_BE}/api/player`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id_player: "100006",
              score: score,
            }),
          });
        }

        const params = {
          point: correctAnswer,
          score: (correctAnswer == questions.length) ? score : 0,
          elapsedTime: elapsedTime || duration,
          id_campaign: id_campaign,
          playerTurn: result.player_turn
        };
      
        router.replace({
          pathname: '/quiz/result',
          params,
        });
      } else{
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Lỗi hệ thống');
    }
  };


  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <SafeAreaView style={styles.background}>
    {
      showExitPopup && !showTimeUpPopup && (
        <>
        <View style={styles.exitContainer}>
          <Heading type={'h5'}>Kết thúc</Heading>
          <Paragraph type={'p2'} color={Colors.light.subText}>Bạn có chắc chắn muốn thoát trò chơi không?</Paragraph>
          <View style={styles.exitButtons}>
            <Button text="Quay lại" type="tertiary" style={styles.exitButton} onPress={() => {
              setShowExitPopup(false);
              handleResume();
            }} />
            <Button text="Đồng ý" type="primary" style={styles.exitButton}
              onPress={() => {
                setShowExitPopup(false);
                handleFinishGame();
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
          <Paragraph type={'p2'} color={Colors.light.subText}>Đã hết thời gian</Paragraph>
          <View style={styles.exitButtons}>
            <Button text="Xem kết quả" type="primary" style={{marginBottom: 0}}
              onPress={() => {
                setShowExitPopup(false);
                handleFinishGame();
              }} />
          </View>
        </View>
        <View style={styles.overlayContainer}>
        </View>
        </>
      )
    }

    {
      !showExitPopup && !showTimeUpPopup && showMC && (
        <McCard  question_id = {questions[count].question_id} setMillisecondMC={setMillisecondMC}
          question_text={questions[count].question_text}></McCard>
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
            questions[count].answers.map((answer: { answer_id: string; answer_text: string; is_correct: boolean; }, index: number) => (
            <Button key={answer.answer_id} text={answer.answer_text} style={{marginBottom: 10}}
              type={'secondary'} 
              onPress={() => {
                if (answer.is_correct){
                  setCorrectAnswer(correctAnswer + 1);
                }
                setSelectedAnswer(index);
                setShowAnswerKey(true);
                handlePause();
              }} 
              />
            ))
            :
            questions[count].answers.map((answer: { is_correct: boolean; answer_id: string; answer_text: string; }, index: number ) => {
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
              setShowAnswerKey(false);
              
              if (count + 1 === quizLength){
                handleFinishGame();
              } else{
                setCount(count + 1);
                
              }
          }}></Button>
        )
      }
      
    </View>
  </SafeAreaView>
  </TouchableWithoutFeedback>
  )
}

