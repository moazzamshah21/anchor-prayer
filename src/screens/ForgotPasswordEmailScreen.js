import React, { useState, useEffect } from 'react';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import { ThemeColors } from '../utils/Theme';
import styles from '../styles/ForgotPasswordEmailStyle';
import { validateEmail } from '../utils/Helper';
import { showMessage } from "react-native-flash-message";
import AuthenticationService from '../services/Authentication/AuthenticationService';

const ForgotPasswordEmailScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');

  const handleOnPressContinue = async () => {
    if (!email) {
      showMessage({
        message: 'Email must be required',
        type: 'danger'
      });
      return;
    }
    if (!validateEmail(email.trim())) {
      showMessage({
        message: 'Invalid Email Address',
        type: 'danger'
      });
      return;
    }

    var payload = {
      email: email.trim()
    };
    var response = await AuthenticationService.SendForgotPasswordCode(payload);
    if (response) {
      if (response?.success) {
        showMessage({
          message: response?.message,
          type: 'success'
        });
        navigation.navigate('VerificationCode', { email: email.trim(), token: response?.token });
      } else {
        showMessage({
          message: response?.message,
          type: 'danger'
        })
      }
    }
  }

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
            onChangeText={value => setEmail(value)}
            label={'Email Address'}
            value={email}
          />
          <View style={styles.ContinueButtonContainer}>
            <Button title={`Continue`} onPress={handleOnPressContinue} />
          </View>
          <View style={styles.SignInTextContainer}>
            <TouchableOpacity style={styles.SignInTextTouch} onPress={() => navigation.pop()}>
              <Text style={styles.SignInText}>Back to:</Text>
              <Text style={styles.SignInText2}> Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default ForgotPasswordEmailScreen;