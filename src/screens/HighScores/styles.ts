import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 32,
  },
  title: {
    fontWeight: "bold",
    fontSize: 32,
    textAlign: "center",
    marginBottom: 32,
  },
  text: {
    fontSize: 24,
  },
  card: {
    backgroundColor: "#fff",
    elevation: 3,
    flexDirection: "row",
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    marginBottom: 16,
    marginHorizontal: 32,
  },
  textNumber: {
    fontSize: 28,
  },
  wrapTextNumber: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderWidth: 1,
    borderColor: "#2c3e50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  wrapEmpty: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 64,
  },
});

export default styles;
