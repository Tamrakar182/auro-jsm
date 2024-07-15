import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import clsx from 'clsx'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            disabled={isLoading}
            className={clsx("bg-secondary-200 rounded-xl min-h-[62px] justify-center items-center", containerStyles, { isLoading: 'opacity-50' })}
        >
            <Text className={clsx("text-primary font-psemibold text-lg", textStyles)} >{isLoading ? "Loading..." : title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton