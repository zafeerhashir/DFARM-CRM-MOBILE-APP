import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../../assets/color/Index';
import {
  CardLongPressView,
  Date,
  Row,
  ListView,
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
    getAnimalMilkData();
    const unsubscribe = navigation.addListener('focus', () => {
      getAnimalMilkData();
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
    <ListView>
      <View style={animalStyles.parentContainer}>
        <View style={animalStyles.pickerRow}>
          <View style={animalStyles.pickerColumnLeft}>
            <Date
              required={false}
              date={fromDate}
              placeholder={'Select from date'}
              onDateChange={date => {
                setFromDate(date);
              }}
            />
          </View>
          <View style={animalStyles.pickerColumnRight}>
            <Date
              required={false}
              minDate={fromDate}
              date={toDate}
              placeholder={'Select to date'}
              onDateChange={date => {
                setToDate(date);
              }}
            />
          </View>
        </View>

        <View style={animalStyles.countContainer}>
          <View style={animalStyles.countLabelContainer}>
            <Text>Total Milk</Text>
          </View>

          <View style={animalStyles.countValueContainer}>
            <Text>
              {animalReducerState.animalMilkData.length == 0
                ? '0'
                : getTotalMilk()}
            </Text>
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
    </ListView>
  );
}

export {AnimalDetail};

const animalStyles = {
  pickerRow: {
    width: '90%',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerColumnLeft: {width: '50%', justifyContent: 'center', borderWidth: 0},
  pickerColumnRight: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderWidth: 0,
  },

  countContainer: {
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  countLabelContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    ...styles.abstractCardStyles,
  },
  countValueContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginLeft: 20,
    ...styles.abstractCardStyles,
  },
  parentContainer: {
    flex: 1,
    width: '100%',
    borderWidth: 0,
    alignItems: 'center',
    marginBottom: 0,
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
