import { StyleSheet } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: RFValue(20),
    borderRadius: 10,
    marginTop: RFValue(10),
    backgroundColor: 'white'
  },
  title: {
    marginBottom: RFValue(14),
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: '#000'
  },
  textDate: {
    fontSize: RFValue(14),
    color: '#000'
  },
  image: {
    width: RFValue(265),
    height: RFValue(265),
    margin: RFValue(10),
    borderRadius: 14
  },
  latElongText: {
    width: '94%',
    marginBottom: RFValue(7),
    fontSize: RFValue(12),
    fontWeight: 'bold',
    color: '#000'
  },
  description: {
    width: '94%',
    textAlign: 'justify',
    lineHeight: RFValue(23),
    marginBottom: RFValue(20),
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: '#000'
  },
  descriptionButton: {
    textAlign: 'center',
    fontSize: RFValue(12),
    fontWeight: 'bold',
    color: '#000'
  },
  viewRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    width: '100%',
    marginTop: RFValue(20),
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    fontSize: RFValue(27),
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(5)
  },
});
