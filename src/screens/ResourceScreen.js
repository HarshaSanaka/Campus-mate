
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const RESOURCES = [
    { id: '1', title: 'Khan Academy (Math)', url: 'https://www.khanacademy.org/math' },
    { id: '2', title: 'Crash Course (History)', url: 'https://thecrashcourse.com/' },
    { id: '3', title: 'Coursera (CS)', url: 'https://www.coursera.org/' },
    { id: '4', title: 'Wolfram Alpha', url: 'https://www.wolframalpha.com/' },
    { id: '5', title: 'Google Scholar', url: 'https://scholar.google.com/' },
];

export default function ResourceScreen() {
    const openLink = (url) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Study Resources</Text>
            <FlatList
                data={RESOURCES}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => openLink(item.url)}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.url}>{item.url}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    card: { padding: 15, backgroundColor: '#E3F2FD', borderRadius: 10, marginBottom: 15 },
    title: { fontSize: 18, fontWeight: 'bold', color: '#1565C0' },
    url: { color: '#555', marginTop: 5 }
});
