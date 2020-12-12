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
  PDFGenerator,
} from '../../../components/Index';
import {
  deleteMilk,
  editMilkVisible,
  filterMilkData,
  getSummaryData_,
} from '../../../redux/actions/Index';
import {agoDate, currentDate, formatNumber} from './../../../conversions/Index';
import {currency} from '../../../constants';

function Summary({navigation}) {
  const [toDate, setToDate] = useState(currentDate());
  const [fromDate, setFromDate] = useState(agoDate(1));
  const summaryReducerState = useSelector(state => state.summary);
  const dispatch = useDispatch();

  useEffect(() => {
    getSummaryData();
    const unsubscribe = navigation.addListener('focus', () => {
      getSummaryData();
    });
    return unsubscribe;
  }, [navigation, fromDate, toDate]);

  const onRefresh = useCallback(() => {
    getSummaryData();
  }, [summaryReducerState.summaryLoading]);

  const getSummaryData = async () => {
    if (fromDate !== '' && toDate !== '') {
      const body = {toDate: toDate, fromDate: fromDate};
      dispatch(getSummaryData_(body));
    }
  };

  const getTotalExpensive = () => {
    let totalExpensive = 0;
    const expensive = {...summaryReducerState.summaryData};
    delete expensive.milkPrice;
    for (const [key, value] of Object.entries(expensive)) {
      if (Number(value)) {
        totalExpensive += value;
      }
    }
    return `${formatNumber(totalExpensive)} ${currency.PKR}`;
  };
  const nullHandler = value => {
    if (value === null) {
      return '0';
    } else {
      return formatNumber(value);
    }
  };

  return (
    <>
      <ListView
        refreshing={summaryReducerState.summaryLoading}
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

        {summaryReducerState.summaryData && (
          <View style={summaryStyles.cardContainer}>
            <View style={summaryStyles.cardContainerChild}>
              <Row label={'Expenses'} />
              <Row
                label={'Total Animal Purchase Amount'}
                value={`${nullHandler(
                  summaryReducerState.summaryData.animalPrice,
                )}  ${currency.PKR}`}
              />
              <Row
                label={'Total Feed Amount'}
                value={`${nullHandler(
                  summaryReducerState.summaryData.feedPrice,
                )} ${currency.PKR}`}
              />
              <Row
                label={'Total Medicine Amount'}
                value={`${nullHandler(
                  summaryReducerState.summaryData.medicinePrice,
                )} ${currency.PKR}`}
              />
              <Row label={'Total Expenses'} value={getTotalExpensive()} />
              <Row label={'Income'} />
              <Row
                label={'Total Milk Amount'}
                value={`${nullHandler(
                  summaryReducerState.summaryData.milkPrice,
                )} ${currency.PKR}`}
              />
              <Row
                label={'Total Income'}
                value={`${nullHandler(
                  summaryReducerState.summaryData.milkPrice,
                )} ${currency.PKR}`}
              />
            </View>
          </View>
        )}
      </ListView>
      {summaryReducerState.summaryData &&
      <PDFGenerator
        keys={['milkPrice', 'feedPrice', 'animalPrice', 'medicinePrice','fromDate','toDate',]}
        data={[{
          milkPrice: `${nullHandler(summaryReducerState.summaryData.milkPrice)} ${currency.PKR}`,
          feedPrice: `${nullHandler(summaryReducerState.summaryData.feedPrice)} ${currency.PKR}`,
          animalPrice: `${nullHandler(summaryReducerState.summaryData.animalPrice)} ${currency.PKR}`,
          medicinePrice: `${nullHandler(summaryReducerState.summaryData.medicinePrice)} ${currency.PKR}`,
          fromDate,
          toDate
        }]}
        name={'Summary'}
      />
      }
    </>
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
    marginBottom: 15,
  },

  cardContainerChild: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
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
