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
  NumberFormatter
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
   
    return (
      <NumberFormatter
        value={total}
        suffix={' seer'}
      />
    );
  };

  return (
    <ListView
      refreshing={animalReducerState.animalMilkLoading}
      onRefresh={() => onRefresh()}>
      <View style={animalDetailStyles.parentContainer}>
        <View style={animalDetailStyles.pickerRow}>
          <View style={animalDetailStyles.pickerColumnLeft}>
            <Date
              required={false}
              date={fromDate}
              placeholder={'Select from date'}
              onDateChange={date => {
                setFromDate(date);
              }}
            />
          </View>
          <View style={animalDetailStyles.pickerColumnRight}>
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

        <View style={animalDetailStyles.countContainer}>
          <View style={animalDetailStyles.countLabelContainer}>
            <Text style={animalDetailStyles.countLabel} >Total Milk</Text>
          </View>

          <View style={animalDetailStyles.countValueContainer}>
            <Text style={animalDetailStyles.countValue} >
              {animalReducerState.animalMilkData.length == 0
                ? '0'
                : getTotalMilk()}
            </Text>
          </View>
        </View>

        {animalReducerState.animalMilkData.length == 0 &&
        animalReducerState.animalMilkLoading == false ? (
          <View style={animalDetailStyles.noRecordView}>
            <Text style={animalDetailStyles.noRecordText}>No Record Found</Text>
          </View>
        ) : (
          <FlatList
            data={animalReducerState.animalMilkData}
            renderItem={({item}) => (
              <TouchableOpacity style={animalDetailStyles.cardContainer}>
                <View style={animalDetailStyles.cardContainerChild}>
                  <Row label={'Date'} value={formatDate(item.date)} />
                  <Row
                    label={'Morning Milk'}
                    value={`${item.milkProduceAM} seer`}
                  />
                  <Row
                    label={'Evening Milk'}
                    value={`${item.milkProducePM} seer`}
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

const animalDetailStyles = {

  countLabel:{
    color:color.black

  },
  countValue:{
   color:color.black
  },

  
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
