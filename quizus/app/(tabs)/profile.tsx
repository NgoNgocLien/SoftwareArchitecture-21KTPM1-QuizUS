import { useCallback, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { removeFromSecureStore, retrieveFromSecureStore } from '@/api/SecureStoreService';
import { TextInputMask } from 'react-native-masked-text';
import notificationSocket from '@/models/notification/NotificationSocket';
import { Input } from '@/components/input/Input';
import { Label } from '@/components/text/Label';
import { Heading } from '@/components/text/Heading';
import { getPlayerById, updatePlayer } from '@/api/PlayerApi';

const defaultUserInfo = {
  id_player: '',
  username: '',
  avatar: 'https://res.cloudinary.com/dklt21uks/image/upload/v1725617785/quizus/w6z4afxecugisynvpiwy.png',
  dob: '',
  email: '',
  gender: '',
  facebook: ''
}
export default function Profile() {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [date, setDate] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);
  
  useEffect(() => {
    retrieveFromSecureStore('id_player', (id_player: string) => {
      getPlayerById(id_player)
      .then((data: any) => {
        console.log(data.avatar)
        setUserInfo({
          ...userInfo,
          id_player: data.id_player,
          username: data.username,
          avatar: data.avatar || 'https://res.cloudinary.com/dklt21uks/image/upload/v1725617785/quizus/w6z4afxecugisynvpiwy.png',
          dob: convertToDDMMYYYY(data.dob),
          email: data.email,
          gender: data.gender,
          facebook: data.facebook
        });
        setDate(convertToDDMMYYYY(data.dob));
      });
    });
  },[]);

  const changeUserInfo = (field: string, value: string) => {
    setUserInfo({
      ...userInfo,
      [field]: value
    })
    setIsUpdated(true)
  }

  const handleLogout = () => {
    
    if (notificationSocket) {
      console.log("Disconnecting socket before logging out...");
      notificationSocket.disconnect(); // Disconnect socket
    }

    removeFromSecureStore("id_player");
    router.replace("/login");
    
  };

  const handleUpdate = () =>{
    const newUserInfo = {
      ...userInfo,
      dob: convertToYYYYMMDD(userInfo.dob)
    }
    setIsUpdated(false)
    updatePlayer(newUserInfo)
  }

  const convertToDDMMYYYY = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const convertToYYYYMMDD = (dateString: string) => {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  };

  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <LinearGradient
      colors={[Colors.light.background, Colors.light.background, Colors.light.secondary]} // Gradient colors
      locations={[0, 0.49, 0.79]} // Start the gradient at 49% and end at 79%
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={[styles.titleContainer]}>
            <Heading type="h4">Thông tin cá nhân</Heading>
        </View>

        <Image source={{uri: userInfo.avatar}} style={styles.avatar} />
        <Label>Username</Label>
        <Input type={"default"} value={userInfo.username} onChangeText={(value) => changeUserInfo("username", value)}/>
        
        <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between'}}>
          <View>
            <Label>Ngày tháng năm sinh</Label>
            <TextInputMask
            type={'datetime'}
            options={{
              format: 'DD-MM-YYYY',
            }}
            value={userInfo.dob}
            onChangeText={text => changeUserInfo("dob", text)}
            style={[styles.input]}
            placeholder="DD-MM-YYYY"
            keyboardType="numeric"
          />
          </View>
          
          <View>
          <Label>Giới tính</Label>
          <View style={styles.radioContainer}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => changeUserInfo("gender",'nam')}
            >
              <View style={styles.circle}>
                {userInfo.gender === 'nam' && <View style={styles.checkedCircle} />}
              </View>
              <Text style={styles.radioText}>Nam</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => changeUserInfo("gender",'nữ')}
            >
              <View style={styles.circle}>
                {userInfo.gender === 'nữ' && <View style={styles.checkedCircle} />}
              </View>
              <Text style={styles.radioText}>Nữ</Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
         
        <Label>Email</Label>
        <Input type={"default"} value={userInfo.email} onChangeText={(value) => changeUserInfo("email", value)}/>
        <Label>Facebook</Label>
        <Input type={"default"} value={userInfo.facebook} onChangeText={(value) => changeUserInfo("facebook", value)}/>

        <Button
          text="Lưu thay đổi"
          type={isUpdated ? "primary" : "disabled"}
          onPress={() => {
            if (isUpdated) {
              handleUpdate();
            }
          }}
        />

        <Button
          text="Đăng xuất"
          type="primary"
          onPress={handleLogout}
        />
      </SafeAreaView>
    </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  input: {
    height: 48,
    width: '100%',
    borderColor: Colors.light.subText,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    backgroundColor: Colors.light.background,
  },
  halfInput: {
    width: '40%'
  },
  avatar:{
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#2c3e50',
    marginBottom: 0,
    alignSelf: 'center'
  },
  titleContainer: {
    marginTop: 10,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  circle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2c3e50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkedCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2c3e50',
  },
  radioText: {
    fontSize: 16,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});


