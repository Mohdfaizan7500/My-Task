import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { s, vs } from 'react-native-size-matters'
import { AppColors } from '../constants/colors'

const AddButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.buttontext}>+ Add Task</Text>
        </TouchableOpacity>
    )
}

export default AddButton

const styles = StyleSheet.create({
    container: {
        height: vs(40),
        backgroundColor: AppColors.light.IconColor,
        borderRadius: s(7),
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: vs(10),
        alignSelf: "center",
        width: Dimensions.get('window').width-s(20),
    },
    buttontext: {
        color: AppColors.light.background,
        fontWeight: "700"
    }
})