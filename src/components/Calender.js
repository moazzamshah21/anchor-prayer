import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActionSheetIOS,
  Modal,
} from 'react-native';
import moment from 'moment';
//import 'moment-timezone';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');

const Calender = ({...props}) => {
  const {
    onChange,
    value = null,
    currentMonthData = [],
    onPressViewEvent,
  } = props;

  const [selectedDate, setSelectedDate] = useState(value);
  const [isVisible, setIsVisible] = useState(false);
  const [currentDateData, setCurrentDateData] = useState([]);

  const getCurrentMonthDates = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const datesArray = [];
    var calenderPlotIndex = null;
    for (let i = 1; i <= daysInMonth; i++) {
      var date = new Date(year, month, i + 1);
      if (calenderPlotIndex === null) {
        calenderPlotIndex = date.getDay();
      } else {
        calenderPlotIndex++;
      }
      datesArray.push({
        date: date.toISOString().split('T')[0],
        day: date.getDay(),
        calenderPlotIndex: calenderPlotIndex - 1,
      });
    }

    return datesArray;
  };

  const currentMonthDates = getCurrentMonthDates();

  const weeks = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const calenderLength = [0, 1, 2, 3, 4, 5];

  const CalenderItem = ({index}) => {
    var data = currentMonthDates.find(x => x.calenderPlotIndex == index);
    console.log(data);
    return data ? (
      <TouchableOpacity
        disabled={new Date(data.date).getDate() < new Date().getDate()}
        key={`item-${index}`}
        style={
          new Date(data.date).getDate() >= new Date().getDate()
            ? styles.CalenderBodyItem
            : styles.CalenderBodyItemDisable
        }
        onPress={() => {
          setSelectedDate(new Date(data.date).getDate());
          if (onChange) {
            onChange(new Date(data.date).toISOString());
          }
        }}>
        <Text
          style={
            new Date(data.date).getDate() >= new Date().getDate()
              ? styles.CalenderBodyItemText
              : styles.CalenderBodyItemTextDisable
          }>
          {new Date(data.date).getDate()}
        </Text>

        {currentMonthData.filter(
          x =>
            new Date(x.reminderTime).getDate() == new Date(data.date).getDate(),
        ).length > 0 && (
          <TouchableOpacity
            style={styles.ViewEventsTextView}
            onPress={() => {
              setCurrentDateData(
                currentMonthData.filter(
                  x =>
                    new Date(x.reminderTime).getDate() ==
                    new Date(data.date).getDate(),
                ),
              );
              setIsVisible(true);
              if (onPressViewEvent) {
                onPressViewEvent(
                  currentMonthData.filter(
                    x =>
                      new Date(x.reminderTime).getDate() ==
                      new Date(data.date).getDate(),
                  ),
                );
              }
            }}>
            <Text style={styles.ViewEventsText}>view events</Text>
            <Ionicons
              name="eye"
              style={{
                color: ThemeColors.BLACK,
              }}
              size={8}
            />
          </TouchableOpacity>
        )}

        {value &&
          new Date(value).getDate() === new Date(data.date).getDate() && (
            <View style={styles.CalenderItemSelected}></View>
          )}
      </TouchableOpacity>
    ) : (
      <View key={`item-${index}`} style={styles.CalenderBodyItemDisable}></View>
    );
  };

  return (
    <View style={styles.CalenderContainer}>
      <View style={styles.CalenderHeaderContainer}>
        {weeks.map((item, index) => {
          return (
            <View
              key={`header-item-${index}`}
              style={styles.CalenderHeaderItem}>
              <Text style={styles.CalenderHeaderText}>{item}</Text>
            </View>
          );
        })}
      </View>
      {calenderLength.map((item, index) => {
        return (
          <View key={`body-item-${index}`} style={styles.CalenderBodyContainer}>
            {weeks.map((item1, index1) => {
              console.log(getCurrentMonthDates()[0].day);
              return (
                <CalenderItem
                  key={`body-item-child-${index1}`}
                  index={
                    getCurrentMonthDates()[0].day == 0
                      ? index1 + item * 7 - 7
                      : index1 + item * 7
                  }
                />
              );
            })}
          </View>
        );
      })}

      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          setCurrentDateData([]);
          setIsVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {
                setCurrentDateData([]);
                setIsVisible(false);
              }}
              activeOpacity={0.8}
              style={styles.closeBtn}>
              <EntypoIcon
                name="circle-with-cross"
                style={{color: ThemeColors.WHITE}}
                size={30}
              />
            </TouchableOpacity>
            {currentDateData?.map((item, index) => {
              return (
                <View>
                  <Text style={styles.ListText1}>
                    {index + 1}
                    {'.'} {item.name}
                  </Text>
                  <Text style={styles.ListText2}>{item.place}</Text>
                  <Text style={styles.ListText3}>
                    {moment(
                      new Date(item.reminderTime),
                      'ddd DD-MMM-YYYY, hh:mm A',
                    ).format('ddd DD-MMM-YYYY, hh:mm A')}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000063',
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ThemeColors.PRIMARY_COLOR,
    position: 'absolute',
    top: -15,
    right: -15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ListText1: {
    color: ThemeColors.PRIMARY_COLOR,
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 15,
  },
  ListText2: {
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 12,
    marginTop: -5,
  },
  ListText3: {
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 10,
    marginTop: -5,
  },
  modalView: {
    width: 350,
    minHeight: 350,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: ThemeColors.WHITE,
  },
  CalenderContainer: {
    width: width - 40,
    shadowOffset: {width: 10, height: -10},
    shadowColor: ThemeColors.BLACK,
    shadowOpacity: 1,
    elevation: 1,
    shadowRadius: 1,
    backgroundColor: ThemeColors.WHITE,
    borderRadius: 1,
    marginBottom: 7,
    borderWidth: 0.2,
    borderColor: '#464646',
  },
  CalenderHeaderContainer: {
    height: 15,
    width: width - 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  CalenderHeaderItem: {
    backgroundColor: '#f3f3f3',
    width: (width - 40) / 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#A0A0A0',
    borderWidth: 0.5,
  },
  CalenderBodyContainer: {
    flexDirection: 'row',
  },
  CalenderBodyItem: {
    backgroundColor: '#FFF',
    height: 40,
    width: (width - 40) / 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#A0A0A0',
    borderWidth: 0.5,
    position: 'relative',
  },
  CalenderBodyItemDisable: {
    backgroundColor: '#f3f3f3',
    height: 40,
    width: (width - 40) / 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#A0A0A0',
    borderWidth: 0.5,
    position: 'relative',
  },
  CalenderBodyItemText: {
    color: '#000',
    fontSize: 8,
    position: 'absolute',
    top: 0,
    right: 3,
  },
  CalenderBodyItemTextDisable: {
    color: 'gray',
    fontSize: 8,
    position: 'absolute',
    top: 0,
    right: 3,
  },
  CalenderItemSelected: {
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    backgroundColor: '#ABD6DF',
  },
  CalenderHeaderText: {
    fontSize: 6,
    color: ThemeColors?.BLACK,
  },
  ViewEventsTextView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 2,
  },
  ViewEventsText: {
    marginRight: 2,
    fontSize: 5,
    fontFamily: ThemeFonts.BOLD_ITALIC,
  },
});

export default Calender;
