import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PriorityBadge = ({ priority }) => {

    const colorMap = {
        high: '#ff6b6b',
        medium: '#ffd166',
        low: '#06d6a0'
    };
    return (
        <View style={[styles.priorityBadge, { backgroundColor: colorMap[priority] }]}>
            <Text style={styles.priorityText}>{priority}</Text>
        </View>
    );
}

export default PriorityBadge

const styles = StyleSheet.create({
    priorityBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    priorityText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
})