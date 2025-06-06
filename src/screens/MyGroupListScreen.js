import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import styles from '../styles/GroupListStyle';
import BackHeader from '../components/BackHeader';
import MyGroupListItem from '../components/MyGroupListItem';
import GroupService from '../services/Group/GroupService';
import {showMessage} from 'react-native-flash-message';
import {ThemeColors} from '../utils/Theme';

const {width, height} = Dimensions.get('window');

const MyGroupListScreen = ({navigation, route}) => {
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJoinedGroups = async () => {
    try {
      setLoading(true);
      const response = await GroupService.MyGroups();
      
      if (response?.success) {
        const formattedGroups = Array.isArray(response.data) ? 
          response.data.map(group => ({
            ...group,
            activeMembersCount: group['activeMember#Count'] || group.activeMembersCount
          })) : [];
        
        setJoinedGroups(formattedGroups);
      } else {
        showMessage({
          message: response?.message || 'Failed to load joined groups',
          type: 'danger',
        });
        setJoinedGroups([]);
      }
    } catch (error) {
      showMessage({
        message: 'An error occurred while fetching groups',
        type: 'danger',
      });
      console.error('Error fetching joined groups:', error);
      setJoinedGroups([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoinedGroups();
  }, []);

  const renderGroupItem = ({item, index}) => {
    return <MyGroupListItem item={item} navigation={navigation} key={index} />;
  };

  return (
    <>
      <BackHeader navigation={navigation} title="My Joined Groups" />
      
      <FlatList
        data={joinedGroups}
        renderItem={renderGroupItem}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingBottom: 20,
          flexGrow: 1,
          minHeight: height // Ensure minimum height of screen
        }}
        ListHeaderComponent={
          <View style={styles.MainContainer}>
            <View style={{marginTop: 25}}>
              <Text style={styles.LoginDetailsHeading}>My Groups</Text>
            </View>
            {loading ? (
              <View style={{padding: 20, alignItems: 'center'}}>
                <ActivityIndicator size="large" color={ThemeColors.PRIMARY} />
                <Text style={{marginTop: 10}}>Loading your groups...</Text>
              </View>
            ) : joinedGroups.length === 0 ? (
              <View style={{padding: 20, alignItems: 'center'}}>
                <Text>You haven't joined any groups yet.</Text>
              </View>
            ) : null}
          </View>
        }
        ListFooterComponent={
          <View style={{
            alignItems: 'center',
            marginTop: 20,
            paddingBottom: 20
          }}>
            <Text style={styles.LogoText}>
              Designed by:{'\n'}digitalsoftwarelabs.com
            </Text>
          </View>
        }
        ListEmptyComponent={
          !loading && (
            <View style={{padding: 20, alignItems: 'center'}}>
              <Text>You haven't joined any groups yet.</Text>
            </View>
          )
        }
      />
    </>
  );
};

export default MyGroupListScreen;