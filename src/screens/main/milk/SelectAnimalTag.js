import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, Text, TouchableOpacity, View,} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../../assets/color/Index';
import styles from '../../../assets/styles/Index';

import {
  CardLongPressView,
  Date,
  Row,
  SmartView,
  EditMilk,
} from '../../../components/Index';
import {
  deleteMilk,
  filterMilkData,
  getMilk,
  editMilkVisible,
} from '../../../redux/actions/Index';
import {agoDate, currentDate, formatDate} from './../../../conversions/Index';
import {SearchBar} from 'react-native-elements';
import {
  selectAnimalTagItem,
  selectAnimalTagVisible,
} from '../../../redux/actions/Index';

function SelectAnimalTag({navigation}) {
  const milkReducerState = useSelector(state => state.milk);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(milkReducerState.animalTagData);


  useEffect(() => {}, []);

  const onChangeText = async searchTerm => {
    setSearchTerm(searchTerm);

    if (
      searchTerm.trim().length >= 1 &&
      data.length != 0
    ) {
      try {
        var suggestion = await data
          .sort()
          .filter(x => {
            return new RegExp(searchTerm, 'i').test(x.tag);
          });
      } catch (e) {
        // this.setState({searchFound: false});
      }

      if (suggestion.length == 0) {
        setData(suggestion)
      } else {
        setData(suggestion)
      }
    } else {
      setData(milkReducerState.animalTagData)

    }
  };

  return (
      <SmartView>
        <View style={selectAnimalTagStyles.form}>
          
          <SearchBar
            lightTheme
            placeholder="Search"
            containerStyle={styles.searchBarContainerStyle}
            inputContainerStyle={styles.searchBarInputContainerStyle}
            inputStyle={styles.searchBarInputStyle}
            onChangeText={searchTerm => onChangeText(searchTerm)}
            value={searchTerm}
          />

          {data.length == 0 &&
          milkReducerState.milkLoading == false ? (
            <View style={selectAnimalTagStyles.noRecordView}>
              <Text style={selectAnimalTagStyles.noRecordText}>
                No Record Found
              </Text>
            </View>
          ) : (
            <FlatList
              data={data}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>{
                    dispatch(selectAnimalTagItem({tag: item.tag, id: item._id}))
                    navigation.goBack()
                  }}
                  style={selectAnimalTagStyles.cardContainer}>
                  <View style={[selectAnimalTagStyles.cardContainerChild,]}>
                    <Row label={'Animal Tag'} value={item.tag} />
                  
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </SmartView>
  );
}

export {SelectAnimalTag};

const selectAnimalTagStyles = {
  dismissRow: {
    borderWidth: 0,
    height: 40,
    width: '110%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dismissTextContainer: {
    borderWidth: 0,
    height: 35,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  form: {
    backgroundColor: color.white,
    alignItems: 'center',
    width: '100%',
    borderRadius: styles.borderRadius,
    flex: 1,

  },

  parentContainer: {
    width: '100%',
    borderWidth: 0,
    alignItems: 'center',
    height: 600,
  },

  childOneContainer: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    borderWidth: 0,
    paddingHorizontal: 10,
  },

  subChildOneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  subSubChildOneContainer: {
    height: 70,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },

  subChildTwoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },

  subSubChildTwoContainer: {
    height: 45,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  subSubChildTwoContainerLabel: {
    height: 45,
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },

  cardContainer: {
    minWidth: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    paddingHorizontal: 8,
    marginBottom: 15,
  },

  cardContainerChild: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    borderWidth: 0.5
   
  },

  cardContainerChildTwo: {
    width: '35%',
    height: 40,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },

  cardContainerChildOne: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0,
    height: 90,
  },

  cardContainerChildOneRow: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 30,
  },
  cardContainerChildOneColLabel: {
    width: '70%',
    justifyContent: 'center',
    height: 40,
    borderWidth: 0,
    paddingLeft: 5,
  },
  cardContainerChildOneColText: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderWidth: 0,
    elevation: 0,
    marginLeft: 5,
  },
  noRecordView: {
    height: 40,
    borderWidth: 0,
  },
  noRecordText: {
    color: color.black,
    fontSize: 18,
  },
};
