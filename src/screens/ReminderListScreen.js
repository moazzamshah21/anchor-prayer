import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  FlatList,
} from 'react-native';
import styles from '../styles/ReminderListStyle';
import BackHeader from '../components/BackHeader';
import {ThemeFonts} from '../utils/Theme';
import ReminderService from '../services/Reminder/ReminderService';
import {showMessage} from 'react-native-flash-message';

const ReminderListScreen = ({navigation, route}) => {
  const [allReminders, setAllReminders] = useState([]);

  const onLoadReminders = async () => {
    var response = await ReminderService.GetAllReminders();
    if (response?.success) {
      setAllReminders(response?.reminders);
    } else {
      setAllReminders([]);
      showMessage({
        message: response?.message,
        type: 'danger',
      });
    }
  };

  useEffect(() => {
    onLoadReminders();
  }, []);

  const reminderListRenderItem = ({item, index}) => {
    const date = new Date(item?.createdAt);
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    const formattedDate = date.toLocaleDateString('en-US', options);
    return (
      <View style={styles.ReminderListMainView}>
        <View style={{width: '45%'}}>
          <Text numberOfLines={1} style={styles.ReminderNameText}>
            {item?.name}
          </Text>
          <Text numberOfLines={2} style={styles.ReminderNameText2}>
            {item?.description}
          </Text>
        </View>
        <Text style={[styles.ReminderNameText2, {textAlign: 'right'}]}>
          {formattedDate}
        </Text>
      </View>
    );
  };

  return (
    <React.Fragment>
      <BackHeader navigation={navigation} title="Reminder List" />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <View style={styles.MainBody}>
            <FlatList
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>No data found</Text>
                  </View>
                );
              }}
              data={allReminders}
              renderItem={reminderListRenderItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginTop: 20}}
            />
          </View>
          <View>
            <View style={styles.TextView}>
              <Text style={styles.CompanyBrandingText}>
                Designed by:{'\n'}digitalsoftwarelabs.com
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default ReminderListScreen;
