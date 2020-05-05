import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../../assets/color/Index';
import {
  CardLongPressView,
  Date,
  Row,
  SmartView,
  EditMilk,
} from '../../../components/Index';
import {getAnimalMilk} from '../../../redux/actions/Index';
import {agoDate, currentDate, formatDate} from './../../../conversions/Index';
import styles from '../../../assets/styles/Index';

function AnimalDetail({navigation}) {
  const [toDate, setToDate] = useState(currentDate());
  const [fromDate, setFromDate] = useState(agoDate(7));
  const animalReducerState = useSelector(state => state.animal);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAnimalMilkData()
    });
    return unsubscribe;
  }, [navigation, fromDate, toDate]);

  const onRefresh = useCallback(() => {
    getAnimalMilkData();
  }, [animalReducerState.animalMilkLoading]);

  const getAnimalMilkData = () => {
    if (fromDate !== '' && toDate !== '') {
      const body = {
        toDate: toDate,
        fromDate: fromDate,
        animalTagId: animalReducerState.selectedAnimal.animalTagId,
      };
      dispatch(getAnimalMilk(body));
    }
  };

  const getTotalMilk = () => {
    var total = 0;

    for (let e of animalReducerState.animalMilkData) {
      total = total + (e.milkProduceAM + e.milkProducePM);
    }

    return total;
  };

  return (
    <SmartView>
      <View style={animalStyles.parentContainer}>
        <View style={animalStyles.childOneContainer}>
          <View style={animalStyles.subChildOneContainer}>
            <View style={animalStyles.subSubChildOneContainer}>
              <Date
                required={false}
                date={fromDate}
                placeholder={'Select from date'}
                onDateChange={date => setFromDate(date)}
              />
            </View>

            <View style={animalStyles.subSubChildOneContainer}>
              <Date
                required={false}
                minDate={fromDate}
                date={toDate}
                placeholder={'Select to date'}
                onDateChange={date => setToDate(date)}
              />
            </View>
          </View>

          <View style={animalStyles.subChildTwoContainer}>
            <View style={animalStyles.subSubChildTwoContainer}>
              <Text>Total milk</Text>
            </View>

            <View style={animalStyles.subSubChildTwoContainerLabel}>
              <Text>
                {animalReducerState.animalMilkData.length == 0
                  ? '0'
                  : getTotalMilk()}
              </Text>
            </View>
          </View>
        </View>

        {animalReducerState.animalMilkData.length == 0 &&
        animalReducerState.animalMilkLoading == false ? (
          <View style={animalStyles.noRecordView}>
            <Text style={animalStyles.noRecordText}>No Record Found</Text>
          </View>
        ) : (
          <FlatList
            refreshing={animalReducerState.animalMilkLoading}
            onRefresh={() => onRefresh()}
            data={animalReducerState.animalMilkData}
            renderItem={({item}) => (
              <TouchableOpacity style={animalStyles.cardContainer}>
                <View style={animalStyles.cardContainerChild}>
                  <Row label={'Date'} value={formatDate(item.date)} />
                  <Row label={'Animal Tag'} value={item.tag} />
                  <Row
                    label={'Morning Milk'}
                    value={`${item.milkProduceAM} liter`}
                  />
                  <Row
                    label={'Evening Milk'}
                    value={`${item.milkProducePM} liter`}
                  />
                  <Row
                    label={'Total Milk'}
                    value={item.milkProduceAM + item.milkProducePM}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SmartView>
  );
}

export {AnimalDetail};

const animalStyles = {
  parentContainer: {
    flex: 1,
    width: '100%',
    borderWidth: 0,
    alignItems: 'center',
    marginBottom: 0,
  },

  childOneContainer: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    borderWidth: 0,
  },

  subChildOneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  subSubChildOneContainer: {
    height: 70,
    width: '45%',
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
    ...styles.shadow,
  },

  subSubChildTwoContainerLabel: {
    height: 45,
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    ...styles.shadow,
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
    borderWidth: 0,
    ...styles.abstractCardStyles,
  },

  cardContainerChildTwo: {
    width: '35%',
    height: 40,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    ...styles.shadow,
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
    ...styles.shadow,
  },
  cardContainerChildOneColText: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderWidth: 0,
    marginLeft: 5,
    ...styles.shadow,
  },
  noRecordView: {
    marginTop: '25%',
    height: 30,
    borderWidth: 0,
  },
  noRecordText: {
    color: color.black,
    fontSize: 18,
  },
};
