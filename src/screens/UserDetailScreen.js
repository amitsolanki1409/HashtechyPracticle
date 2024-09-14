// import React from 'react';
// import { View, Text } from 'react-native';

// const UserDetailScreen = ({ route }) => {
//     const { user } = route.params;

//     return (
//         <View>
//             <Text>{user.name.first} {user.name.last}</Text>
//             <Text>Email: {user.email}</Text>
//             <Text>Phone: {user.phone}</Text>
//             {/* Add more user details as needed */}
//         </View>
//     );
// };

// export default UserDetailScreen;


import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const UserDetailScreen = ({ route }) => {
    const { user } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* User Image */}
            <Image source={{ uri: user.picture.large }} style={styles.userImage} resizeMode='contain' />

            {/* User Name */}
            <Text style={styles.userName}>
                {user.name.title} {user.name.first} {user.name.last}
            </Text>

            {/* User Details */}
            <View style={styles.detailsContainer}>
                <Text style={styles.label}>Gender: <Text style={styles.value}>{user.gender}</Text></Text>
                <Text style={styles.label}>Email: <Text style={styles.value}>{user.email}</Text></Text>
                <Text style={styles.label}>Phone: <Text style={styles.value}>{user.phone}</Text></Text>
                <Text style={styles.label}>Cell: <Text style={styles.value}>{user.cell}</Text></Text>
                <Text style={styles.label}>Date of Birth: <Text style={styles.value}>{new Date(user.dob.date).toLocaleDateString()}</Text></Text>

                {/* Address */}
                <Text style={styles.label}>Address:</Text>
                <Text style={styles.value}>
                    {user.location.street.number} {user.location.street.name}, {'\n'}
                    {user.location.city}, {user.location.state}, {'\n'}
                    {user.location.country}, {user.location.postcode}
                </Text>

                {/* Coordinates */}
                <Text style={styles.label}>Coordinates:</Text>
                <Text style={styles.value}>
                    Latitude: {user.location.coordinates.latitude}, Longitude: {user.location.coordinates.longitude}
                </Text>

                {/* Timezone */}
                <Text style={styles.label}>Timezone: <Text style={styles.value}>{user.location.timezone.description}</Text></Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
    },
    userImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: 'black'
    },
    detailsContainer: {
        width: '100%',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 10,
        color: 'gray'
    },
    value: {
        fontSize: 16,
        fontWeight: '400',
        color: 'gray'
    },
});

export default UserDetailScreen;
