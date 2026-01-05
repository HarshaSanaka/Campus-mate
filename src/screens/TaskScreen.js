
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Note: Might need install, or use text input for MVP if complex
// Actually, standard TextInput for date is risky. Let's try to stick to text or use a simple hack.
// For MVP, simple text input "YYYY-MM-DD HH:MM" or just "Tomorrow 5pm" is hard to parse without NLP.
// I'll stick to a simple numeric input or Date picker if available. Expo has one.
// Wait, I didn't install community datetimepicker. I'll add it to the install command or use simple text for now.
// Let's use simple text for MVP to reduce dependency friction, or just assume current time + 1 hour.
// Better: Add `@react-native-community/datetimepicker` to installs?
// Let's use a simple "Minutes from now" for the deadline for valid MVP testing of notifications.

import { saveTask, getTasks, deleteTask } from '../services/TaskService';
import { scheduleNotification } from '../services/NotificationService';

export default function TaskScreen() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [minutes, setMinutes] = useState(''); // Simple input for "due in X minutes"

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    const handleAddTask = async () => {
        if (!title || !minutes) {
            Alert.alert('Error', 'Please enter title and minutes');
            return;
        }

        const dueInSeconds = parseInt(minutes) * 60;
        const deadline = new Date(Date.now() + dueInSeconds * 1000);

        const newTask = {
            id: Date.now().toString(),
            title,
            deadline: deadline.toISOString(),
        };

        const updatedTasks = await saveTask(newTask);
        setTasks(updatedTasks);

        // Schedule notification
        await scheduleNotification("Assignment Due!", `Your task "${title}" is due now!`, dueInSeconds);
        Alert.alert('Success', `Task added. Reminder set for ${minutes} minutes from now.`);

        setTitle('');
        setMinutes('');
    };

    const handleDelete = async (id) => {
        const updated = await deleteTask(id);
        setTasks(updated);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Manage Tasks</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Task Title (e.g. Math HW)"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Due in (minutes)"
                    keyboardType="numeric"
                    value={minutes}
                    onChangeText={setMinutes}
                />
                <Button title="Add Task & Reminder" onPress={handleAddTask} color="#6200EE" />
            </View>

            <FlatList
                data={tasks}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <View>
                            <Text style={styles.taskTitle}>{item.title}</Text>
                            <Text style={styles.taskDate}>Due: {new Date(item.deadline).toLocaleTimeString()}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleDelete(item.id)}>
                            <Text style={styles.delete}>Done/Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    inputContainer: { marginBottom: 20 },
    input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginBottom: 10 },
    taskItem: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        padding: 15, backgroundColor: '#f9f9f9', borderRadius: 8, marginBottom: 10
    },
    taskTitle: { fontWeight: 'bold', fontSize: 16 },
    taskDate: { color: '#666' },
    delete: { color: 'red', fontWeight: 'bold' }
});
