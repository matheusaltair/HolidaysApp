import { StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  camera: {
    width: '100%',
    height: '96%',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: RFValue(15),
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    color: 'white',
  },
  icon: {
    fontSize: RFValue(27),
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(5)
  }
});