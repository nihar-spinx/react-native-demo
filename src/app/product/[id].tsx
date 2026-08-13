import { getProductById } from "@/data/products";
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

function Stars({ rating }: { rating: number }) {
  return (
    <View style={styles.stars}>
      {[1, 2, 3, 4, 5].map((i) => {
        const name =
          rating >= i
            ? "star"
            : rating >= i - 0.5
              ? "star-half"
              : "star-outline";
        return <Ionicons key={i} name={name} size={16} color="#dd833c" />;
      })}
      <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
    </View>
  );
}

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = getProductById(id);

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/shop");
    }
  };

  if (!product) {
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
          <Text style={styles.notFoundText}>Product not found</Text>
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
          <Image source={product.image} style={styles.heroImage} />
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

          <View style={styles.heroCaption}>
            <View style={styles.typeBadge}>
              <Text style={styles.typeBadgeText}>{product.type}</Text>
            </View>
            <Text style={styles.heroName}>{product.name}</Text>
          </View>
        </View>

        {/* Content sheet */}
        <View style={styles.sheet}>
          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <Stars rating={product.rating} />
          </View>

          <Text style={styles.sectionTitle}>Details</Text>
          <Text style={styles.description}>
            {product.name} is a Native-made {product.type.toLowerCase()}{" "}
            product, crafted in small batches and sourced from Indigenous
            producers. Every order supports the makers and their communities.
          </Text>

          {/* Quick info card */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="pricetag-outline" size={18} color="#812a16" />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Type</Text>
                <Text style={styles.infoValue}>{product.type}</Text>
              </View>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="star-outline" size={18} color="#812a16" />
              </View>
              <View style={styles.infoText}>
                <Text style={styles.infoLabel}>Rating</Text>
                <Text style={styles.infoValue}>
                  {product.rating.toFixed(1)} out of 5
                </Text>
              </View>
            </View>
          </View>

          {/* Primary action */}
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.primaryButtonPressed,
            ]}
          >
            <Ionicons name="bag-add-outline" size={18} color="#ffffff" />
            <Text style={styles.primaryButtonText}>Add to Cart</Text>
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

  typeBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 10,
  },

  typeBadgeText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },

  heroName: {
    fontSize: 26,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: -0.5,
    textShadowColor: "rgba(0,0,0,0.35)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
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

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  price: {
    fontSize: 28,
    fontWeight: "700",
    color: "#9a3a24",
    letterSpacing: -0.5,
  },

  stars: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },

  ratingText: {
    marginLeft: 6,
    fontSize: 13,
    color: "#8a7d78",
    fontWeight: "600",
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
