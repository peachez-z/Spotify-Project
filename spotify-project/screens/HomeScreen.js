import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import StyleSheet from "react-native/Libraries/StyleSheet/StyleSheet";
import axios from "axios";

const HomeScreen = () => {
  const [userProfile, setUserProfile] = useState();
  const [loading, setLoading] = useState(true);
  const [recentlyLoaded, setRecentlyLoaded] = useState([]);
  const greetingMessage = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return "Good Morning";
    } else if (currentTime < 16) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  const message = greetingMessage();
  const accessToken =
    "BQApC1iMwOxv1qMpoSDVKGP_Ra1ECwyJ2kf2HjyBctJx3fISD1ofrM4GvyZHwPoEnD0LdZRZWJpFHJ23-bU3JzbT2G0PplV5s6wIkmNDxLoRQALp41c"; // 여기에 액세스 토큰을 설정하세요.

  const getProfile = async () => {
    try {
      if (!accessToken) {
        console.error("Access token not available.");
        return;
      }

      const response = await fetch(
        `https://api.spotify.com/v1/users/31veagjypgv5okr3pqhgwqdox2ti`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // console.log(response);

      if (response.ok) {
        console.log("성공");
        const data = await response.json();
        console.log(data);
        setUserProfile(data);
        console.log("뿅");
      } else {
        console.error("Error fetching user profile:", response.statusText);
      }
    } catch (err) {
      console.error("Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
    getRecentlyPlayedSongs();
  }, []);
  // console.log(userProfile);

  // 최근 들은 곡
  const getRecentlyPlayedSongs = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://api.spotify.com/v1/me/player/recently-played?limit=4",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const tracks = response.data.items;
      setRecentlyLoaded(tracks);
    } catch (err) {
      console.log("err : ", err.message);
    }
  };
  console.log("song", recentlyLoaded);

  return (
    <LinearGradient
      colors={["#fad0c4", "#ffd1ff"]}
      style={{ flex: 1, marginTop: 50 }}
    >
      <ScrollView style={{ margin: 10 }}>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <View>
                {userProfile && userProfile.images && userProfile.images[0] ? (
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      resizeMode: "cover",
                    }}
                    source={{ uri: userProfile.images[0].url }}
                  />
                ) : (
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      resizeMode: "cover",
                    }}
                    source={require("../assets/favicon.png")} // 기본 이미지 파일 경로를 설정하세요.
                  />
                )}
              </View>
            )}
            <Text
              style={{
                marginLeft: 10,
                fontSize: 20,
                fontWeight: "bold",
                color: "black",
              }}
            >
              {message}
            </Text>
          </View>
          <MaterialCommunityIcons
            name="lightning-bolt-outline"
            size={24}
            color="black"
          />
        </View>

        <View
          style={{
            marginHorizontal: 12,
            marginVertical: 5,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Pressable
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 30,
            }}
          >
            <Text Style={{ fontSize: 15, color: "white" }}>Music</Text>
          </Pressable>

          <Pressable
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 30,
            }}
          >
            <Text Style={{ fontSize: 15, color: "white" }}>
              PodCasts & Shows
            </Text>
          </Pressable>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Pressable
              style={{
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                flex: 1,
                marginHorizontal: 10,
                marginVertical: 8,
                borderRadius: 4,
                backgroundColor: "#202020",
                elevation: 3,
              }}
            >
              <LinearGradient colors={["#33006f", "#ffffff"]}>
                <Pressable
                  style={{
                    width: 55,
                    height: 55,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <AntDesign name="heart" size={24} color="white" />
                </Pressable>
              </LinearGradient>
              <Text
                style={{ fontSize: 13, fontWeight: "bold", color: "white" }}
              >
                Liked Songs
              </Text>
            </Pressable>
            <View
              style={{
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                flex: 1,
                marginHorizontal: 10,
                marginVertical: 8,
                borderRadius: 4,
                backgroundColor: "#202020",
                elevation: 3,
              }}
            >
              <Image
                style={{ width: 55, height: 55 }}
                source={require("../assets/favicon.png")}
              />
              <View style={styles.randomArtist}>
                <Text
                  style={{ fontSize: 13, fontWeight: "bold", color: "white" }}
                >
                  Hiphop Tamhiza
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
