import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Switch,
} from 'react-native';
import styles from '../styles/SettingStyle';
import BackHeader from '../components/BackHeader';
import { ThemeColors } from '../utils/Theme';

const SettingScreen = ({ navigation, route }) => {

  const [realTimeNotificationEnabled, setRealTimeNotificationEnabled] = useState(false);
  const [otherNotificationEnabled, setOtherNotificationEnabled] = useState(false);
  const [communityFeedsNotificationEnabled, setCommunityFeedsNotificationEnabled] = useState(false);
  const [otherFeedsNotificationEnabled, setOtherFeedsNotificationEnabled] = useState(false);

  const toggleRealTimeNotificationSwitch = () => setRealTimeNotificationEnabled(previousState => !previousState);
  const toggleOtherNotificationSwitch = () => setOtherNotificationEnabled(previousState => !previousState);
  const toggleCommunityFeedsNotificationSwitch = () => setCommunityFeedsNotificationEnabled(previousState => !previousState);
  const toggleOtherFeedsNotificationSwitch = () => setOtherFeedsNotificationEnabled(previousState => !previousState);

  return (
    <React.Fragment>
      <BackHeader navigation={navigation} title="Settings" />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
            <Text style={styles.NotificationsText}>Notifications</Text>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Text style={styles.RealTimeText}>Real-Time Notification</Text>
              <View
                style={{
                  borderRadius: 20,
                  width: 42,
                  height: 22,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: ThemeColors?.BLACK,
                  borderWidth: 1,
                }}>
                <Switch
                  trackColor={{
                    false: ThemeColors?.WHITE,
                    true: ThemeColors?.WHITE,
                  }}
                  thumbColor={realTimeNotificationEnabled ? '#ABD6DF' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleRealTimeNotificationSwitch}
                  value={realTimeNotificationEnabled}
                />
              </View>
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 15,
                alignItems: 'center',
                marginBottom: 25,
              }}>
              <Text style={styles.RealTimeText}>Other Notification</Text>
              <View
                style={{
                  borderRadius: 20,
                  width: 42,
                  height: 22,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: ThemeColors?.BLACK,
                  borderWidth: 1,
                }}>
                <Switch
                  trackColor={{
                    false: ThemeColors?.WHITE,
                    true: ThemeColors?.WHITE,
                  }}
                  thumbColor={otherNotificationEnabled ? '#ABD6DF' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleOtherNotificationSwitch}
                  value={otherNotificationEnabled}
                />
              </View>
            </View>
            <View style={styles.GrayDivider} />
            <View style={{ marginTop: 20 }}>
              <Text style={styles.NotificationsText}>Community:</Text>
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Text style={styles.RealTimeText}>Community Feeds</Text>
              <View
                style={{
                  borderRadius: 20,
                  width: 42,
                  height: 22,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: ThemeColors?.BLACK,
                  borderWidth: 1,
                }}>
                <Switch
                  trackColor={{
                    false: ThemeColors?.WHITE,
                    true: ThemeColors?.WHITE,
                  }}
                  thumbColor={communityFeedsNotificationEnabled ? '#ABD6DF' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleCommunityFeedsNotificationSwitch}
                  value={communityFeedsNotificationEnabled}
                />
              </View>
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 15,
                alignItems: 'center',
                marginBottom: 25,
              }}>
              <Text style={styles.RealTimeText}>Other Feeds</Text>
              <View
                style={{
                  borderRadius: 20,
                  width: 42,
                  height: 22,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: ThemeColors?.BLACK,
                  borderWidth: 1,
                }}>
                <Switch
                  trackColor={{
                    false: ThemeColors?.WHITE,
                    true: ThemeColors?.WHITE,
                  }}
                  thumbColor={otherFeedsNotificationEnabled ? '#ABD6DF' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleOtherFeedsNotificationSwitch}
                  value={otherFeedsNotificationEnabled}
                />
              </View>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.SaveAndContinueBtn}>
            <Text style={styles.SaveTExt}>Save & Continue</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', marginVertical: 10 }}>
          <Text style={styles.LogoText}>
            Designed by:{'\n'}digitalsoftwarelabs.com
          </Text>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default SettingScreen;
