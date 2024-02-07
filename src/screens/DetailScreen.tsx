import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Text, View } from 'react-native'
import { RootStackParams } from '../router/Router';

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'>{}

export const DetailScreen = ({route}: Props) => {
    const movie = route.params;
    console.log(movie);
    return (
        <View>
            <Text>Detail Screen</Text>
        </View>
    )
}