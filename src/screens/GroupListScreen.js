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
  FlatList,
} from 'react-native';
import styles from '../styles/GroupListStyle';
import BackHeader from '../components/BackHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
import GroupListItem from '../components/GroupListItem';
import GroupService from '../services/Group/GroupService';
import {showMessage} from 'react-native-flash-message';
const {width} = Dimensions.get('window');

const GroupListScreen = ({navigation, route}) => {
  const [groupList, setGroupList] = useState([]);

  const onLoadGroupList = async () => {
    var response = await GroupService.getAllGroupList();
    if (response?.success) {
      setGroupList(response?.data);
    } else {
      showMessage({
        message: response?.message,
        type: 'danger',
      });
    }
  };

  useEffect(() => {
    onLoadGroupList();
  }, []);

  const renderGroupList = ({item, index}) => {
    return <GroupListItem navigation={navigation} item={item} index={index} />;
  };

  return (
    <React.Fragment>
      <BackHeader navigation={navigation} title="Join Group" />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <View style={{marginTop: 25}}>
            <Text style={styles.LoginDetailsHeading}>Active Groups</Text>
          </View>
          <View style={{marginTop: 20}}>
            <FlatList
              contentContainerStyle={{paddingHorizontal: 15}}
              data={groupList}
              renderItem={renderGroupList}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{width: width, alignSelf: 'center'}}
            />
          </View>
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

export default GroupListScreen;
