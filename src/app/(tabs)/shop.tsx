import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PRODUCTS, Product } from "@/data/products";

function Stars({ rating }: { rating: number }) {
  // Render 5 icons: full, half, or empty based on the rating.
  return (
    <View style={styles.stars}>
      {[1, 2, 3, 4, 5].map((i) => {
        const name =
          rating >= i ? "star" : rating >= i - 0.5 ? "star-half" : "star-outline";
        return <Ionicons key={i} name={name} size={13} color="#dd833c" />;
      })}
    </View>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <View style={styles.cardWrap}>
      <Link
        href={{ pathname: "/product/[id]", params: { id: product.id } }}
        asChild
      >
        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <View style={styles.imageWrap}>
            <Image source={product.image} style={styles.image} />
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.name} numberOfLines={2}>
              {product.name}
            </Text>
            <Stars rating={product.rating} />
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}

function FilterPill({ label }: { label: string }) {
  return (
    <Pressable style={styles.pill}>
      <Text style={styles.pillText} numberOfLines={1}>
        {label}
      </Text>
      <Ionicons name="chevron-down" size={16} color="#812a16" />
    </Pressable>
  );
}

export default function ShopScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero banner — same treatment as the Directory page */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Shop</Text>
          <Text style={styles.heroSubtitle}>
            Native-made foods, goods, and remedies — shipped to your door.
          </Text>
        </View>

        {/* Filter pills — float over the hero boundary, half in each section */}
        <View style={styles.filterRow}>
          <FilterPill label="All Product Types" />
          <FilterPill label="All Prices" />
        </View>

        {/* Product grid */}
        <View style={styles.grid}>
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  scrollContent: {
    paddingBottom: 32,
  },

  // Hero banner — mirrors the Directory page's top banner treatment.
  hero: {
    backgroundColor: "#812a16",
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 44,
    alignItems: "center",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  heroTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#f7ede9",
    textAlign: "center",
    lineHeight: 34,
    letterSpacing: -0.5,
  },

  heroSubtitle: {
    fontSize: 14,
    color: "#e5c3b6",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 20,
    maxWidth: 320,
  },

  // Filter pills float over the hero boundary, like the Directory search box.
  filterRow: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 20,
    marginTop: -28,
  },

  pill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e7d9d0",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },

  pillText: {
    flex: 1,
    fontSize: 14,
    color: "#5c504b",
    fontWeight: "500",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },

  cardWrap: {
    width: "48%",
    marginBottom: 16,
  },

  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#efe6e0",
    padding: 8,
    overflow: "hidden",
    shadowColor: "#812a16",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },

  cardPressed: {
    opacity: 0.9,
  },

  imageWrap: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.04)",
  },

  image: {
    width: "100%",
    height: 140,
    backgroundColor: "#e7ddd7",
  },

  cardBody: {
    paddingHorizontal: 6,
    paddingTop: 12,
    paddingBottom: 4,
  },

  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2b1a14",
    letterSpacing: -0.2,
    lineHeight: 20,
    minHeight: 40, // reserve 2 lines so ratings/prices align across cards
  },

  stars: {
    flexDirection: "row",
    gap: 1,
    marginTop: 8,
  },

  price: {
    fontSize: 15,
    fontWeight: "700",
    color: "#9a3a24",
    marginTop: 8,
  },
});
