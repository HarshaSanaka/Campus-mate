
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getGeminiResponse } from '../services/GeminiService';

export default function AIChatScreen() {
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState([
        { id: '0', text: 'Hello! I am your AI study assistant. Ask me anything!', isUser: false }
    ]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!query.trim()) return;

        const userMsg = { id: Date.now().toString(), text: query, isUser: true };
        setMessages(prev => [...prev, userMsg]);
        setQuery('');
        setLoading(true);

        const answer = await getGeminiResponse(userMsg.text);

        const botMsg = { id: (Date.now() + 1).toString(), text: answer, isUser: false };
        setMessages(prev => [...prev, botMsg]);
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                style={styles.chatList}
                renderItem={({ item }) => (
                    <View style={[styles.bubble, item.isUser ? styles.userBubble : styles.botBubble]}>
                        <Text style={styles.text}>{item.text}</Text>
                    </View>
                )}
            />
            {loading && <ActivityIndicator size="small" color="#6200EE" style={{ margin: 10 }} />}
            <View style={styles.inputArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Ask a doubt..."
                    value={query}
                    onChangeText={setQuery}
                />
                <Button title="Send" onPress={sendMessage} color="#6200EE" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    chatList: { padding: 10 },
    bubble: { padding: 10, borderRadius: 10, maxWidth: '80%', marginBottom: 10 },
    userBubble: { backgroundColor: '#E0E0E0', alignSelf: 'flex-end' },
    botBubble: { backgroundColor: '#EDE7F6', alignSelf: 'flex-start' },
    text: { fontSize: 16 },
    inputArea: { flexDirection: 'row', padding: 10, borderTopWidth: 1, borderColor: '#eee', alignItems: 'center' },
    input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 20, paddingHorizontal: 15, marginRight: 10, height: 40 }
});
