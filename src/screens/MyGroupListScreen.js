import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  Dimensions
} from 'react-native';
import BackHeader from '../components/BackHeader';
import GroupListItem from '../components/GroupListItem';
import GroupService from '../services/Group/GroupService';
import {showMessage} from 'react-native-flash-message';

const {width} = Dimensions.get('window');

const MyGroupListScreen = ({navigation, route}) => {
  const [groupList, setGroupList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadGroups = async () => {
    try {
      setLoading(true);
      const response = await GroupService.getAllGroupList();
      
      if (response?.success) {
        setGroupList(response.data || []);
      } else {
        showMessage({
          message: response?.message || 'Failed to load groups',
          type: 'danger',
        });
      }
    } catch (error) {
      console.error('Group load error:', error);
      showMessage({
        message: 'An error occurred while loading groups',
        type: 'danger',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadGroups();
  };

  const renderGroupList = ({item}) => (
    <GroupListItem 
      navigation={navigation} 
      item={item}
      onRefresh={handleRefresh}
    />
  );

  const handleCreateGroup = () => {
    navigation.navigate('CreateGroupScreen');
  };

  return (
    <View style={styles.container}>
      <BackHeader navigation={navigation} title="My Groups" />
      
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }>
        <View style={styles.content}>
          <Text style={styles.heading}>My Groups</Text>

          {loading && groupList.length === 0 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" />
              <Text style={styles.loadingText}>Loading groups...</Text>
            </View>
          ) : groupList.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No groups available</Text>
              <TouchableOpacity
                onPress={handleCreateGroup}
                style={styles.createButton}>
                <Text style={styles.createButtonText}>Create A Group</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={groupList}
              renderItem={renderGroupList}
              keyExtractor={item => item._id}
              scrollEnabled={false}
              contentContainerStyle={styles.listContainer}
              style={{width: width, alignSelf: 'center'}}
            />
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Designed by:{'\n'}digitalsoftwarelabs.com
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  createButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    textAlign: 'center',
    color: '#666',
  },
});

export default MyGroupListScreen;