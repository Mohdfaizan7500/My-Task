// import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Keyboard, Modal, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { vs } from 'react-native-size-matters';
import AddButton from '../components/AddButton';
import Header from '../components/Header';
import Item from '../components/Item';
import TodoModal from '../components/TodoModal';
import { AppColors } from '../constants/colors';
import { useTask } from '../Context/TaskProvider';


const TaskList = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState('');
  const [ModalVisibal, setModalVisibal] = useState(false)
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);



  const { tasks, filteredTasks } = useTask()

  const toggleTaskModal = (item) => {
    // console.log("faizan", item)s
    setModalData(item)
    setVisible(true)
  }


  const toggleModal = (value) => {
    setModalVisibal(value)

  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <SafeAreaView style={styles.conatiner}>
      <StatusBar style='auto' />
      <Header />
      <View style={{ flex: 1, backgroundColor: AppColors.light.background, paddingTop: vs(10) }}>
        <GestureHandlerRootView>
          <FlatList
            contentContainerStyle={{ paddingBottom: vs(50) }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item.id}
            data={filteredTasks}
            renderItem={({ item, index }) => (
              <Item item={item} toggleModal={toggleModal} onLongPress={() => toggleTaskModal(item)} />
            )}
            ListEmptyComponent={() => (
              <Text style={styles.emptyText}>No tasks found. Add one!</Text>
            )}
          />
        </GestureHandlerRootView>

      </View>
      {
        !isKeyboardVisible ?
          <AddButton onPress={() => navigation.navigate("Add Task")} /> : null
      }
      <TodoModal visible={visible} onPress={() => setVisible(false)} item={modalData} />
      <Modal transparent visible={ModalVisibal} >
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.42)", justifyContent: "center", alignItems: "center" }}>
          <View style={{ width: 100, height: 100, backgroundColor: "#fff", borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size={40} />

          </View>

        </View>
      </Modal>

    </SafeAreaView>
  )
}

export default TaskList

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

})