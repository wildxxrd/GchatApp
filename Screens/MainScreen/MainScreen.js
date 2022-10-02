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
import { useEffect, useState } from "react";
import { firebase } from "../../config";
import HamburgerButton from "../Icons/HamburgerButton";
import PostButton from "../Icons/PostButton";
import Refreshbutton from "../Icons/RefreshButton";
import SettingsButton from "../Icons/SettingsButton";
import { FlatList } from "react-native-gesture-handler";

const MainScreen = () => {
  const postRef = firebase.firestore().collection("posts").orderBy('createdBy', 'desc');
  const [addPost, setAddPost] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  //add a new post
  const addField = () => {
    //check if we have a new post
    const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      posts: addPost,
      createdAt: timeStamp,
      createdBy: firebase.auth().currentUser.email
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

  useEffect(() => {
    async function fetchFireStore() {
      postRef.onSnapshot((querySnapshot) => {
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
          onChangeText={(userText) => setAddPost(userText)}
          placeholder="What's on your mind?"
          value={addPost}
          multiline={false}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
      </View>
      <FlatList
        style={{ marginHorizontal: 20, maxHeight: 450,  }}
        data={userPosts}
        numColumns={1}
        renderItem={({ item }) => (
          <Pressable style={styles.container}>
            <View style={styles.innerContainer}>
              <Text style={styles.itemText}>{item.posts}</Text>
            </View>
          </Pressable>
        )}
      />
      <View style={styles.bottomContainer}>
        <View style={styles.bottomView}>
          <TouchableOpacity onPress={addField}>
            <PostButton />
          </TouchableOpacity>
          <Refreshbutton />
        </View>
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
    backgroundColor: "#e5e5e5",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 5,
  },
  itemText: {
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
    fontSize: 20,
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
    backgroundColor: "#DFDFDE",
    height: 40,
    width: 350,
    marginHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  textDisplay: {
    padding: 20,
    fontSize: 16,
    color: "blue",
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bottomView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 10,
  },
});

export default MainScreen;
