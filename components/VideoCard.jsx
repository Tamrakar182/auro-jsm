import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { icons } from '../constants'
import { Video, ResizeMode } from 'expo-av'
import { useGlobalContext } from '../context/GlobalProvider'
import { likePost } from '../lib/appwrite'

const VideoCard = ({ video: { $id, title, thumbnail, video, creator: { userName, avatar } } }) => {
    const [play, setPlay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { user, setUser } = useGlobalContext();

    const isLiked = user.likedVideos.some((item) => item.$id === $id);

    const [like, setLike] = useState(isLiked);

    useEffect(() => {
        setLike(user.likedVideos.some((item) => item.$id === $id));
    }, [user.likedVideos]);

    const handleLikePress = async () => {
        setIsLoading(true);
        setLike(!like);
        let likesArr;
        if (like) {
            likesArr = user.likedVideos.filter(item => item.$id !== $id)
        } else {
            likesArr = [...user.likedVideos, $id]
        }
        try {
            const updatedUser = await likePost(user.$id, likesArr);
            if (!updatedUser) {
                Alert.alert("Error", "Error liking the post");
            } else {
                setUser(updatedUser)
            }
        } catch (e) {
            Alert.alert("Error", e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <View className="flex-col items-center px-4 mb-14">
            <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                        <Image
                            source={{ uri: avatar }}
                            className="w-full h-full rounded-lg"
                            resizeMethod='contain'
                        />
                    </View>

                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
                            {title}
                        </Text>
                        <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
                            {userName}
                        </Text>
                    </View>
                </View>

                <View className="pt-2">
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handleLikePress}
                        disabled={isLoading}
                    >

                        {isLoading ? (
                            <Text className="text-white text-sm">Loading...</Text>
                        ) : (
                            <Image
                                source={like ? icons.heartFill : icons.heartOutline}
                                className="w-5 h-5"
                                resizeMode='contain'
                            />
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {play ? (
                <Video
                    source={{ uri: video }}
                    className="w-full h-60 rounded-xl mt-3"
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish) {
                            setPlay(false);
                        }
                    }}
                />
            ) : (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                    className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
                >
                    <Image
                        source={{ uri: thumbnail }}
                        className="w-full h-full rounded-xl mt-3"
                        resizeMode='cover'
                    />
                    <Image
                        source={icons.play}
                        className="w-12 h-12 absolute"
                        resizeMode='contain'
                    />

                </TouchableOpacity>
            )}
        </View>
    )
}

export default VideoCard