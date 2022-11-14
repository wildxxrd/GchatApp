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
  Container,
  Alert,
  Linking,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider
} from 'react-native-popup-menu';
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { firebase } from "../../config";
import HamburgerButton from "../Icons/GlobeLinkIcon";
import PostButton from "../Icons/PostButton";
import LogOutButton from "../Icons/LogOutButton";
import WeatherAPIComp from "./WeatherAPIComp";
import { FlatList } from "react-native-gesture-handler";
import AddButton from "../Icons/AddButton";
import * as ImagePicker from "expo-image-picker";
import LikeButton from "../Icons/LikeButton";
import MyProfile from "../Icons/MyProfile";
import Camera from "../Icons/Camera";
import {getAuth} from "firebase/auth";


const MainScreen = ({ navigation }) => {
  const postRef = firebase.firestore().collection("posts");
  const [addPost, setAddPost] = useState("");
  const [image, setImage] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [likes, setLikes] = useState(0);
  const [trending, setTrending] = useState();
  const [userPosts, setUserPosts] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;

  user.providerData.forEach((profile) => {
    const fetchRef = firebase
      .firestore()
      .collection("users")
      .where("email", "==", profile.email);

    useEffect(() => {
      async function fetchProfilePic() {
        fetchRef.onSnapshot((querySnapshot) => {
          const profileImage = "" ;
          querySnapshot.forEach((doc)=> {
            const { uri } = doc.data();
            setProfilePic(uri);
          });
        });
      }
      fetchProfilePic();
    }, []);
  });

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate("Sign In");
      })
      .catch((error) => alert(error.message));
  };

  // selectImageFromLibrary() - Selects an image from user's library.
  const selectImageFromLibrary = async () => {
    // No permissions request is necessary for launching the image library.
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const source = { uri: result.uri };
    
    if (!result.cancelled) {
      setProfilePic(result.uri);
    }
  };

  const postImageFromLibrary = async () => {
    // No permissions request is necessary for launching the image library.
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const source = { uri: result.uri };

    if (!result.cancelled) {
      setImage(result.uri);
      setAddPost(result.uri);
    }
  };


  const takePhotoFromCamera = async () => {
    // No permissions request is necessary for opening camera.
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const source = { uri: result.uri };

    if (!result.cancelled) {
      setImage(result.uri);
      setAddPost(result.uri);
    }
  };

  //add new post
  const addField = () => {
    //check if we have a new post
    const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      posts: addPost,
      createdAt: timeStamp,
      createdBy: firebase.auth().currentUser.email,
      likes: likes,
      uri: profilePic,
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

  const getRandomID = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  return (
    <SafeAreaView style={styles.topContainer}>
      <View style={styles.topView}>
        <TouchableOpacity onPress={ ()=>{ Linking.openURL('https://www.ggc.edu/about-ggc/news/')}}>
          <HamburgerButton />
        </TouchableOpacity>
        {profilePic !== null ? (
          <TouchableOpacity onPress={() => selectImageFromLibrary()}>
            {profilePic && (
              <Image source={{ uri: profilePic }} style={styles.profilePic} />
            )}
          </TouchableOpacity>
        ) : null}
        {profilePic === null ? (
          <TouchableOpacity onPress={() => selectImageFromLibrary()}>
            <AddButton />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity onPress={handleSignOut}>
          <LogOutButton />
        </TouchableOpacity>
      </View>
      <View>
        <WeatherAPIComp />
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
                {
                  (item.posts && !item.posts.includes("ImagePicker") ? (
                    <Text style={styles.itemText}>{item.posts}</Text>
                  ) : (
                    <Image source={{ uri: item.posts }} style={styles.imagePost} />
                  ))
                }
                <Text style={styles.authorText}>
                  By Anonymous #{getRandomID()}
                </Text>
                <TouchableOpacity onPress={() => fetchLike(item.id)}>
                  <LikeButton />
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
          <View style={styles.imageMenu}>
            <MenuProvider>
              <Menu>
                  <MenuTrigger style={styles.trigger}>
                    <Camera></Camera>
                  </MenuTrigger>  
                <MenuOptions>
                  <MenuOption onSelect={() => takePhotoFromCamera()} text='Take Photo' />
                  <MenuOption onSelect={() => postImageFromLibrary()} text='Select Image' >
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </MenuProvider>
          </View>
            <TouchableOpacity onPress={addField}>
              <PostButton />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("My Posts")}>
              <MyProfile />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profilePic: {
    height: 50,
    width: 50,
    borderRadius: 400 / 2,
  },
  images: {
    height: 400,
    width: 400,
  },
  container: {
    padding: 20,
    margin: 5,
    marginHorizontal: 5,
  },
  authorText: {
    fontSize: 12,
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
  imageMenu: {
    flexBasis: "12%",
  },
  trigger: {
    margin: 1,
    right: 20
  },
  imagePost: {
    width: 100,
    height: 100
  }
});

export default MainScreen;
