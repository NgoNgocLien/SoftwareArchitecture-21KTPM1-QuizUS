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
import { retrieveFromSecureStore } from '@/api/SecureStoreService';

export default function QuizGameDetail() {
  const router = useRouter();
  const params = useLocalSearchParams(); 

  const id_campaign = params.id_campaign as string;
  const quizInfoString = Array.isArray(params.quizInfo) ? params.quizInfo[0] : params.quizInfo;
  const quizInfo = JSON.parse(quizInfoString);

  const [playerList, setPlayerList] = useState<any[]>([]);

  useEffect(() => {
    retrieveFromSecureStore("id_player", (id_player: string) => {
    //   console.log("id_player retrieved:", id_player);
      retrieveFromSecureStore("name_player", (name_player: string) => {
        // console.log("name_player retrieved:", name_player);
        console.log(`${name_player} has connected to the socket server`);
  
        gameSocket.connect(id_player, name_player);
  
        gameSocket.on('connect', () => {
          console.log(`${name_player} has connected to the socket server (socket event)`);
          setPlayerList((prevList) => [...prevList, { id_player, name_player }]);
        });
      });
    });
  }, []);
  

  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <SafeAreaView style={styles.background}>
    <View style={[styles.container, {justifyContent: 'center'}]}>
      <Heading type={"h3"} style={{textAlign: 'center'}}>Đang có {playerList?.length} người chơi</Heading>
      <Paragraph>{playerList.map(item => item.name).join(', ')}</Paragraph>
      <Button text="Quay trở lại" onPress={() => {
          gameSocket.disconnect();

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

