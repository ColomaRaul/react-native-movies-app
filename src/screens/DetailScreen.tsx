import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RootStackParams } from '../router/Router';
import { Image } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'>{}

const screenHeigth = Dimensions.get('screen').height;

export const DetailScreen = ({route, navigation}: Props) => {
    const movie = route.params;

    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const {isLoading, movieFull, cast} = useMovieDetails(movie.id);
    
    if (isLoading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                <ActivityIndicator size={100} color="red" />
            </View>
        )
    }

    return (
        <ScrollView>
            <View style={styles.imageContainer}>
                <View style={styles.imageBorder}>
                    <Image 
                        source={{uri}}
                        style={styles.posterImage}
                    />
                </View>
            </View>
            <View style={{marginHorizontal: 20, marginTop: 20}}>
                <Text style={{fontSize: 16, opacity: 0.8}}>{movie.original_title}</Text>
                <Text style={{fontSize: 22, fontWeight: 'bold' }}>{movie.title}</Text>
            </View>
            {
                isLoading 
                ? <ActivityIndicator size={35} color={"grey"} style={{marginTop: 20}} /> 
                : <MovieDetails movieFull={movieFull!} cast={cast} />
            }
            <TouchableOpacity style={styles.backButton}
            onPress={() => navigation.goBack()}
            >
                <Icon 
                    name="arrow-back-outline"
                    color="white"
                    size={60}
                />
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        height: screenHeigth * 0.7,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        elevation: 10,

        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25
    },
    imageBorder: {
        flex: 1,
        overflow: 'hidden',
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25
    },
    posterImage: {
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        zIndex: 999,
        elevation: 9,
        top: 30,
        left: 5
    }
});