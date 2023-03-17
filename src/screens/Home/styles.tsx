import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center'
  },
  activityIndicatorView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    width: '100%',
    height: RFValue(70),
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: '#fff'
  },
  textHeader: {
    fontSize: RFValue(15),
    color: '#000',
    marginTop: 20
  },
  viewHolidaysList: {
    flex: 1,
    width: '90%',
    marginBottom: 10
  },
  holidaysList: {
    width: '100%',
    marginBottom: 10
  },
  viewCamera: {
    zIndex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 12
  },
  image: {
    width: '100%',
    height: '88%',
    borderRadius: 12
  },
  button: {
    width: '100%',
    height: '10%',
    marginTop: RFValue(20),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  viewButtonsCapturedPhoto: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: RFValue(10),
    marginVertical: RFValue(20),
    backgroundColor: 'transparent'
  },
  touchableIcon: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center'
  },
  icon: {
    fontSize: RFValue(30),
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(5)
  }
})
