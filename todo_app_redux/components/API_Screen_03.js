import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const API_Screen_03 = ({ navigation }) => {
    const [job, setJob] = useState('');

    const handleAddJob = () => {
        // You would dispatch an action to add the job here
        navigation.goBack();  
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ADD YOUR JOB</Text>
            <TextInput
                style={styles.input}
                placeholder="Input your job"
                value={job}
                onChangeText={setJob}
            />
            <Button title="FINISH" onPress={handleAddJob} color="#00bfff" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, width: '100%', paddingHorizontal: 10, marginBottom: 20, borderRadius: 5 },
});

export default API_Screen_03;
