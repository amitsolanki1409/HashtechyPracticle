import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserListItem = ({ item }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.userContainer}
            onPress={() => navigation.navigate('UserDetail', { user: item })}
        >
            {/* User Image */}
            <Image source={{ uri: item.picture.thumbnail }} style={styles.userImage} />

            {/* User Info */}
            <View style={styles.userInfo}>
                <Text style={styles.userName}>
                    {item.name.title} {item.name.first} {item.name.last}
                </Text>
                <Text style={styles.userGender}>Gender: {item.gender}</Text>
                <Text style={styles.userPhone}>Phone: {item.phone}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
        color: 'black',
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

export default UserListItem;
