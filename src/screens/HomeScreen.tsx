import React from 'react'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'
import { useMovies } from '../hooks/useMovies'
import { MoviePoster } from '../components/MoviePoster';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { HorizontalSlider } from '../components/HorizontalSlider';

export const HomeScreen = () => {
    const {nowPlaying, popular, topRated, upcoming, isLoading} = useMovies();
    const { top } = useSafeAreaInsets();

    if (isLoading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                <ActivityIndicator size={100} color="red" />
            </View>
        )
    }

    return (
        <ScrollView>
            <View style={{marginTop: top + 20}}>
                <View style={{height: 500}}>
                    <Text style={{fontSize: 30, fontWeight: 'bold', marginLeft: 10}}>En cartelera</Text>
                    {/* Carrousel mismo que el flat pero con más tamaño (no funcioan bien el carrusel) */}
                    <FlatList
                        data={nowPlaying}
                        renderItem={({item}) => (
                            <MoviePoster movie={item} />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />

                </View>

                {/* Meter las pellículas flat */}
                <HorizontalSlider title="Popular" movies={popular} />
                <HorizontalSlider title="Top Rated" movies={topRated} />
                <HorizontalSlider title="Upcoming" movies={upcoming} />

            </View>
        </ScrollView>
    )
}
