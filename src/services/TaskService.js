
import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = 'CAMPUS_MATE_TASKS';

export const saveTask = async (task) => {
    try {
        const existingTasks = await getTasks();
        const newTasks = [...existingTasks, task];
        await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(newTasks));
        return newTasks;
    } catch (e) {
        console.error("Error saving task", e);
        return [];
    }
};

export const getTasks = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(TASKS_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error("Error reading tasks", e);
        return [];
    }
};

export const deleteTask = async (taskId) => {
    try {
        const existingTasks = await getTasks();
        const newTasks = existingTasks.filter(t => t.id !== taskId);
        await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(newTasks));
        return newTasks;
    } catch (e) {
        console.error("Error deleting task", e);
        return [];
    }
};
