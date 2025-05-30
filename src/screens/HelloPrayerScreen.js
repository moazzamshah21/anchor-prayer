import React, {useState, useRef, useEffect} from 'react';
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
import styles from '../styles/HelloPrayerStyle';
import BackHeader from '../components/BackHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
const {width} = Dimensions.get('window');

const HelloPrayerScreen = ({navigation, route}) => {
  const {item} = route?.params;
  return (
    <React.Fragment>
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditPrayerScreen', {
                prayStarted: '',
                item: item,
              });
            }}
            style={{alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/pray2.png')}
              style={{width: 108, height: 84}}
              resizeMode="contain"
            />
            <Text style={styles.HelloFamilyText}>{item?.title}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default HelloPrayerScreen;
