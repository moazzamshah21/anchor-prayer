import React, { useState, useEffect } from 'react';
import TextBox from '../components/TextBox';
import PhoneTextBox from '../components/PhoneTextBox';
import Button from '../components/Button';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from '../styles/SignUpStyle';
import { ThemeColors } from '../utils/Theme';
import { validatePhoneNumber, validateEmail } from '../utils/Helper';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import { showMessage } from "react-native-flash-message";
import AuthenticationService from '../services/Authentication/AuthenticationService';

const SignUpScreen = ({ navigation }) => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState({});
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOnPressSignUp = async () => {
    if (!fullName) {
      showMessage({
        message: 'Full Name must be required',
        type: 'danger'
      });
      return;
    }
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
    if (!phoneNumber.value) {
      showMessage({
        message: 'Phone Number must be required',
        type: 'danger'
      });
      return;
    }
    if (!validatePhoneNumber(`${phoneNumber.dialCode}${phoneNumber.value}`, phoneNumber.code)) {
      showMessage({
        message: 'Invalid Phone Number',
        type: 'danger'
      });
      return;
    }
    if (!password) {
      showMessage({
        message: 'Password must be required',
        type: 'danger'
      });
      return;
    }
    if (!confirmPassword) {
      showMessage({
        message: 'Confirm Password must be required',
        type: 'danger'
      });
      return;
    }
    if (password != confirmPassword) {
      showMessage({
        message: 'Password not match',
        type: 'danger'
      });
      return;
    }
    var payload = {
      fullName: fullName,
      email: email.trim(),
      phoneNumber: `${phoneNumber.dialCode}${phoneNumber.value}`,
      password: password
    }
    var response = await AuthenticationService.Register(payload);
    if (response?.success) {
      console.log(`Email Verify Code: ${response.code}`);
      navigation.navigate('EmailVerify', { token: response.token, email: email.trim() })
    } else {
      showMessage({
        message: response?.message,
        type: 'danger'
      })
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.ScrollViewContentContainerStyle} showsVerticalScrollIndicator={false}>
      <View style={styles.MainContainer}>
        <View style={styles.LogoContainer}>
          <Image source={require('../../assets/images/Logo.png')} style={{ width: 250, height: 150 }} resizeMode='contain' />
        </View>
        <View style={styles.ContentContainer}>
          <TextBox
            onChangeText={value => setFullName(value)}
            label={'Full Name'}
            value={fullName}
          />
          <TextBox
            onChangeText={value => setEmail(value)}
            label={'Email Address'}
            value={email}
          />
          <PhoneTextBox
            onChangeText={item => setPhoneNumber(item)}
            label={'Phone Number'}
            value={phoneNumber.value}
          />
          <TextBox
            onChangeText={value => setPassword(value)}
            label={'Password'}
            value={password}
            secureTextEntry={true}
          />
          <TextBox
            onChangeText={value => setConfirmPassword(value)}
            label={'Confirm Password'}
            value={confirmPassword}
            secureTextEntry={true}
          />
          <View style={styles.SignUpButtonContainer}>
            <Button title={`Sign Up`} onPress={handleOnPressSignUp} />
          </View>
          <View style={styles.SignInTextContainer}>
            <TouchableOpacity style={styles.SignInTextTouch} onPress={() => navigation.pop()}>
              <Text style={styles.SignInText}>Already have an account?</Text>
              <Text style={styles.SignInText2}> Sign In</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.SocialLoginContainer}>
            <View style={styles.SocialLoginCircleContainer}>
              <FontAwesome5Pro name="apple" style={{ color: ThemeColors.WHITE }} size={20} />
            </View>
            <View style={styles.SocialLoginCircleContainer}>
              <FontAwesome5Pro name="facebook-f" style={{ color: ThemeColors.WHITE }} size={20} />
            </View>
            <View style={styles.SocialLoginCircleContainer}>
              <FontAwesome5Pro name="google" style={{ color: ThemeColors.WHITE }} size={20} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default SignUpScreen;