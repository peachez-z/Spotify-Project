import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as AppAuth from "expo-app-auth";

const LoginScreen = () => {
  const getSpotifyToken = async () => {
    // const params = new URLSearchParams();
    // params.append("client_id", "15fefb35fd32416c8e99502dda7d31ef");
    // params.append("grant_type", "client_credentials");
    // params.append("client_secret", "9134843713104c7e919f36b3111d7187");
    // console.log(params);
    client_id = "15fefb35fd32416c8e99502dda7d31ef";
    client_secret = "9134843713104c7e919f36b3111d7187";
    // const params = {
    //   grant_type: "client_credentials",
    // };
    // console.log(params);
    const params = new FormData();
    params.append("grant_type", "client_credentials");
    console.log(params);

    // const result = await spotifyTokenApi.post<SpotifyToken>('token', params);
    // return result.data;
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + client_id + ":" + client_secret,
      },
      body: params,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await result.json();
    console.log(data);

    return data;
  };
  return (
    <LinearGradient colors={["#fad0c4", "#ffd1ff"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ height: 100, marginTop: 70 }}>
          <Entypo
            style={{ textAlign: "center", marginTop: 0 }}
            name="spotify"
            size={80}
            color="black"
          />
          <Text
            style={{
              color: "white",
              fontSize: 40,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 40,
            }}
          >
            TuneMate ver.2
          </Text>
          {/* <View style={{ height: 60 }} /> */}
          <Pressable
            onPress={getSpotifyToken}
            style={{
              marginTop: 40,
              backgroundColor: "#1DB954",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              width: 300,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 10,
            }}
          >
            <Text>Sign In with Spotify</Text>
          </Pressable>
          <Pressable
            // onPress={authenticate}
            style={{
              backgroundColor: "white",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              width: 300,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              marginVertical: 10,
            }}
          >
            <MaterialIcons name="phone-android" size={24} color="black" />
            <Text style={{ fontWeight: "500", textAlign: "center", flex: 1 }}>
              Continue with phone number
            </Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: "white",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              width: 300,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              marginVertical: 10,
            }}
          >
            <AntDesign name="google" size={24} color="red" />
            <Text style={{ fontWeight: "500", textAlign: "center", flex: 1 }}>
              Continue with Google
            </Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: "white",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              width: 300,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              marginVertical: 10,
            }}
          >
            <Entypo name="facebook" size={24} color="blue" />
            <Text style={{ fontWeight: "500", textAlign: "center", flex: 1 }}>
              Continue with Facebook
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({});
