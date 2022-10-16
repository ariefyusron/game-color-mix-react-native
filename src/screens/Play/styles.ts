import { StyleSheet } from "react-native";

import { widthPercent } from "../../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  wrapCompareColor: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 32,
  },
  containerColor: {
    width: widthPercent(35),
    height: widthPercent(35),
    borderWidth: 1,
    borderColor: "#7f8c8d",
  },
  indicatorTimer: {
    width: "100%",
    height: "100%",
  },
  wrapIndicatorTimer: {
    backgroundColor: "#bdc3c7",
    width: "100%",
    height: 30,
  },
  textTimer: {
    color: "#000",
    fontWeight: "bold",
  },
  wrapTextTimer: {
    width: "100%",
    height: 30,
    position: "absolute",
    top: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    paddingHorizontal: 28,
    marginVertical: 36,
  },
  wrapButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  titleContainerColor: {
    textAlign: "center",
    marginBottom: 8,
  },
  textScore: {
    fontWeight: "bold",
    color: "#000",
  },
  wrapTextScore: {
    alignItems: "flex-end",
    padding: 16,
  },
  wrapTextHint: {
    alignItems: "center",
    marginTop: 32,
  },
});

export default styles;
