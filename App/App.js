import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import NavigationTabs from "./NavigationTabs";
import { useEffect, useState } from "react";
import HomeScreen from "./Screens/HomeScreen";

export default function App() {
  const fetch = require("node-fetch");

  const url = "https://api.themoviedb.org/3/authentication";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjdlYzAwZmFlYTJlYmNjMGQzMGEzZjkwYTg2NTM3NyIsInN1YiI6IjY1YWMwODYzMjVjZDg1MDBhY2M5ZDQzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kKjRMb4k-JCCHkBF46Wuqb6AcyxaDLRQCywg8NmUNhY",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    // .then((json) => console.log(json))
    .catch((err) => console.error("error:" + err));

  const apiKey = "cf7ec00faea2ebcc0d30a3f90a865377";

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;

        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setMovies(data.results);
          // console.log(data.results);
        } else {
          console.error(`Error: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchNowPlayingMovies();
  }, []); // Empty dependency array to run the effect only once on component mount

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      const url = `https://api.themoviedb.org/3/movie/15/similar?api_key=${apiKey}`;
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };

      fetch(url, options)
        .then((res) => res.json())
        // .then((json) => console.log("frt", json))
        .catch((err) => console.error("error:2" + err));
    };

    fetchNowPlayingMovies();
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <View className=" bg-red-400 w-full h-full" style={styles.container}>
      {/* <NavigationTabs /> */}
      <HomeScreen />
      <StatusBar backgroundColor="black" style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
