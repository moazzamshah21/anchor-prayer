import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import Button from '../components/Button';
import styles from '../styles/EmailVerifyStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CodeInput from '../components/CodeInput';
import { showMessage } from 'react-native-flash-message';
import AuthenticationService from '../services/Authentication/AuthenticationService';
import { CommonActions } from '@react-navigation/native';
import { ThemeColors } from '../utils/Theme';

const EmailVerifyScreen = ({ navigation, route }) => {
  const { token = '', email = '' } = route.params;

  const codeInputRef = useRef(null);
  const [code, setCode] = useState('');
  const [userToken, setUserToken] = useState(token);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOnPressContinue = async () => {
    if (code.length != 4) {
      showMessage({
        message: 'code must be required',
        type: 'danger',
      });
      return;
    }

    var payload = {
      email: email.trim(),
      code,
      token: userToken,
    };
    var response = await AuthenticationService.VerifyEmailCode(payload);
    if (response?.success) {
      setCode('');
      setModalVisible(true);
    } else {
      showMessage({
        message: response?.message,
        type: 'danger',
      });
    }
  };

  const handleOnPressPopupContinue = async () => {
    setModalVisible(false);
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'Dashboard' }],
        }),
      );
    }, 500);
  };

  const handleOnPressResend = async () => {
    var payload = {
      email: email.trim()
    };
    var response = await AuthenticationService.ResendEmailCode(payload);
    if (response?.success) {
      setUserToken(response?.token);
    } else {
      showMessage({
        message: response?.message,
        type: 'danger',
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.ScrollViewContentContainerStyle}
      showsVerticalScrollIndicator={false}>
      <View style={styles.MainContainer}>
        <View style={styles.EmailIconContainer}>
          <Image
            source={require('../../assets/images/Logo.png')}
            style={styles.VerifyEmailIconImage}
            resizeMode="center"
          />
        </View>
        <View style={styles.ContentContainer}>
          <View style={styles.TitleTextContainer}>
            <Text style={styles.TitleText}>Verify your email</Text>
            <Text style={styles.SubTitleText}>
              verify your 4-digit code sent to
            </Text>
            <Text style={styles.SubTitleText}>{email}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <CodeInput
              ref={codeInputRef}
              onChangeCode={value => setCode(value)}
            />
          </View>
          <View style={styles.ResendCodeTextContainer}>
            <TouchableOpacity
              style={styles.ResendCodeTextTouch}
              onPress={handleOnPressResend}>
              <Text style={styles.ResendCodeText}>Resend Code</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ContinueButtonContainer}>
            <Button title={`Continue`} onPress={handleOnPressContinue} />
          </View>
          <View style={styles.ChangeEmailTextContainer}>
            <TouchableOpacity
              style={styles.ChangeEmailTextTouch}
              onPress={() => {
                navigation.pop(3);
              }}>
              <Text style={styles.ChangeEmailText}>Change Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Ionicons
              name="checkmark-circle"
              style={{ color: ThemeColors.BLACK }}
              size={100}
            />
            <View>
              <Text style={styles.ModalTextStyle}>
                Yahoo! You have successfully{'\n'}verified the account!
              </Text>
              <View style={styles.ContinueButtonModalContainer}>
                <Button
                  title={`Continue`}
                  onPress={handleOnPressPopupContinue}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default EmailVerifyScreen;
