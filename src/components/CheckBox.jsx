import { StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Checkbox = ({ checked, onPress }) => {
    return (
        <TouchableOpacity
            style={[
                styles.checkboxBase,
                checked && styles.checkboxChecked
            ]}
            onPress={onPress}>
            {checked && <MaterialIcons name="check" size={18} color="#fff" />}
        </TouchableOpacity>
    );
};

export default Checkbox

const styles = StyleSheet.create({
    checkboxBase: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ddd',
        marginRight: 12,
        backgroundColor: 'transparent',
    },
    checkboxChecked: {
        backgroundColor: '#06d6a0',
        borderColor: '#06d6a0',
        //  backgroundColor: 'red',
        // borderColor: '#06d6a0',
    },
})