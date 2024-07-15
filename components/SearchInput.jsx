import { View, TextInput, TouchableOpacity, Image } from 'react-native'
import clsx from 'clsx'
import { icons } from '../constants'

const SearchInput = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    return (
        <View className={clsx("border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4", otherStyles)}>
            <TextInput
                className="flex-1 text-white mt-0.5 font-pregular text-base"
                value={value}
                placeholder="Search for a video topic..."
                placeholderTextColor="#7b8b8b"
                onChangeText={handleChangeText}
                secureTextEntry={title === "Password" && !showPassword}
            />

            <TouchableOpacity>
                <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput