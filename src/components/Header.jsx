import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { AppColors } from '../constants/colors';
import { useTask } from '../Context/TaskProvider';

const Header = () => {

 const {setSearchQuery,searchQuery} = useTask();

 const [search, setSearch] = useState('')
    const getCurrentDate = () => {
        const currentDate = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return currentDate.toLocaleDateString('en-GB', options);
    };

    const send =async(txt)=>{
       await setSearchQuery(txt)
    }
    return (
        <View style={styles.container}>
            <View style={styles.icons}>
                <Octicons name="apps" size={30} color={AppColors.light.background} />

                <View style={styles.SearchBoxContainer}>
                    <Ionicons name="search-outline" size={24} color='gray' />
                    <TextInput style={styles.searchBox} placeholder='Search Task...' onFocus={()=>console.log("focus")}  onChangeText={(txt)=>{setSearch(txt),send(txt)}}/>
                </View>
                <View style={styles.moreiconContainer}>
                    <MaterialIcons name="more-horiz" size={30} color={AppColors.light.background} />

                </View>
            </View>

            <Text style={styles.today}>Today {getCurrentDate()} </Text>
            {/* <Text style={styles.myTask}>My Tasks</Text> */}
            <Text style={styles.myTask}>My Tasks</Text>

        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        height: vs(120),
        backgroundColor: AppColors.light.IconColor,
        paddingTop: vs(10),
        paddingHorizontal: s(20)

    },
    icons: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center"

    },
    moreiconContainer: {
        height: s(40),
        width: s(40),
        backgroundColor: AppColors.light.Back,
        borderRadius: s(30),
        justifyContent: "center",
        alignItems: "center",
    },
    SearchBoxContainer: {
        backgroundColor: "#fff",
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        height: 40,
        paddingStart: s(5),
        borderRadius: s(20)
    },
    searchBox: {

        flex: 1,
        fontSize: s(12),
        alignItems: "center", paddingTop: 10
    },
    today: {
        fontSize: s(12),
        fontWeight: "400",
        color: AppColors.light.background,
        marginTop: vs(10),
        zIndex: 1,
    },
    myTask: {
        fontSize: s(18),
        fontWeight: '700',
        color: AppColors.light.background,
        marginBottom: s(10),
        zIndex: 1,
    },
    backCircle: {
        backgroundColor: AppColors.light.Back,
        width: s(150),
        height: s(150),
        position: "absolute",
        borderRadius: s(100),
        bottom: s(-35),
        left: s(-30),
    },
})