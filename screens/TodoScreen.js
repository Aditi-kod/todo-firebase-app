import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, addDoc, query, where, orderBy, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import  {Checkbox}  from 'expo-checkbox';
import { disableNetwork, enableNetwork } from 'firebase/firestore';



export default function TodoScreen() {
  const userId = auth.currentUser?.uid;
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {


    const q = query(
      collection(db, 'todos'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      
      const todos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("Fetched real-time tasks:", todos);
      setTasks(todos);
    });

    return unsubscribe;
  }, [userId]);

  const addTask = async () => {
    if (task.trim() === '') return;
    try {
      await addDoc(collection(db, 'todos'), {
        text: task,
        completed: false,
        createdAt: new Date(),
        userId: userId,
      });
      setTask('');
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const toggleComplete = async (taskId, currentStatus) => {
    try {
      const taskRef = doc(db, 'todos', taskId);
      await updateDoc(taskRef, { completed: !currentStatus });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const taskRef = doc(db, 'todos', taskId);
      await deleteDoc(taskRef);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Checkbox
        value={item.completed}
        onValueChange={() => toggleComplete(item.id, item.completed)}
      />
      <Text style={[styles.taskText, item.completed && styles.completedText]}>
        {item.text}
      </Text>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Tasks</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter task"
          value={task}
          onChangeText={setTask}
          style={styles.input}
        />
        <Button title="Add" onPress={addTask} />
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No tasks yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f9ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 10,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  },
});
