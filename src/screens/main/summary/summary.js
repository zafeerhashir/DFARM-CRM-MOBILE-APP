import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../../assets/color/Index';
import styles from '../../../assets/styles/Index';
import {
  CardLongPressView,
  Date,
  EditMilk,
  Row,
  ListView,
  NumberFormatter,
} from '../../../components/Index';
import {
  deleteMilk,
  editMilkVisible,
  filterMilkData,
  getSummaryData_ 
} from '../../../redux/actions/Index';
import {agoDate, currentDate, formatDate} from './../../../conversions/Index';

function Summary({navigation}) {
  const [toDate, setToDate] = useState(currentDate());
  const [fromDate, setFromDate] = useState(agoDate(7));
  const summayReducerState = useSelector(state => state.Summary);
  const dispatch = useDispatch();

  useEffect(() => {
    getSummaryData();
    const unsubscribe = navigation.addListener('focus', () => {
      getSummaryData();
    });
    return unsubscribe;
  }, [navigation, fromDate, toDate,]);

  const onRefresh = useCallback(() => {
    getSummaryData();
  }, [summayReducerState.summaryLoading]);

  const getSummaryData = async () => {
    if (fromDate !== '' && toDate !== '') {
      const body = {toDate: toDate, fromDate: fromDate};
      dispatch(getSummaryData_(body));
    }
  };

  const _deleteMilk = item => {
    setVisible(false);
    const payload = {animalTagId: item.animalTagId, _id: item._id};
    dispatch(deleteMilk(payload));
    getSummaryData();
  };

  const getTotalMilk = () => {
    var total = 0;

    for (let e of summayReducerState.milkData) {
      total = total + (e.milkProduceAM + e.milkProducePM);
    }

    return <NumberFormatter value={total} suffix={' liter'} />;
  };

  return (
    <ListView
      refreshing={summayReducerState.summaryLoading}
      onRefresh={() => onRefresh()}>
      <View style={summaryStyles.pickerRow}>
        <View style={summaryStyles.pickerColumnLeft}>
          <Date
            required={false}
            date={fromDate}
            placeholder={'Select from date'}
            onDateChange={date => {
              setFromDate(date);
            }}
          />
        </View>
        <View style={summaryStyles.pickerColumnRight}>
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

      <View style={summaryStyles.countContainer}>
        <View style={summaryStyles.countLabelContainer}>
          <Text style={summaryStyles.countLabel}>Total Milk</Text>
        </View>

        <View style={summaryStyles.countValueContainer}>
          <Text style={summaryStyles.countValue}>
            {summayReducerState.milkData.length == 0 ? '0' : getTotalMilk()}
          </Text>
        </View>
      </View>

      <View style={summaryStyles.cardContainer}>
        <View style={summaryStyles.cardContainerChild}>
          <Row label={'Date'} value={formatDate(item.date)} />

          {item.animal !== null && (
            <Row label={'Animal Tag'} value={item.animal.tag} />
          )}
          <Row label={'Morning Milk'} value={`${item.milkProduceAM} liter`} />
          <Row label={'Evening Milk'} value={`${item.milkProducePM} liter`} />
          <Row
            label={'Total Milk'}
            value={item.milkProduceAM + item.milkProducePM}
          />
        </View>
      </View>
    </ListView>
  );
}

export {Summary};

import {shadow} from '../../../assets/styles/Index';

const summaryStyles = {
  pickerRow: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
  },
  pickerColumnLeft: {
    borderWidth: 0,
  },
  pickerColumnRight: {
    borderWidth: 0,
  },

  countContainer: {
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  countLabel: {
    color: color.black,
  },
  countValue: {
    color: color.black,
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
