
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getTasks } from '../services/TaskService';

export default function HomeScreen() {
    const navigation = useNavigation();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const loadTasks = async () => {
            const data = await getTasks();
            setTasks(data);
        };
        const unsubscribe = navigation.addListener('focus', loadTasks);
        return unsubscribe;
    }, [navigation]);

    const renderTask = ({ item }) => (
        <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDate}>{new Date(item.deadline).toLocaleString()}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Hello, Student!</Text>
                <Text style={styles.subtext}>Ready to ace your exams?</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Upcoming Deadlines</Text>
                {tasks.length === 0 ? (
                    <Text style={styles.emptyText}>No upcoming tasks. Great job!</Text>
                ) : (
                    <FlatList
                        data={tasks}
                        renderItem={renderTask}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                )}
            </View>

            <View style={styles.actionsGrid}>
                <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#E0F7FA' }]} onPress={() => navigation.navigate('Tasks')}>
                    <Text style={styles.actionText}>Manage Tasks</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#F3E5F5' }]} onPress={() => navigation.navigate('AIChat')}>
                    <Text style={styles.actionText}>Ask AI Doubt</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#FFF3E0' }]} onPress={() => navigation.navigate('Resources')}>
                    <Text style={styles.actionText}>Study Resources</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 50 },
    header: { marginBottom: 30 },
    greeting: { fontSize: 28, fontWeight: 'bold', color: '#333' },
    subtext: { fontSize: 16, color: '#666' },
    section: { marginBottom: 30 },
    sectionTitle: { fontSize: 20, fontWeight: '600', marginBottom: 15 },
    emptyText: { color: '#999', fontStyle: 'italic' },
    taskCard: {
        backgroundColor: '#F5F5F5', padding: 15, borderRadius: 12, marginRight: 15, width: 200,
        shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3
    },
    taskTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
    taskDate: { fontSize: 12, color: '#555' },
    actionsGrid: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' },
    actionCard: {
        width: '48%', padding: 20, borderRadius: 15, marginBottom: 15,
        justifyContent: 'center', alignItems: 'center', height: 120
    },
    actionText: { fontWeight: 'bold', fontSize: 16, color: '#333' }
});
