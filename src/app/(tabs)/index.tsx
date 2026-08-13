import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../../assets/images/logo-white.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>MyFirstApp</Text>

        <Text style={styles.tagline}>
          Discover local businesses, shops, and listings - all in one place.
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => router.navigate("/about")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#812a16",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 48,
    paddingHorizontal: 24,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 280,
    marginBottom: 24,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 12,
  },

  tagline: {
    fontSize: 16,
    color: "#f2d9cf",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 12,
  },

  button: {
    width: "100%",
    backgroundColor: "#dd833c",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: "center",
  },

  buttonPressed: {
    opacity: 0.85,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
  },
});
