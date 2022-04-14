import { StyleSheet } from "react-native";

const styleSheet = StyleSheet.create({
  solidButton: {
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#00A3E0',
    width: 200,
  },
  outlineButton: {
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#00A3E0',
    borderWidth: 2,
    width: 200,
  },
  blueShadow: {
    borderWidth: 1,
    shadowColor: '#003087',
    shadowRadius: 3,
    shadowOpacity: .2,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    borderColor: '#00A3E0',
  },
});

export default styleSheet
