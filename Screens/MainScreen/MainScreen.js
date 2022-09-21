import {
  Image,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import HamburgerButton from "../Icons/HamburgerButton";
import PostButton from "../Icons/PostButton";
import Refreshbutton from "../Icons/RefreshButton";
import SettingsButton from "../Icons/SettingsButton";

const MainScreen = () => {
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
      <View style={styles.bottomContainer}>
        <View style={styles.bottomView}>
          <PostButton />
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
