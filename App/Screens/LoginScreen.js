import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios"; // Import axios for making HTTP requests

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Perform client-side validation
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
const value ={
  email : email,
  password : password
}
    // Make a POST request to your backend server for login
    axios
      .post("http://192.168.194.252:8000/login", value)
      .then((response) => {
        console.log(response.data.message);
        if (response.data.message == "Login successful") {
          // If login successful, navigate to the next screen
          navigation.navigate("HomeStack");
        } else {
          // console.log(response.data.message);
          // If login unsuccessful, display error message
          
          Alert.alert("Error", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Alert.alert("Error", "An error occurred, please try again later");
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#00A9FF" }}>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: "#FFD700", borderRadius: 20, padding: 12, marginVertical: 16 }}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center", marginVertical: 24 }}>
          <Image source={require("../assets/login.png")} style={{ width: 200, height: 200 }} />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={{ alignItems: "center", marginTop: 16 }}>
          <Text style={{ fontWeight: "bold" }}>Or Login with Social Media</Text>
          {/* Add social media buttons here */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  input: {
    backgroundColor: "#CCCCCC",
    color: "#333333",
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
};

export default LoginScreen;
