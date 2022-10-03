import {
  Image,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { firebase } from "../../config";
import HamburgerButton from "../Icons/HamburgerButton";
import PostButton from "../Icons/PostButton";
import Refreshbutton from "../Icons/RefreshButton";
import SettingsButton from "../Icons/SettingsButton";
import { FlatList } from "react-native-gesture-handler";
import ThumbsUp from "../Icons/ThumbsUp";

const MainScreen = () => {
  const postRef = firebase.firestore().collection("posts");
  const [addPost, setAddPost] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  //add a new post
  const addField = () => {
    //check if we have a new post
    const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      posts: addPost,
      createdAt: timeStamp,
      createdBy: firebase.auth().currentUser.email,
    };
    postRef
      .add(data)
      .then(() => {
        setAddPost("");
        //release keyboard
        alert("Message Posted");
      })
      .catch((error) => {
        //show an alert in case of error
        alert(error);
      });
  };

  const fetchRef = firebase
    .firestore()
    .collection("posts")
    .orderBy("createdAt", "desc");

  useEffect(() => {
    async function fetchFireStore() {
      fetchRef.onSnapshot((querySnapshot) => {
        const allPosts = [];
        querySnapshot.forEach((doc) => {
          const { posts } = doc.data();
          allPosts.push({
            posts,
          });
        });
        setUserPosts(allPosts);
      });
    }
    fetchFireStore();
  }, []);

  return (
    <SafeAreaView style={styles.topContainer}>
      <View style={styles.topView}>
        <HamburgerButton />
        <Image
          style={styles.profileImage}
          source={require("../../assets/ErenYaeger.jpg")}
        />
        <SettingsButton />
      </View>
      <View style={styles.middleView}>
        <TouchableOpacity>
          <Text style={styles.middleViewText}>Latest</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.middleViewText}>Trending</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.userInput}>
        <TextInput
          style={{ fontSize: 20, color: "#DFF6FF" }}
          onChangeText={(userText) => setAddPost(userText)}
          placeholder="What's on your mind?"
          value={addPost}
          multiline={false}
          placeholderTextColor="#DFF6FF"
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
      </View>
      <FlatList
        style={{ marginHorizontal: 20, maxHeight: 490 }}
        data={userPosts}
        numColumns={1}
        renderItem={({ item }) => (
          <LinearGradient colors={["#04337A", "#DFF6FF"]}>
            <Pressable style={styles.container}>
              <View style={styles.textContainer}>
                <Text style={styles.itemText}>{item.posts}</Text>
              </View>
            </Pressable>
          </LinearGradient>
        )}
      />
      <View style={styles.bottomContainer}>
        <LinearGradient colors={["#04337A", "white"]}>
          <View style={styles.bottomView}>
            <TouchableOpacity onPress={addField}>
              <PostButton />
            </TouchableOpacity>
            <TouchableOpacity>
              <Refreshbutton />
            </TouchableOpacity>
            <TouchableOpacity>
              <ThumbsUp />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  profileImage: {
    height: 78,
    width: 78,
    borderRadius: 400 / 2,
  },
  container: {
    padding: 20,
    margin: 5,
    marginHorizontal: 5,
  },
  textContainer: {
    marginVertical: 10,
  },
  itemText: {
    padding: 5,
    fontSize: 20,
    fontWeight: "300",
  },
  topContainer: {
    flex: 1,
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
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bottomView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: 10,
    height: 80,
  },
});

export default MainScreen;
