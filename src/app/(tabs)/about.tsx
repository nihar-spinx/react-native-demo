import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const STATS = [
  { label: "Businesses", value: "1,200+" },
  { label: "Cities", value: "45" },
  { label: "Happy Users", value: "30K" },
];

const FEATURES = [
  {
    icon: "search",
    title: "Discover",
    description: "Find local shops, services, and listings near you in seconds.",
  },
  {
    icon: "star",
    title: "Trusted Reviews",
    description: "Real ratings from real people help you choose with confidence.",
  },
  {
    icon: "location",
    title: "Local First",
    description: "We put your neighborhood businesses front and center.",
  },
  {
    icon: "shield-checkmark",
    title: "Verified Listings",
    description: "Every business is checked so you always reach the right place.",
  },
] as const;

export default function AboutScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.iconBadge}>
          <Ionicons name="business" size={32} color="#ffffff" />
        </View>
        <Text style={styles.heroTitle}>About MyFirstApp</Text>
        <Text style={styles.heroSubtitle}>
          We connect people with the local businesses, shops, and services
          that make their community thrive.
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        {STATS.map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Mission */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.paragraph}>
          MyFirstApp started with a simple idea: make it effortless to find
          and support the businesses around you. Whether you're looking for a
          coffee shop, a repair service, or a hidden gem, we bring the local
          directory right to your pocket.
        </Text>
      </View>

      {/* Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What We Offer</Text>
        {FEATURES.map((feature) => (
          <View key={feature.title} style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons name={feature.icon} size={22} color="#812a16" />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>
                {feature.description}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Made with care · v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#faf6f4",
  },

  content: {
    paddingBottom: 32,
  },

  hero: {
    backgroundColor: "#812a16",
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    alignItems: "center",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  iconBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  heroTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
  },

  heroSubtitle: {
    fontSize: 15,
    color: "#f2d9cf",
    textAlign: "center",
    lineHeight: 22,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: -24,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginHorizontal: 4,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#812a16",
  },

  statLabel: {
    fontSize: 12,
    color: "#8a7d78",
    marginTop: 4,
  },

  section: {
    paddingHorizontal: 24,
    marginTop: 28,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2b1a14",
    marginBottom: 12,
  },

  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    color: "#5c504b",
  },

  featureCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f7e6dc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  featureText: {
    flex: 1,
  },

  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2b1a14",
    marginBottom: 3,
  },

  featureDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: "#7a6f6a",
  },

  footer: {
    alignItems: "center",
    marginTop: 28,
  },

  footerText: {
    fontSize: 13,
    color: "#a89e99",
  },
});
