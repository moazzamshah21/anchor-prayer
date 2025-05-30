import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import styles from '../styles/CreatePrayStyle';
import HeaderBlack from '../components/HeaderBlack';

const CreatePrayScreen = ({navigation, route}) => {
  const {name} = route?.params;
  return (
    <React.Fragment>
      <HeaderBlack Name={'Create Pray'} navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <Image
            source={require('../../assets/images/blackhand.png')}
            style={{width: 108, height: 88}}
            resizeMode="contain"
          />
          <Text style={styles.DescText}>
            Add your first prayer to use{'\n'}the Pray Now feature.
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PrayScreen', {
                name: name,
              });
            }}>
            <Image
              source={require('../../assets/images/plusplus.png')}
              style={{width: 105, height: 105, marginTop: 10}}
              resizeMode="contain"
            />
          </TouchableOpacity>
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

export default CreatePrayScreen;
