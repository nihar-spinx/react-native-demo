import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getBusinessById } from "@/data/businesses";

export default function BusinessDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const business = getBusinessById(id);

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/directory");
    }
  };

  if (!business) {
    return (
      <SafeAreaView style={styles.notFoundScreen} edges={["top"]}>
        <Pressable
          onPress={goBack}
          hitSlop={10}
          style={({ pressed }) => [styles.backFab, pressed && styles.pressed]}
        >
          <Ionicons name="arrow-back" size={22} color="#ffffff" />
        </Pressable>
        <View style={styles.notFound}>
          <Ionicons name="alert-circle-outline" size={48} color="#b8a89f" />
          <Text style={styles.notFoundText}>Business not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero image with brand overlay + floating back button */}
        <View style={styles.hero}>
          <Image source={business.image} style={styles.heroImage} />
          <View style={styles.heroScrim} />

          <SafeAreaView edges={["top"]} style={styles.heroTopBar}>
            <Pressable
              onPress={goBack}
              hitSlop={10}
              style={({ pressed }) => [
                styles.backFab,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons name="arrow-back" size={22} color="#ffffff" />
            </Pressable>
          </SafeAreaView>

          {/* Name overlaid on the image */}
          <View style={styles.heroCaption}>
            <Text style={styles.heroName}>{business.name}</Text>
            <View style={styles.heroLocationRow}>
              <Ionicons name="location-sharp" size={14} color="#f2d9cf" />
              <Text style={styles.heroLocation}>{business.location}</Text>
            </View>
          </View>
        </View>

        {/* Content sheet — rounded top, overlaps the hero via padding (no negative margin) */}
        <View style={styles.sheet}>
          <View style={styles.tagRow}>
            {business.tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{business.description}</Text>

          {/* Quick info card */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="location-outline" size={18} color="#812a16" />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoValue}>{business.location}</Text>
              </View>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="pricetag-outline"
                  size={18}
                  color="#812a16"
                />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Category</Text>
                <Text style={styles.infoValue}>{business.tags.join(", ")}</Text>
              </View>
            </View>
          </View>

          {/* Primary action */}
          <Pressable
            onPress={goBack}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.primaryButtonPressed,
            ]}
          >
            <Ionicons name="arrow-back" size={18} color="#ffffff" />
            <Text style={styles.primaryButtonText}>Back to Directory</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#812a16",
  },

  scrollContent: {
    paddingBottom: 32,
    backgroundColor: "#f7f2ef",
  },

  /* ---- Hero ---- */
  hero: {
    height: 300,
    backgroundColor: "#812a16",
  },

  heroImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },

  // Dark brand scrim so overlaid text stays readable on any photo.
  heroScrim: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(43, 16, 10, 0.35)",
  },

  heroTopBar: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  backFab: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(20, 10, 6, 0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  pressed: {
    opacity: 0.7,
  },

  heroCaption: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 44,
  },

  heroName: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: -0.5,
    textShadowColor: "rgba(0,0,0,0.35)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },

  heroLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },

  heroLocation: {
    fontSize: 14,
    color: "#f2d9cf",
    fontWeight: "500",
  },

  /* ---- Content sheet ---- */
  sheet: {
    backgroundColor: "#f7f2ef",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -28,
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  tag: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ecdcd2",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },

  tagText: {
    fontSize: 12,
    color: "#9a3a24",
    fontWeight: "600",
    letterSpacing: 0.1,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2b1a14",
    marginTop: 24,
    marginBottom: 10,
    letterSpacing: -0.2,
  },

  description: {
    fontSize: 15,
    lineHeight: 25,
    color: "#5c504b",
  },

  /* ---- Info card ---- */
  infoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#efe6e0",
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginTop: 24,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
  },

  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#f7e6dc",
    justifyContent: "center",
    alignItems: "center",
  },

  infoText: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 12,
    color: "#a89e99",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },

  infoValue: {
    fontSize: 15,
    color: "#2b1a14",
    fontWeight: "500",
    marginTop: 2,
  },

  infoDivider: {
    height: 1,
    backgroundColor: "#f0e8e3",
  },

  /* ---- Primary button ---- */
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#812a16",
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 28,
  },

  primaryButtonPressed: {
    opacity: 0.9,
  },

  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  /* ---- Not found ---- */
  notFoundScreen: {
    flex: 1,
    backgroundColor: "#f7f2ef",
  },

  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },

  notFoundText: {
    fontSize: 18,
    color: "#8a7d78",
  },
});
