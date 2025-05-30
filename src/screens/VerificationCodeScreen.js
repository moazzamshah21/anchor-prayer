import React, { useState, useEffect } from 'react';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import { ThemeColors } from '../utils/Theme';
import styles from '../styles/VerificationCodeStyle';
import { CommonActions } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";
import AuthenticationService from '../services/Authentication/AuthenticationService';

const VerificationCodeScreen = ({ navigation, route }) => {

  const { email = "" } = route.params;

  const [code, setCode] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [token, setToken] = useState(route?.params?.token);

  const handleOnPressContinue = async () => {
    if (!code) {
      showMessage({
        message: 'Code must be required',
        type: 'danger'
      });
      return;
    }

    var payload = {
      email: email.trim(),
      code,
      token
    };
    var response = await AuthenticationService.VerifyForgotPasswordCode(payload);
    if (response) {
      if (response?.success) {
        showMessage({
          message: response?.message,
          type: 'success'
        })
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'SignIn' },
              {
                name: 'ForgotPassword',
                params: { email: email.trim(), code, token }
              },
            ],
          })
        );
      } else {
        showMessage({
          message: response?.message,
          type: 'danger'
        });
        setCode('');
      }
    }
  }

  const handleResend = () => {
    setSeconds(60);
  };

  const handleOnPressResendCode = async () => {
    var payload = {
      email
    };
    var response = await AuthenticationService.SendForgotPasswordCode(payload);
    if (response) {
      if (response?.success) {
        setToken(response?.token);
        showMessage({
          message: response?.message,
          type: 'success'
        });
        handleResend();
      } else {
        showMessage({
          message: response?.message,
          type: 'danger'
        });
      }
    }
  }

  useEffect(() => {
    handleResend();
  }, [])

  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [seconds]);

  return (
    <ScrollView contentContainerStyle={styles.ScrollViewContentContainerStyle} showsVerticalScrollIndicator={false}>
      <View style={styles.MainContainer}>
        <View style={styles.LogoContainer}>
          <Image source={require('../../assets/images/Logo.png')} style={{ width: 250, height: 150 }} resizeMode='center' />
        </View>
        <View style={styles.ContentContainer}>
          <View style={styles.TitleTextContainer}>
            <Text style={styles.TitleText}>Forgot Password</Text>
          </View>
          <TextBox
            onChangeText={value => setCode(value)}
            label={'Verification Code'}
            value={code}
          />
          <View style={styles.ResendCodeTextContainer}>
            <TouchableOpacity disabled={seconds != 0} style={styles.ResendCodeTextTouch} onPress={handleOnPressResendCode}>
              <Text style={styles.ResendCodeText}>Resend Code{seconds != 0 && ` ${seconds}`}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ContinueButtonContainer}>
            <Button title={`Continue`} onPress={handleOnPressContinue} />
          </View>
          <View style={styles.SignInTextContainer}>
            <TouchableOpacity style={styles.SignInTextTouch} onPress={() => navigation.pop(2)}>
              <Text style={styles.SignInText}>Back to:</Text>
              <Text style={styles.SignInText2}> Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default VerificationCodeScreen;