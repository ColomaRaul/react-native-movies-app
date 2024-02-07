import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { Text, View } from 'react-native'
import { MoviePoster } from './MoviePoster'
import { Movie } from '../interfaces/movieInterface';

interface Props {
    title?: string;
    movies: Movie[];
}

export const HorizontalSlider = ({movies, title}: Props) => {
    return (
        <View style={{
            height: ( title ) ? 260 : 220
        }}>
            {
                title && <Text style={{fontSize: 30, fontWeight: 'bold', marginLeft: 10}}>{title}</Text>
            }
            <FlatList
                data={movies}
                renderItem={({item}) => (
                    <MoviePoster movie={item} height={200} width={140} />
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}
