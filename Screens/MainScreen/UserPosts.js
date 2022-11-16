import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { firebase } from "../../config";
import { getAuth } from "firebase/auth";
import LikeButton from "../Icons/LikeButton";
import HomeIcon from "../Icons/HomeIcon";
import Report from "../Icons/Report";
import { LinearGradient } from "expo-linear-gradient";

const UserPosts = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;

  const deletePost = (postId) => {
    firebase.firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        window.alert("Post deleted")
      })
  }

  user.providerData.forEach((profile) => {
    const fetchRef = firebase
      .firestore()
      .collection("posts")
      .where("createdBy", "==", profile.email);

    useEffect(() => {
      async function fetchFireStore() {
        fetchRef.onSnapshot((querySnapshot) => {
          const allPosts = [];
          querySnapshot.forEach((doc) => {
            const { posts, likes, createdAt } = doc.data();
            const id = doc.id;
            allPosts.push({
              posts,
              likes,
              id,
              createdAt,
            });
          });
          setUserPosts(allPosts);
        });
      }
      fetchFireStore();
    }, []);
  });
  return (
    <SafeAreaView style={styles.topContainer}>
      <View style={styles.topView}>
        <Text style={styles.titleText}>Your Posts</Text>
      </View>
      <View style={styles.bottomContainer}>
        <FlatList
          style={{ marginHorizontal: 20, maxHeight: 570 }}
          data={userPosts}
          numColumns={1}
          renderItem={({ item }) => (
            <Pressable style={styles.container}>
              <View style={styles.textContainer}>
                {
                  (item.posts && !item.posts.includes("file") ? (
                    <Text style={styles.itemText}>{item.posts}</Text>
                  ) : (
                    <Image source={{ uri: item.posts }} style={styles.imagePost} />
                  ))
                }
                <Text style={styles.authorText}>
                {JSON.stringify(item.createdAt.toDate().toLocaleDateString())}
                </Text>
                <LikeButton />
                <Text>{item.likes}</Text>
                <TouchableOpacity onPress = {() => deletePost(item.id)}>
                  <Report/>
                </TouchableOpacity>
              </View>
            </Pressable>
          )}
        />
        <View style={styles.bottomContainer}>
          <LinearGradient colors={["#04337A", "white"]}>
            <View style={styles.bottomView}>
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <HomeIcon />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  authorText: {
    fontSize: 14,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bottomView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 5,
    height: 80,
  },
  container: {
    padding: 20,
    margin: 5,
    marginHorizontal: 5,
  },
  imagePost: {
    width: 325,
    height: 250,
  },
  itemText: {
    padding: 5,
    fontSize: 30,
    fontWeight: "300",
  },
  middleView: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  middleViewText: {
    fontWeight: "400",
    fontSize: 25,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  textContainer: {
    marginVertical: 0,
  },
  topContainer: {
    flex: 1,
  },
  titleText: {
    alignItems: 'center',
    color: "#3C4048",
    fontStyle: 'italic',
    fontSize: 40,
    marginHorizontal: 70,
    fontWeight: "bold",
  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    marginHorizontal: 10,
  },
  userInput: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    height: 40,
    width: 350,
    marginHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  textDisplay: {
    padding: 20,
    fontSize: 16,
  },
  weatherView: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default UserPosts;
