import React, { useState, useEffect } from 'react';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import { ThemeColors } from '../utils/Theme';
import styles from '../styles/ForgotPasswordStyle';
import { showMessage } from "react-native-flash-message";
import AuthenticationService from '../services/Authentication/AuthenticationService';

const ForgotPasswordScreen = ({ navigation, route }) => {

  const { email = "", code = "", token = "" } = route.params;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOnPressUpdate = async () => {
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
      code,
      email: email.trim(),
      password,
      token
    }
    var response = await AuthenticationService.ForgotPassword(payload);
    if (response?.success) {
      showMessage({
        message: response?.message,
        type: 'success'
      })
      navigation.pop();
    } else {
      showMessage({
        message: response?.message,
        type: 'danger'
      });
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
          <View style={styles.UpdateButtonContainer}>
            <Button title={`Update`} onPress={handleOnPressUpdate} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default ForgotPasswordScreen;