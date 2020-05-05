import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import color from '../../../assets/color/Index';
import styles from '../../../assets/styles/Index';
import { Row, SmartView, CardLongPressView, EditAnimal } from '../../../components/Index';
import { getAnimal, deleteAnimal, editAnimal, editAnimalVisible  } from '../../../redux/actions/Index';


function Animal({navigation}) {
  const animalReducerState = useSelector(state => state.animal);

  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(false);
  const [data, setData] = useState(animalReducerState.animalData);
  const dispatch = useDispatch();


  useEffect(() => {
    
    getAnimals();
    const unsubscribe = navigation.addListener('focus', () => {
      getAnimals();
    });
    return (unsubscribe);
  }, [navigation]);

  const onRefresh = useCallback(() => {
    getAnimals();
  }, [animalReducerState.animalLoading]);


  const getAnimals = () => {
      dispatch(getAnimal());
  };





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
      setData(animalReducerState.animalData)

    }
  };

  
  const _deleteAnimal = item => {
    setVisible(false);
    const payload = {animalTagId: item._id};
    dispatch(deleteAnimal(payload));

  };

  const getTotalMilk = () => {
    var total = 0;

    for (let e of data) {
      total = total + (e.milkProduceAM + e.milkProducePM);
    }

    return total;
  };

  return (
      <SmartView>
        <View style={animalStyles.form}>
          
          <SearchBar
            lightTheme
            placeholder="Search"
            containerStyle={styles.searchBarContainerStyle}
            inputContainerStyle={styles.searchBarInputContainerStyle}
            inputStyle={styles.searchBarInputStyle}
            onChangeText={searchTerm => onChangeText(searchTerm)}
            value={searchTerm}
          />


          {visible && (
            <CardLongPressView
              viewDetails={true}
              onEditPress={() => {
                dispatch(editAnimalVisible({visible: true})), setVisible(false);
              }}
              onDeletePress={() => _deleteAnimal(selectedItem)}
              onDetailsPress={() => navigation.navigate('Animal Milk Detail')}
              onTabOut={() => setVisible(false)}
            />
          )}

          {animalReducerState.editAnimalVisible && (
            <EditAnimal selectedItem={selectedItem} />
          )}
          {console.log(selectedItem, 'selectedItem')}

          {animalReducerState.animalData.length == 0 &&
            animalReducerState.animalLoading == false ? (
            <View style={animalStyles.noRecordView}>
              <Text style={animalStyles.noRecordText}>
                No Record Found
              </Text>
            </View>
          ) : (
            <FlatList
              refreshing={animalReducerState.animalLoading}
              onRefresh={() => onRefresh()}
              data={data}
              renderItem={({item}) => (
                <TouchableOpacity
                onLongPress={() => {
                  setVisible(true), setSelectedItem({tag:item.tag,animalTagId:item._id});
                }}
                  style={animalStyles.cardContainer}>
                  <View style={[animalStyles.cardContainerChild,]}>
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

export { Animal };

const animalStyles = StyleSheet.create({
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
    height: 50,
    ...styles.shadow
    

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
});
