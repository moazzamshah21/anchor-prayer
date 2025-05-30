import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import BackHeader from '../components/BackHeader';
import GroupService from '../services/Group/GroupService';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';

const SelectGroupScreen = ({navigation, route}) => {
  const {onSelect} = route.params;
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const userGroups = useSelector(state => state.GroupReducer.userGroups);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        // You might want to fetch groups from API or use Redux store
        setGroups(userGroups || []);
      } catch (error) {
        showMessage({
          message: 'Failed to load groups',
          type: 'danger',
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadGroups();
  }, []);

  const handleSelectGroup = (group) => {
    onSelect(group);
  };

  return (
    <View style={styles.container}>
      <BackHeader navigation={navigation} title="Select Group" />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={groups}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.groupItem}
              onPress={() => handleSelectGroup(item)}>
              <Text style={styles.groupName}>{item.name}</Text>
              <Text style={styles.memberCount}>
                {item.members?.length || 0} members
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No groups available</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  memberCount: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default SelectGroupScreen;