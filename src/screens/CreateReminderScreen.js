import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import styles from '../styles/CreateReminderStyle';
import BackHeader from '../components/BackHeader';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
import Calender from '../components/Calender';
import ReminderService from '../services/Reminder/ReminderService';
import {showMessage} from 'react-native-flash-message';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateReminderScreen = ({navigation, route}) => {
  const [reminderDate, setReminderDate] = useState('');
  const [reminderName, setReminderName] = useState('');
  const [reminderNotes, setReminderNotes] = useState('');
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onPressCreateReminder = async () => {
    if (reminderDate == '') {
      showMessage({
        message: 'Please select date',
        type: 'danger',
      });
      return;
    } else if (reminderName == '') {
      showMessage({
        message: 'Please enter title',
        type: 'danger',
      });
      return;
    } else if (reminderNotes == '') {
      showMessage({
        message: 'Please enter reminder notes',
        type: 'danger',
      });
      return;
    }

    // Combine date and time
    const dateObj = new Date(reminderDate);
    const timeObj = new Date(selectedTime);
    
    dateObj.setHours(timeObj.getHours());
    dateObj.setMinutes(timeObj.getMinutes());
    dateObj.setSeconds(0);

    const isoDateTime = dateObj.toISOString();

    var payload = {
      time: isoDateTime,
      name: reminderName,
      description: reminderNotes,
    };

    var response = await ReminderService.AddReminder(payload);
    if (response?.success) {
      setReminderDate('');
      setReminderName('');
      setReminderNotes('');
      showMessage({
        message: response?.message,
        type: 'success',
      });
      navigation.navigate('ReminderListScreen');
    } else {
      showMessage({
        message: response?.message,
        type: 'danger',
      });
    }
  };

  const onTimeChange = (event, selectedDate) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setSelectedTime(selectedDate);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <React.Fragment>
      <BackHeader navigation={navigation} title="Create Reminder" />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <View style={styles.MainBody}>
            <View style={styles.CalenderView1}>
              <Calender
                currentMonthData={[]}
                value={reminderDate}
                onChange={value => {
                  setReminderDate(value);
                }}
                onPressViewEvent={data => {
                  //console.log(data);
                }}
              />
            </View>

            {/* Time Picker */}
            <TouchableOpacity 
              style={styles.TextInputStyle}
              onPress={() => setShowTimePicker(true)}>
              <Text style={{
                fontSize: 15,
                fontFamily: ThemeFonts.MEDIUM,
                color: ThemeColors.DARK_GRAY,
                paddingHorizontal: 15,
              }}>
                {selectedTime ? formatTime(selectedTime) : 'Select Time'}
              </Text>
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={selectedTime}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={onTimeChange}
              />
            )}

            <View style={styles.TextInputStyle}>
              <TextInput
                style={{
                  fontSize: 15,
                  fontFamily: ThemeFonts.MEDIUM,
                  color: ThemeColors.DARK_GRAY,
                  paddingHorizontal: 15,
                }}
                placeholder="Reminder Name"
                placeholderTextColor={ThemeColors.LIGHT_GRAY}
                value={reminderName}
                onChangeText={x => setReminderName(x)}
              />
            </View>
            <View style={styles.TextInputStyle}>
              <TextInput
                style={{
                  fontSize: 15,
                  fontFamily: ThemeFonts.MEDIUM,
                  color: ThemeColors.DARK_GRAY,
                  paddingHorizontal: 15,
                }}
                placeholder="Reminder Notes"
                placeholderTextColor={ThemeColors.LIGHT_GRAY}
                value={reminderNotes}
                onChangeText={x => setReminderNotes(x)}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={onPressCreateReminder}
            style={styles.BtnStyleView}>
            <Text style={styles.ReminderNameTexr}>Create Reminder</Text>
          </TouchableOpacity>
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

export default CreateReminderScreen;