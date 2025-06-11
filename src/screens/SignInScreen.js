import React, { useState, useEffect } from 'react';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import { ThemeColors } from '../utils/Theme';
import styles from '../styles/SignInStyle';
import { validateEmail } from '../utils/Helper';
import { showMessage } from 'react-native-flash-message';
import AuthenticationService from '../services/Authentication/AuthenticationService';
import { CommonActions } from '@react-navigation/native';
import LocalStorage from '../utils/LocalStorage';
import * as commonAction from '../actions/Common/CommonAction';
import { useDispatch } from 'react-redux';

const SignInScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOnPressSignIn = async () => {
    if (!email) {
      showMessage({
        message: 'Email must be required',
        type: 'danger',
      });
      return;
    }
    if (!validateEmail(email.trim())) {
      showMessage({
        message: 'Invalid Email Address',
        type: 'danger',
      });
      return;
    }
    if (!password) {
      showMessage({
        message: 'Password must be required',
        type: 'danger',
      });
      return;
    }

    var payload = {
      email: email.trim(),
      password,
    };

    var response = await AuthenticationService.Login(payload);
    if (response) {
      if (response?.success) {
        LocalStorage.SetData('token', response?.token);
        dispatch(commonAction.fetchMyPrayers());
        dispatch(commonAction.fetchMyAchivedPrayers());
        dispatch(commonAction.fetchMyAnsweredPrayers());
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'Dashboard' }],
          }),
        );
      } else {
        showMessage({
          message: response?.message,
          type: 'danger',
        });
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.ScrollViewContentContainerStyle}
      showsVerticalScrollIndicator={false}>
      <View style={styles.MainContainer}>
        <View style={styles.LogoContainer}>
          <Image
            source={require('../../assets/images/Logo.png')}
            style={{ width: 250, height: 150 }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.ContentContainer}>
          <TextBox
            onChangeText={value => setEmail(value)}
            label={'Email Address'}
            value={email}
          />
          <TextBox
            onChangeText={value => setPassword(value)}
            label={'Password'}
            value={password}
            secureTextEntry={true}
          />
          <View style={styles.ForgetPasswordTextContainer}>
            <TouchableOpacity
              style={styles.ForgetPasswordTextTouch}
              onPress={() => navigation.navigate('ForgotPasswordEmail')}>
              <Text style={styles.ForgetPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <Button title={`Sign In`} onPress={handleOnPressSignIn} />
          <View style={styles.SignUpTextContainer}>
            <TouchableOpacity
              style={styles.SignUpTextTouch}
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.SignUpText}>Don't have account?</Text>
              <Text style={styles.SignUpText2}> Sign Up</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.SocialLoginContainer}>
            <View style={styles.SocialLoginCircleContainer}>
              <FontAwesome5Pro
                name="apple"
                style={{ color: ThemeColors.WHITE }}
                size={20}
              />
            </View>
            <View style={styles.SocialLoginCircleContainer}>
              <FontAwesome5Pro
                name="facebook-f"
                style={{ color: ThemeColors.WHITE }}
                size={20}
              />
            </View>
            <View style={styles.SocialLoginCircleContainer}>
              <FontAwesome5Pro
                name="google"
                style={{ color: ThemeColors.WHITE }}
                size={20}
              />
            </View>
          </View> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default SignInScreen;
