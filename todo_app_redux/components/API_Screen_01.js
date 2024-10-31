import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const API_Screen_01 = ({ navigation }) => {
    const [name, setName] = useState('');

    const handleGetStarted = () => {
        navigation.navigate('API_Screen_02', { name });
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/5b937be1b90fdfcf5992fcf1bbeace1e.png')} style={styles.image} />
            <Text style={styles.title}>MANAGE YOUR TASK</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
            />
            <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, marginVertical: 20, fontWeight: 'bold', color: 'purple' },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', paddingHorizontal: 10, marginBottom: 20 },
    image: { width: 100, height: 100 },
    button: { backgroundColor: '#00bfff', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 25 },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default API_Screen_01;
