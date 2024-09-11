import React, {useEffect, useRef, useState} from 'react';
import { Keyboard, TouchableWithoutFeedback, View, Animated, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import {  useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Paragraph } from '@/components/text/Paragraph';
import { Heading } from '@/components/text/Heading';
import styles from '@/styles/quiz-game-detail.styles';
import config from '@/constants/config';
import { McCard } from '@/components/card/McCard';
import gameSocket from '@/service/GameSocket';

export default function QuizGameDetail() {
  const router = useRouter();
  const params = useLocalSearchParams(); 

  const id_campaign = params.id_campaign as string;
  const quizInfoString = Array.isArray(params.quizInfo) ? params.quizInfo[0] : params.quizInfo;
  const quizInfo = JSON.parse(quizInfoString);

  const [playerList, setPlayerList] = useState<any[]>([]);

  useEffect(() => {
    gameSocket.on('connect', () => {
      console.log('Connected to server');
    });

    gameSocket.on('player-added', (playerName) => {
      setPlayerList((prevList) => [...prevList, playerName]);
    });

    gameSocket.on('player-removed', (playerId) => {
      setPlayerList((prevList) => prevList.filter(player => player.id !== playerId));
    });

    return () => {
      gameSocket.off('player-added');
      gameSocket.off('player-removed');
    };
  }, []);

  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <SafeAreaView style={styles.background}>
    <View style={[styles.container, {justifyContent: 'center'}]}>
      <Heading type={"h3"} style={{textAlign: 'center'}}>Đang có {playerList?.length} người chơi</Heading>
      <Paragraph>{playerList.map(item => item.name).join(', ')}</Paragraph>
      <Button text="Quay trở lại" onPress={() => {
            router.replace({
              pathname: '/campaign',
              params: {
                id_campaign,
              },
            })
          } }></Button>
      {
        playerList?.length == 5 && (
          <Button text="Chơi ngay" onPress={() => {
            router.replace({
              pathname: '/quizgame/detail',
              params: {
                id_campaign: id_campaign,
                quizInfo: JSON.stringify(quizInfo),
              },
            })
          } }></Button>
        )
      }
       </View>
  </SafeAreaView>
  </TouchableWithoutFeedback>
  )
}

