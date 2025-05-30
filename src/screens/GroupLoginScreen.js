import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import styles from '../styles/GroupLoginStyle';
import BackHeader from '../components/BackHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
import GroupService from '../services/Group/GroupService';
import {showMessage} from 'react-native-flash-message';
import LocalStorage from '../utils/LocalStorage';
const {width} = Dimensions.get('window');

const GroupLoginScreen = ({navigation, route}) => {
  const [creatorHome, setCreatorHome] = useState('');
  const [groupPassword, setGroupPassword] = useState('');

  const onPressLogin = async () => {
    if (creatorHome == '') {
      showMessage({
        message: 'Please enter name',
        type: 'danger',
      });
    } else if (groupPassword == '') {
      showMessage({
        message: 'Please enter password',
        type: 'danger',
      });
    } else {
      var payload = {
        name: creatorHome,
        password: groupPassword,
      };
      var response = await GroupService.LoginGroup(payload);
      if (response?.success) {
        LocalStorage.SetData('groupId', response?.data?.groupId);
        setTimeout(() => {
          navigation.navigate('ActiveGroupScreen');
        }, 500);
      } else {
        showMessage({
          message: response?.message,
          type: 'danger',
        });
      }
    }
  };

  return (
    <React.Fragment>
      <BackHeader navigation={navigation} title="Login Group" />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <View style={{marginTop: 30}}>
            <Text style={styles.LoginDetailsHeading}>Enter Login Details</Text>
          </View>
          <View style={{marginTop: 20}}>
            <View style={styles.TextInputStyle}>
              <TextInput
                style={{
                  fontSize: 15,
                  fontFamily: ThemeFonts.MEDIUM,
                  color: ThemeColors.DARK_GRAY,
                  width: '80%',
                  textAlign: 'center',
                }}
                placeholder="Creator Name"
                placeholderTextColor={ThemeColors.LIGHT_GRAY}
                value={creatorHome}
                onChangeText={x => setCreatorHome(x)}
              />
            </View>

            <View style={[styles.TextInputStyle, {marginTop: 15}]}>
              <TextInput
                style={{
                  fontSize: 15,
                  fontFamily: ThemeFonts.MEDIUM,
                  color: ThemeColors.DARK_GRAY,
                  width: '80%',
                  textAlign: 'center',
                }}
                placeholder="Group Password"
                placeholderTextColor={ThemeColors.LIGHT_GRAY}
                value={groupPassword}
                onChangeText={x => setGroupPassword(x)}
                secureTextEntry
              />
            </View>
            <View style={{marginTop: 25}}>
              <TouchableOpacity
                onPress={() => {
                  onPressLogin();
                }}
                activeOpacity={0.5}
                style={styles.LoginButtonStyle}>
                <Text style={styles.LoginBtnTExt}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{alignItems: 'center', marginBottom: 10}}>
          <Text style={styles.LogoText}>
            Designed by:{'\n'}digitalsoftwarelabs.com
          </Text>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default GroupLoginScreen;
