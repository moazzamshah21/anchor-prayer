import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react';
  import {ThemeColors, ThemeFonts} from '../utils/Theme';
  
  const {width} = Dimensions.get('window');
  
  const MyGroupListItem = ({item, navigation}) => {
    const handlePress = () => {
      navigation.navigate('ActiveGroupScreen', {groupId: item._id});
    };
  
    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.renderItemStyle}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.NameTExt}>{item?.name}</Text>
              <Text style={styles.DescText}>
                {item?.activeMemberCount || item?.activeMembersCount} active members
              </Text>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center', width: 80}}>
              <Text style={[styles.DescText, {color: ThemeColors.PRIMARY}]}>
                Joined
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  export default MyGroupListItem;
  
  const styles = StyleSheet.create({
    renderItemStyle: {
      width: width - 50,
      height: 67,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: ThemeColors?.DARK_GRAY,
      alignSelf: 'center',
      marginVertical: 7,
      justifyContent: 'center',
      paddingHorizontal: 30,
    },
    NameTExt: {
      fontSize: 15,
      fontFamily: ThemeFonts.MEDIUM,
      color: ThemeColors.BLACK,
    },
    DescText: {
      fontSize: 10,
      fontFamily: ThemeFonts.MEDIUM,
      color: ThemeColors.DARK_GRAY,
    },
  });