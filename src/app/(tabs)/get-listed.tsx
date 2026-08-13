import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Field = {
  key: "firstName" | "lastName" | "email" | "phone";
  label: string;
  placeholder: string;
  keyboardType?: "default" | "email-address" | "phone-pad";
  autoCapitalize?: "none" | "words";
};

const FIELDS: Field[] = [
  {
    key: "firstName",
    label: "First Name",
    placeholder: "Enter your first name",
    autoCapitalize: "words",
  },
  {
    key: "lastName",
    label: "Last Name",
    placeholder: "Enter your last name",
    autoCapitalize: "words",
  },
  {
    key: "email",
    label: "Email",
    placeholder: "you@example.com",
    keyboardType: "email-address",
    autoCapitalize: "none",
  },
  {
    key: "phone",
    label: "Phone",
    placeholder: "(555) 123-4567",
    keyboardType: "phone-pad",
  },
];

export default function GetListedScreen() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const setField = (key: Field["key"], text: string) =>
    setValues((prev) => ({ ...prev, [key]: text }));

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Hero banner — same treatment as the Directory / Shop pages */}
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>Get Listed</Text>
            <Text style={styles.heroSubtitle}>
              Join a growing community of verified Native-owned producers,
              makers, and food businesses.
            </Text>
          </View>

          {/* Intro copy */}
          <View style={styles.introWrap}>
            <Text style={styles.intro}>
              Get your business in front of the customers, buyers, and partners
              looking to support Native-owned farms, makers, and food
              businesses — and tap into events, funding, and hands-on support to
              help your business grow.
            </Text>

            <Text style={styles.intro}>
              Listing is free, and every business is reviewed and verified
              Native-owned before it goes live, so your listing carries the
              trust that brings people in.
            </Text>
          </View>

          {/* Form card */}
          <View style={styles.card}>
            {FIELDS.map((field) => (
              <View key={field.key} style={styles.fieldGroup}>
                <Text style={styles.label}>
                  {field.label} <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder={field.placeholder}
                  placeholderTextColor="#b8a89f"
                  value={values[field.key]}
                  onChangeText={(text) => setField(field.key, text)}
                  keyboardType={field.keyboardType ?? "default"}
                  autoCapitalize={field.autoCapitalize ?? "sentences"}
                />
              </View>
            ))}

            <Pressable
              style={({ pressed }) => [
                styles.continueButton,
                pressed && styles.continueButtonPressed,
              ]}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  flex: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 40,
  },

  // Hero banner — mirrors the Directory / Shop top banner treatment.
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

  introWrap: {
    paddingHorizontal: 24,
    marginTop: 24,
  },

  intro: {
    fontSize: 15,
    lineHeight: 23,
    color: "#5c504b",
    marginTop: 14,
  },

  /* ---- Form card — floats up toward the intro, consistent card styling ---- */
  card: {
    backgroundColor: "#f7f2ef",
    borderWidth: 1,
    borderColor: "#efe6e0",
    borderRadius: 20,
    padding: 22,
    marginHorizontal: 24,
    marginTop: 24,
    shadowColor: "#812a16",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },

  fieldGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#812a16",
    marginBottom: 8,
  },

  required: {
    color: "#dd833c",
    fontWeight: "700",
  },

  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e7d9d0",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#2b1a14",
  },

  /* ---- Continue button ---- */
  continueButton: {
    alignSelf: "flex-start",
    backgroundColor: "#dd833c",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 24,
    marginTop: 6,
  },

  continueButtonPressed: {
    opacity: 0.9,
  },

  continueButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4a1e0e",
  },
});
