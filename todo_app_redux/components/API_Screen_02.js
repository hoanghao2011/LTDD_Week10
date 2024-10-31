import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';

const API_Screen_02 = ({ route, navigation }) => {
    const { name } = route.params;
    const [searchText, setSearchText] = useState('');
    const [tasks, setTasks] = useState([]);

    // Fetch tasks from API
    useEffect(() => {
        fetch('https://670fdb9da85f4164ef2c393a.mockapi.io/job')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const toggleTask = (id) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const confirmDelete = (id) => {
        Alert.alert(
            "Delete Task",
            "Are you sure you want to delete this task?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => deleteTask(id) }
            ]
        );
    };

    // Function to delete a task from API
const deleteTask = (id) => {
    fetch(`https://670fdb9da85f4164ef2c393a.mockapi.io/job/${id}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
            } else {
                console.error('Failed to delete the task from API.');
            }
        })
        .catch(error => console.error('Error deleting task:', error));
};


    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderItem = ({ item }) => (
        <View style={styles.taskItem}>
            <TouchableOpacity onPress={() => toggleTask(item.id)} style={styles.checkbox}>
                {item.completed && <Text style={styles.checkmark}>✔</Text>}
            </TouchableOpacity>
            <Text style={[styles.taskTitle, item.completed && styles.completedTask]}>
                {item.title}
            </Text>
            <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('API_Screen_03', { task: item })}>
                    <Text style={styles.editText}>✎</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                    <Text style={styles.deleteText}>🗑</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.greeting}>Hi {name}, Have a great day ahead</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search tasks..."
                value={searchText}
                onChangeText={setSearchText}
            />
            <FlatList
                data={filteredTasks}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={<Text style={styles.emptyText}>No tasks available</Text>}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('API_Screen_03')}>
                <Text style={styles.addText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    greeting: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checkmark: {
        color: 'green',
        fontSize: 16,
    },
    taskTitle: {
        flex: 1,
        fontSize: 16,
    },
    completedTask: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editText: {
        color: 'red',
        fontSize: 16,
        marginLeft: 10,
    },
    deleteText: {
        color: 'darkred',
        fontSize: 16,
        marginLeft: 10,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        color: 'gray',
    },
    addButton: {
        backgroundColor: '#00bfff',
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        right: 20,
    },
    addText: {
        color: '#fff',
        fontSize: 30,
    },
});

export default API_Screen_02;
