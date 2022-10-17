import {
  Image,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  Pressable,
  Button,
  Touchable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { firebase } from "../../config";
import HamburgerButton from "../Icons/HamburgerButton";
import PostButton from "../Icons/PostButton";
import Refreshbutton from "../Icons/RefreshButton";
import SettingsButton from "../Icons/SettingsButton";
import WeatherAPIComp from "./WeatherAPIComp";
import { FlatList } from "react-native-gesture-handler";
import ThumbsUp from "../Icons/ThumbsUp";
import AddButton from "../Icons/AddButton";
import * as ImagePicker from "expo-image-picker";

const MainScreen = () => {
  const postRef = firebase.firestore().collection("posts");
  const [addPost, setAddPost] = useState("");
  const [likes, setLikes] = useState(0);
  const [trending, setTrending] = useState();
  const [userPosts, setUserPosts] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  // selectImage() - Selects an image from user's library.
  const selectImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);
    const source = { uri: result.uri };

    if (!result.cancelled) {
      setProfilePic(result.uri);
    }
  };

  // uploadImage() - Uploads image selected to Firebase
  // const uploadImage = async () => {
  //   const { uri } = profilePic;
  //   const filename = uri.substring(uri.lastIndexOf('/') + 1);
  //   const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

  //   setUploading(true);
  //   setTransferred(0);

  //   const task = storage()
  //     .ref(filename)
  //     .putFile(uploadUri);

  //     task.on('state_changed', snapshot => {
  //       setTransferred(
  //         Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
  //       );
  //     });

  //     try {
  //       await task;
  //     } catch (e) {
  //       console.error(e);
  //     }
  //     setUploading(false);
  //     Alert.alert(
  //       'Photo uploaded!',
  //       'Your photo has been uploaded to Firebase Cloud Storage!'
  //     );
  //     setImage(null);
  // };

  //add a new post
  const addField = () => {
    //check if we have a new post
    const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      posts: addPost,
      createdAt: timeStamp,
      createdBy: firebase.auth().currentUser.email,
      likes: likes,
    };
    postRef
      .add(data)
      .then(() => {
        setAddPost("");
        setLikes(0);
        //release keyboard
        alert("Message Posted");
      })
      .catch((error) => {
        //show an alert in case of error
        alert(error);
      });
  };

  const fetchLike = (postId) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .update({
        likes: firebase.firestore.FieldValue.increment(1),
      });
  };

  const fetchRef = trending
    ? firebase.firestore().collection("posts").orderBy("likes", "desc")
    : firebase.firestore().collection("posts").orderBy("createdAt", "desc");

  useEffect(() => {
    async function fetchFireStore() {
      fetchRef.onSnapshot((querySnapshot) => {
        const allPosts = [];
        querySnapshot.forEach((doc) => {
          const { posts, likes } = doc.data();
          const id = doc.id;
          allPosts.push({
            posts,
            likes,
            id,
          });
        });
        setUserPosts(allPosts);
      });
    }
    fetchFireStore();
  }, [trending]);

  return (
    <SafeAreaView style={styles.topContainer}>
      <View style={styles.topView}>
        <HamburgerButton />
        {profilePic !== null ? (
          <TouchableOpacity onPress={() => selectImage()}>
            {profilePic && (
              <Image source={{ uri: profilePic }} style={styles.profilePic} />
            )}
          </TouchableOpacity>
        ) : null}
        {profilePic === null ? (
          <TouchableOpacity onPress={() => selectImage()}>
            <AddButton />
          </TouchableOpacity>
        ) : null}
        <SettingsButton />
      </View>
      <View>
      <WeatherAPIComp/>
      </View>
      <View style={styles.middleView}> 
        <TouchableOpacity onPress={() => setTrending(false)}>
          <Text style={styles.middleViewText}>Latest</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTrending(true)}>
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
                <TouchableOpacity onPress={() => fetchLike(item.id)}>
                  <Refreshbutton />
                </TouchableOpacity>
                <Text>{item.likes}</Text>
              </View>
            </Pressable>
          </LinearGradient>
        )}
      />
      <View style={styles.bottomContainer}>
        <LinearGradient colors={["#04337A", "white"]}>
          <View style={styles.bottomView}>
            <TouchableOpacity>{/* Image Button */}</TouchableOpacity>
            <TouchableOpacity onPress={addField}>
              <PostButton />
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
  profilePic: {
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
  weatherView: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
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
