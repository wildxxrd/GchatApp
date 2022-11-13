import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { firebase } from "../../config";
import { getAuth } from "firebase/auth";
import LikeButton from "../Icons/LikeButton";
import ReportButton from "../Icons/ReportButton";
import HomeIcon from "../Icons/HomeIcon";

const UserPosts = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;

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
          onEndReachedThreshold={0.5}
          onEndReached={() => fetchMore()}
          numColumns={1}
          renderItem={({ item }) => (
            <Pressable style={styles.container}>
              <View style={styles.textContainer}>
                <Text style={styles.itemText}>{item.posts}</Text>
                <Text style={styles.authorText}>
                {JSON.stringify(item.createdAt.toDate().toLocaleDateString())}
                </Text>
                <LikeButton />
                <ReportButton /> 
                <Text>{item.likes}</Text>
                
              </View>
            </Pressable>
          )}
        />
        <View style={styles.bottomContainer}>
          <View style={styles.bottomView}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <HomeIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const fetchMore = () => {
  // TODO: implement Lazy Loading
  // getPainatedTasks()
  //   .then(snapshots => snapshots.docs.map(mapDocToTask))
}

const styles = StyleSheet.create({
  titleText: {
    alignItems: 'center',
    color: "#3C4048",
    fontStyle: 'italic',
    fontSize: 40,
    marginHorizontal: 20,
    fontWeight: "bold",
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
    marginVertical: 0,
  },
  itemText: {
    padding: 5,
    fontSize: 30,
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
    backgroundColor: '#00ABB3',
    marginHorizontal: 10,
    height: 80,
    borderRadius: 80 /2,
  },
});

export default UserPosts;
