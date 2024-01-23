import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      try {
        const apiKey = "cf7ec00faea2ebcc0d30a3f90a865377";
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;

        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setMovies(data.results);
        } else {
          console.error(`Error: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchNowPlayingMovies();
  }, []);

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem} className=' bg-primary'>
      <Image
        style={styles.carouselImage}
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`,
        }}
      />
      <Text style={styles.carouselText}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container} className=' bg-primary'>
      <Text style={styles.header}>Now Playing Movies</Text>
      <Carousel
      layoutCardOffset={`18`}
        data={movies}
        renderItem={renderCarouselItem}
        sliderWidth={300}
        itemWidth={300}
        layout="default"
        loop
        autoplay
        autoplayInterval={2000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 350,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  carouselItem: {
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  carouselImage: {
    width: 300,
    height: 150,
    resizeMode: "cover",
  },
  carouselText: {
    fontSize: 16,
    padding: 10,
    textAlign: "center",
  },
});

export default HomeScreen;
