
import color from '../color/Index'
import { ColorPropType } from 'react-native';

export default {
borderRadius: 5,
fontOne:{
fontSize: 18,
},

abstractCardStyles:{
  borderBottomWidth: 0.5,
  borderColor: color.lightGrey,
  backgroundColor: '#FDFEFE'
},

abstractCountCardStyles:{
  borderWidth: 0.5,
  borderColor: color.lightGrey,
  backgroundColor: '#FDFEFE'
},


shadow:{
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 12,
  },
  shadowOpacity: 0.58,
  shadowRadius: 16.00,
  elevation: 0.4111
},

searchBarContainerStyle: {
    width: "95%",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: color.white,
    marginVertical: 20,
    

  },
  searchBarInputStyle: {
    fontSize: 14,
  },
  searchBarInputContainerStyle: {
    backgroundColor: color.white,
    shadowColor: "#aaa",
    shadowOpacity: 0.6,
    borderBottomWidth: 0.5,
    borderColor:color.black,
    height: 50,
  },
  searchContainerStyle: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
}