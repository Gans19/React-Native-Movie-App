import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
const SignupScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    console.log(fullName, password, email);

    if (!fullName.trim() || !password.trim() || !email.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const value = {
      fullName:fullName,
      email:email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://192.168.194.252:8000/users/add",
        value
      );

      if (response.status !== 201) {
        throw new Error("Network response was not ok");
      }

      Alert.alert("Success", "User Added successfully");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred, please try again later");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/signup.png")} style={styles.logo} />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
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
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.socialMediaContainer}>
          <Text style={styles.socialMediaText}>
            Or Sign Up with Social Media
          </Text>
          {/* Add social media buttons here */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00A9FF",
  },
  scrollViewContent: {
    paddingHorizontal: 20,
  },
  backButton: {
    backgroundColor: "#FFD700",
    borderRadius: 20,
    padding: 12,
    marginVertical: 16,
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 24,
  },
  logo: {
    width: 300,
    height: 200,
  },
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
  socialMediaContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  socialMediaText: {
    fontWeight: "bold",
  },
});

export default SignupScreen;
