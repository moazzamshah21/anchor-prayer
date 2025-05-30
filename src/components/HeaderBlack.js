import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BellIcon} from '../../assets/svg/SvgIcons';
import Button from './Button';

const {width, height} = Dimensions.get('window');

const HeaderBlack = ({
  navigation, 
  lessThenIcon, 
  Name, 
  noModal,
  showBackButton = true,
  onBackPress,
  showCrossIcon = false
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOnPressMenu = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  const handleOnBellMenu = () => {};

  return (
    <View style={styles.MainContainer}>
      {showBackButton && (
        <View style={styles.TouchItem}>
          <TouchableOpacity onPress={handleOnPressMenu}>
            {showCrossIcon ? (
              <TouchableOpacity
                onPress={() => {
                  noModal ? handleOnPressMenu() : setModalVisible(true);
                }}>
                <EntypoIcon
                  name="cross"
                  style={{color: ThemeColors.WHITE}}
                  size={20}
                />
              </TouchableOpacity>
            ) : (
              <AntDesign
                name="left"
                style={{color: ThemeColors.WHITE}}
                size={20}
              />
            )}
          </TouchableOpacity>
        </View>
      )}
      
      <View style={[
        styles.LogoContainer, 
        !showBackButton && {marginLeft: 55} // Add margin if back button is hidden
      ]}>
        <Text style={styles.FinishPrayingHeading}>{Name}</Text>
      </View>
      
      <View style={[styles.TouchItem, {alignItems: 'flex-end'}]}>
        <TouchableOpacity onPress={handleOnBellMenu}></TouchableOpacity>
      </View>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={require('../../assets/images/blackhand.png')}
              style={{width: 90, height: 70}}
              resizeMode="contain"
            />
            <Image
              source={require('../../assets/images/exclam.png')}
              style={{width: 22, height: 22, marginTop: -20, marginLeft: 65}}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.ModalTextSubStyle}>DISCARD PRAYER!</Text>
              <Text style={styles.ModalTextStyle}>
                Are you sure you want to{'\n'}discard your prayer!
              </Text>
              <View>
                <Button
                  modalBtn
                  title={`Yes, Discard`}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('Home');
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                  }}>
                  <Text style={styles.NeverMindText}>or, Nevermind</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HeaderBlack;

const styles = StyleSheet.create({
  MainContainer: {
    height: 55,
    backgroundColor: ThemeColors?.BLACK,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  LogoContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TouchItem: {
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FinishPrayingHeading: {
    fontSize: 20,
    fontFamily: ThemeFonts.MEDIUM,
    color: ThemeColors.WHITE,
  },
  centeredView: {
    flex: 1,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000c1',
  },
  modalView: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: width - 40,
    borderRadius: 30,
    borderColor: '#FFF',
    borderWidth: 1,
    paddingVertical: 40,
  },
  ModalTextStyle: {
    fontSize: 15,
    color: ThemeColors.DARK_GRAY,
    fontFamily: ThemeFonts.MEDIUM,
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 12,
  },
  ModalTextSubStyle: {
    fontSize: 15,
    color: ThemeColors.DARK_GRAY,
    fontFamily: ThemeFonts.BOLD,
    textAlign: 'center',
  },
  NeverMindText: {
    fontSize: 15,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.REGULAR,
    textAlign: 'center',
    marginTop: 5,
  },
});