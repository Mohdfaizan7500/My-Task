import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

import * as Notifications from 'expo-notifications';


const TaskContext = createContext();

const data = [
    {
        id: 1,
        title: "faizan",
        description: "xyz",
        priority: "high",
        isDone: false,
        duedate: "2025-07-20",
        duetime: '10:42 pm',
        opened: false
    },
    {
        id: 2,
        title: "Amaan",
        description: "xyz",
        priority: "high",
        isDone: false,
        duedate: "2025-07-20",
        duetime: "9:00 pm",
        opened: false
    },
    {
        id: 3,
        title: "Ayal",
        description: "xyz",
        priority: "high",
        isDone: true,
        duedate: "2025-07-20",
        duetime: "9:00 pm",
        opened: false
    },
    {
        id: 4,
        title: "sakib",
        description: "xyz",
        priority: "high",
        isDone: true,
        duedate: "2025-07-20",
        duetime: "9:00 pm",
        opened: false
    }
];

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([...data]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchTasks = async () => {
        try {
            let temp = await AsyncStorage.getItem("task");
            if (temp) {
                setTasks(JSON.parse(temp));
            }
            else{
                setTasks([null])
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        try {
            fetchTasks();

        }
        catch (e) {
            console.log(e)
        }
    }, []);


    const searchTasks = (query) => {
        return tasks.filter(t => (
            t.title.toLowerCase().includes(query.toLowerCase()) ||
            t.description.toLowerCase().includes(query.toLowerCase()) ||
            t.priority.toLowerCase().includes(query.toLowerCase())
        ));
    };

    const filteredTasks = searchQuery ? searchTasks(searchQuery) : tasks;

    const addTask = async (item) => {
        // console.log("Task Provider")
        console.log(item)
        try {
            // Create the updated tasks array
            const updatedTasks = [item, ...tasks];

            // Save the updated tasks to AsyncStorage
            await AsyncStorage.setItem("task", JSON.stringify(updatedTasks));

            // Update the state with the new tasks array
            setTasks(updatedTasks);

            // Alert.alert("Saved");
        } catch (error) {
            console.log(error);
            Alert.alert("Error: Check Console");
        }
    };

    const updateTask = async (id, updateItem) => {
        try {
            // console.log(updateItem.notificationId)
            await Notifications.cancelScheduledNotificationAsync(updateItem.notificationId);

            // console.log("Sedulecancel:",updateItem.notificationId)
            const updatedTasks = tasks.map(t => t.id === id ? updateItem : t);
            setTasks(updatedTasks);
            await AsyncStorage.setItem("task", JSON.stringify(updatedTasks)); // Update AsyncStorage

        }
        catch (e) {
            console.log(e)
        }

    };

    const deleteTask = (id) => {
        try {
            const updatedTasks = tasks.filter(t => t.id !== id);
            setTasks(updatedTasks);
            AsyncStorage.setItem("task", JSON.stringify(updatedTasks)); // Update AsyncStorage

        }
        catch (e) {
            console.log(e)
        }

    };

    const OnComponentOpen = (id)=>{
        console.log(id)
        let tempData = tasks;
        tempData.map((item)=>{
            if(item.id == id){
                item.opened = true;
            }
            else{
                item.opened = false;
            }
        })
        let temp = [];
        tempData.map((item)=>{
            temp.push(item);
        })
        setTasks(temp);
    }

    return (
        <TaskContext.Provider value={{ tasks, filteredTasks, updateTask, deleteTask, addTask, setSearchQuery, searchQuery,OnComponentOpen }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTask = () => useContext(TaskContext);
