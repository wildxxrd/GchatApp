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
  MenuProvider,

} from 'react-native-popup-menu';
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { firebase } from "../../config";
import HamburgerButton from "../Icons/GlobeLinkIcon";
import PostButton from "../Icons/PostButton";
import LogOutButton from "../Icons/LogOutButton";
import WeatherAPIComp from "./WeatherAPIComp";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import AddButton from "../Icons/AddButton";
import * as ImagePicker from "expo-image-picker";
import LikeButton from "../Icons/LikeButton";
import MyProfile from "../Icons/MyProfile";
import Camera from "../Icons/Camera";
import {getAuth} from "firebase/auth";
import Report from "../Icons/Report";



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
  // postImageFromLibrary() allows user to choose a picture and add the URI in 'What's in your mind?' dropbox to let post image if desired.
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

  // takePhotoFromCamera() allows user to take a picture and add the URI in 'What's in your mind?' dropbox to let post image if desired.
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

  // addField() adds a new post.
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

  // fetchLike() updates amount of likes in Firebase when a post receives a like.
  const fetchLike = (postId) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .update({
        likes: firebase.firestore.FieldValue.increment(1),
      });
  };

  const fetchReport = (postId) => {
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .update({
          reports: firebase.firestore.FieldValue.increment(1),
        });
        window.alert("Thank you for reporting")
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

  const deletePost = (postId) => {
    firebase.firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        window.alert("Post deleted")
      })
  }

  const Divider = () => <View style={styles.divider} />;
  

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
        {profilePic === "" ? (
          <TouchableOpacity onPress={() => selectImageFromLibrary()}>
            <AddButton style={styles.addButton} />
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
        style={{ marginHorizontal: 0, maxHeight: 490 }}
        data={userPosts}
        numColumns={1}
        renderItem={({ item }) => (
          <LinearGradient colors={["#04337A", "#DFF6FF"]}>
            <Pressable style={styles.container} onLongPress ={() => window.alert("long press")}>
              <View style={styles.textContainer} >
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
                <MenuProvider style={{alignItems:'flex-end', skipInstanceCheck: 'true'}}>
              <Menu>
              <MenuTrigger>
                <Report/>
              </MenuTrigger>
                <MenuOptions>
                  <MenuOption onSelect={() => fetchReport(item.id)} >
                  <Text>Report</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </MenuProvider>
              </View>
            </Pressable>
          </LinearGradient>
        )}
      />
      <View style={styles.bottomContainer}>
        <LinearGradient colors={["#04337A", "white"]}>
          <View style={styles.bottomView}>
            <View>
            <MenuProvider style={styles.menuContainer} skipInstanceCheck='true'>
              <Menu>
                <MenuTrigger style={styles.triggerWrapper} >
                <Camera></Camera> 
                </MenuTrigger>  
                <MenuOptions style={styles.optionsWrapper}>
                  <ScrollView style={{ height: 70 }}>
                    <MenuOption onSelect={() => takePhotoFromCamera()} text='Take Photo' />
                    <Divider></Divider>
                    <MenuOption onSelect={() => postImageFromLibrary()} text='Select Image' />
                    <Divider></Divider>
                    <MenuOption onPress={() => {
                    this.props.onLogout()
                    this.setState({ opened: false })
                    }} text='Cancel'/>
                  </ScrollView>
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
  authorText: {
    fontSize: 12,
  },
  addButton: {
    position: "absolute",
    left: 20
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  bottomView: {
    flexDirection: "row",
    alignItems: "center",
    right: 12,
    justifyContent: "space-between",
    marginHorizontal: 15,
    height: 75,
  },
  container: {
    padding: 20,
    margin: 5,
    marginHorizontal: 5,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#7F8487",
  },
  itemText: {
    padding: 5,
    fontSize: 20,
    fontWeight: "300",
  },
  imagePost: {
    width: 360,
    height: 250,
  },
  optionsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  middleViewText: {
    fontWeight: "450",
    fontSize: 25,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  middleView: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  menuContainer: {
    top: 12,
  },
  profilePic: {
    height: 60,
    width: 60,
    borderRadius: 400 / 2,
  },
  textContainer: {
    marginVertical: 10,
  },
  textDisplay: {
    padding: 20,
    fontSize: 16,
  },
  topContainer: {
    flex: 1,
  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    marginHorizontal: 10,
  },
  triggerWrapper: {
    marginHorizontal: 26,
  },
  userInput: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    height: 40,
    width: 350,
    marginHorizontal: 30,
    borderRadius: 10,
    marginBottom: 15,
  },
  weatherView: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  }
});

export default MainScreen;
