import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/slices/userSlice';
import { useNavigation } from '@react-navigation/native';
import UserListItem from '../components/UserListItem';

const UserListScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { users, loading, hasMore, error } = useSelector((state) => state.users); // Assuming `hasMore` is part of state to track if there are more users to load.
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);

    // Show error alert if there's an error
    useEffect(() => {
        if (error) {
            Alert.alert("Error While Getting Data", error); // Display the error using Alert
        }
    }, [error]);

    // Fetch the first page when the component loads
    useEffect(() => {
        //fetching user data from  thunk api calling from usersSlice
        dispatch(fetchUsers(page));
    }, [dispatch, page]);


    // Handle infinite scrolling
    const loadMoreUsers = () => {
        if (hasMore && !loading) {
            setPage((prevPage) => prevPage + 1); // Load next page
        }
    };

    // Handle pull-to-refresh
    const handleRefresh = () => {
        setRefreshing(true);
        setPage(1); // Reset to the first page
        dispatch(fetchUsers(1)).finally(() => setRefreshing(false)); // Refresh the user list
    };

    return (
        <View style={styles.container}>

            {users.length > 0 && error == null ?
                <FlatList
                    data={users}
                    // renderItem={renderItem}
                    renderItem={({ item }) => <UserListItem item={item} />} // Use the new UserListItem component
                    keyExtractor={(item) => item.login.uuid}
                    contentContainerStyle={styles.listContainer}
                    onEndReached={loadMoreUsers} // Infinite scroll handler
                    onEndReachedThreshold={0.5} // Trigger when 50% away from the bottom
                    ListFooterComponent={loading ? <ActivityIndicator size="small" color="#0000ff" /> : null} // Show loading spinner at bottom
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} /> // Pull-to-refresh handler
                    }
                />
                :
                !loading &&
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'gray' }}>No record found!!!</Text>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        padding: 16,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: '600',
        color: 'black'
    },
    userGender: {
        fontSize: 14,
        color: '#6b6b6b',
    },
    userPhone: {
        fontSize: 14,
        color: '#6b6b6b',
    },
});

export default UserListScreen;
