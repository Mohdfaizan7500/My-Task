import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { s, vs } from 'react-native-size-matters'

const TodoModal = ({ visible ,onPress,item}) => {
    return (
        <Modal 
        visible={visible} 
        animationType='fade'
        transparent>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={styles.Conatiner}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>Due: {item.duedate}</Text>
                    <Text style={styles.description}>Description: {item.description}</Text>
                    <TouchableOpacity style={styles.OkButton} onPress={onPress}>
                        <Text style={styles.ButtonText}>Ok</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </Modal>
    )
}

export default TodoModal

const styles = StyleSheet.create({
    Conatiner: {
        width: Dimensions.get("window").width - 100,
        height: vs(300),
        backgroundColor: "#fff",
        elevation: 12,
        borderRadius: s(20),
        paddingHorizontal:s(30),
        paddingTop:vs(20)
    },
    OkButton: {
        backgroundColor: '#06d6a0',
        width: s(80),
        paddingVertical: vs(7),
        paddingHorizontal: s(25),
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: vs(20),
        right: s(20),
        borderRadius: s(8)
    },
    ButtonText:{
        fontSize:s(14),
        fontWeight:'800',
        color:"#fff"
    },
    title:{
        fontSize:22,
        fontWeight:"900",
        color:"black"
    },
    description:{
        fontSize:14,
        color:"gray",
        marginTop:vs(10)
    }
})