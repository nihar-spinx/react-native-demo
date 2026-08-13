import { BUSINESSES, Business } from "@/data/businesses";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CATEGORIES = [
  "All",
  "Bakery Foods",
  "Coffee & Beverages",
  "Farms & Ranches",
  "Grocery & Retail",
  "Herbal & Foraged",
  "Seafood",
] as const;

type ViewMode = "list" | "grid";

function BusinessCard({
  business,
  viewMode,
}: {
  business: Business;
  viewMode: ViewMode;
}) {
  const isGrid = viewMode === "grid";

  // Outer View is the flex item — it reliably holds the grid width.
  // The Link/Pressable lives inside and handles tap + card visuals, so
  // the RN-Web <a> wrapper never becomes the flex item.
  return (
    <View style={isGrid ? styles.gridItem : styles.listItem}>
      <Link
        href={{ pathname: "/business/[id]", params: { id: business.id } }}
        asChild
      >
        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <View style={styles.imageWrap}>
            <Image
              source={business.image}
              style={[styles.cardImage, isGrid && styles.cardImageGrid]}
            />
          </View>
          <View style={[styles.cardBody, isGrid && styles.cardBodyGrid]}>
            <Text
              style={styles.cardName}
              numberOfLines={isGrid ? 2 : undefined}
            >
              {business.name}
            </Text>
            <View style={styles.cardLocation}>
              <Ionicons name="location-outline" size={13} color="#a89e99" />
              <Text style={styles.cardLocationText} numberOfLines={1}>
                {business.location}
              </Text>
            </View>

            {/* Description only in list view — grid stays compact */}
            {!isGrid && (
              <Text style={styles.cardDescription} numberOfLines={3}>
                {business.description}
              </Text>
            )}

            <View style={styles.tagRow}>
              {(isGrid ? business.tags.slice(0, 1) : business.tags).map(
                (tag) => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText} numberOfLines={1}>
                      {tag}
                    </Text>
                  </View>
                ),
              )}
            </View>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}

export default function DirectoryScreen() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const filtered = useMemo(() => {
    return BUSINESSES.filter((b) => {
      const matchesCategory =
        activeCategory === "All" || b.tags.includes(activeCategory);
      const matchesQuery =
        query.trim() === "" ||
        b.name.toLowerCase().includes(query.trim().toLowerCase()) ||
        b.location.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            Find Native businesses you can trust.
          </Text>
          <Text style={styles.heroSubtitle}>
            Browse verified Native-owned producers, makers, and food businesses.
          </Text>
        </View>

        {/* Search — floats over the hero boundary, half in each section */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#9a3a24" />
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#b8a89f"
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
          />
        </View>

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsRow}
          contentContainerStyle={styles.chipsContent}
        >
          {CATEGORIES.map((cat) => {
            const active = cat === activeCategory;
            return (
              <Pressable
                key={cat}
                onPress={() => setActiveCategory(cat)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text
                  style={[styles.chipText, active && styles.chipTextActive]}
                >
                  {cat}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Count + view toggle */}
        <View style={styles.countRow}>
          <Text style={styles.count}>
            {filtered.length}{" "}
            {filtered.length === 1 ? "business" : "businesses"}
          </Text>

          <View style={styles.toggle}>
            <Pressable
              onPress={() => setViewMode("grid")}
              style={[
                styles.toggleBtn,
                viewMode === "grid" && styles.toggleBtnActive,
              ]}
            >
              <Ionicons
                name="grid"
                size={18}
                color={viewMode === "grid" ? "#ffffff" : "#8a7d78"}
              />
            </Pressable>
            <Pressable
              onPress={() => setViewMode("list")}
              style={[
                styles.toggleBtn,
                viewMode === "list" && styles.toggleBtnActive,
              ]}
            >
              <Ionicons
                name="list"
                size={20}
                color={viewMode === "list" ? "#ffffff" : "#8a7d78"}
              />
            </Pressable>
          </View>
        </View>

        {/* Business cards */}
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="sad-outline" size={40} color="#b8a89f" />
            <Text style={styles.emptyText}>No businesses found</Text>
          </View>
        ) : (
          <View style={[styles.list, viewMode === "grid" && styles.grid]}>
            {filtered.map((business) => (
              <BusinessCard
                key={business.id}
                business={business}
                viewMode={viewMode}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

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

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 20,
    marginTop: -28,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },

  searchInput: {
    flex: 1,
    color: "#2b1a14",
    fontSize: 15,
    padding: 0,
  },

  chipsRow: {
    marginTop: 20,
  },

  chipsContent: {
    paddingHorizontal: 20,
    gap: 8,
  },

  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e7ddd7",
  },

  chipActive: {
    backgroundColor: "#812a16",
    borderColor: "#812a16",
  },

  chipText: {
    fontSize: 13,
    color: "#6b5d56",
    fontWeight: "500",
  },

  chipTextActive: {
    color: "#ffffff",
  },

  countRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 20,
  },

  count: {
    fontSize: 13,
    color: "#8a7d78",
    fontWeight: "600",
    letterSpacing: 0.2,
    textTransform: "uppercase",
  },

  toggle: {
    flexDirection: "row",
    backgroundColor: "#ece3dd",
    borderRadius: 10,
    padding: 3,
    gap: 3,
  },

  toggleBtn: {
    width: 34,
    height: 30,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  toggleBtnActive: {
    backgroundColor: "#812a16",
  },

  list: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  // Layout wrappers (the flex items) — these own the width/spacing.
  listItem: {
    width: "100%",
    marginBottom: 16,
  },

  gridItem: {
    width: "48%",
    marginBottom: 16,
  },

  // Visual card — fills its wrapper, no layout responsibility.
  card: {
    width: "100%",
    backgroundColor: "#efe1d8",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e2cfc2",
    padding: 8,
    overflow: "hidden",
    shadowColor: "#812a16",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },

  cardPressed: {
    opacity: 0.85,
  },

  imageWrap: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.04)",
  },

  cardImage: {
    width: "100%",
    height: 160,
    backgroundColor: "#e7ddd7",
  },

  cardImageGrid: {
    height: 120,
  },

  cardBody: {
    paddingHorizontal: 8,
    paddingTop: 12,
    paddingBottom: 6,
  },

  cardBodyGrid: {
    paddingHorizontal: 6,
    paddingTop: 10,
    paddingBottom: 4,
  },

  cardName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2b1a14",
    letterSpacing: -0.3,
    lineHeight: 22,
  },

  cardLocation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 5,
  },

  cardLocationText: {
    fontSize: 12.5,
    color: "#8a7d78",
    fontWeight: "500",
  },

  cardDescription: {
    fontSize: 14,
    color: "#6b5d56",
    lineHeight: 20,
    marginTop: 10,
  },

  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 12,
  },

  tag: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ecdcd2",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },

  tagText: {
    fontSize: 11.5,
    color: "#9a3a24",
    fontWeight: "600",
    letterSpacing: 0.1,
  },

  empty: {
    alignItems: "center",
    paddingVertical: 60,
    gap: 12,
  },

  emptyText: {
    fontSize: 16,
    color: "#b8a89f",
  },
});
