import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { TaskProvider } from '../Context/TaskProvider';
import AddTask from '../screens/AddTask';
import Splash from '../screens/Splash';
import TaskList from '../screens/TaskList';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    // <NavigationContainer>
    <TaskProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Splash' component={Splash} />
        <Stack.Screen name='TaskList' component={TaskList} />
        <Stack.Screen name='Add Task' component={AddTask} />
      </Stack.Navigator>
    </TaskProvider>
    // </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({
})