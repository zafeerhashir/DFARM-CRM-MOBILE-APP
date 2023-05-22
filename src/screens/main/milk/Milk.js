import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import color from '../../../assets/color/Index';
import styles from '../../../assets/styles/Index';
import {
  CardLongPressView,
  Date,
  EditMilk,
  Row,
  ListView,
  NumberFormatter,
  PDFGenerator
} from '../../../components/Index';
import {
  deleteMilk,
  editMilkVisible,
  filterMilkData,
} from '../../../redux/actions/Index';
import { agoDate, currentDate, formatDate } from './../../../conversions/Index';

function Milk({ navigation }) {
  const [toDate, setToDate] = useState(currentDate());
  const [fromDate, setFromDate] = useState(agoDate(7));
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  const milkReducerState = useSelector(state => state.milk);
  const dispatch = useDispatch();


  useEffect(() => {
    getFilterMilkData();
    const unsubscribe = navigation.addListener('focus', () => {
      getFilterMilkData();
    });
    return unsubscribe;
  }, [navigation, fromDate, toDate, visible, milkReducerState.editMilkVisible]);

  const onRefresh = useCallback(() => {
    getFilterMilkData();
  }, [milkReducerState.milkLoading]);

  const getFilterMilkData = async () => {
    if (fromDate !== '' && toDate !== '') {
      const body = { toDate: toDate, fromDate: fromDate };
      dispatch(filterMilkData(body));
    }
  };

  const _deleteMilk = item => {
    setVisible(false);
    ,'itemdeletemilk')
  const payload = { animalTagId: item.animalTagId, id: item._id };
  dispatch(deleteMilk(payload));
  getFilterMilkData();
};

const getTotalMilk = () => {
  var total = 0;

  for (let e of milkReducerState.milkData) {
    total = total + (e.milkProduceAM + e.milkProducePM);
  }

  return <NumberFormatter value={total} suffix={' seer'} />;
};
// refreshing={milkReducerState.milkLoading}
// onRefresh={() => onRefresh()}



return (
  //   <ListView
  //   refreshControl={
  //   <RefreshControl
  //   refreshing={milkReducerState.milkLoading}
  //   onRefresh={() => onRefresh()}
  // />}

  //   >
  <>
    <ListView
      refreshing={milkReducerState.milkLoading}
      onRefresh={() => onRefresh()}>
      <View style={milkStyles.pickerRow}>
        <View style={milkStyles.pickerColumnLeft}>
          <Date
            required={false}
            date={fromDate}
            placeholder={'Select from date'}
            onDateChange={date => {
              setFromDate(date);
            }}
          />
        </View>
        <View style={milkStyles.pickerColumnRight}>
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

      <View style={milkStyles.countContainer}>
        <View style={milkStyles.countLabelContainer}>
          <Text style={milkStyles.countLabel}>Total Milk</Text>
        </View>

        <View style={milkStyles.countValueContainer}>
          <Text style={milkStyles.countValue}>
            {milkReducerState.milkData.length == 0 ? '0' : getTotalMilk()}
          </Text>
        </View>
      </View>

      {visible && (
        <CardLongPressView
          onEditPress={() => {
            dispatch(editMilkVisible({ visible: true })), setVisible(false);
          }}
          onDeletePress={() => _deleteMilk(selectedItem)}
          onTabOut={() => setVisible(false)}
        />
      )}

      {milkReducerState.editMilkVisible && (
        <EditMilk selectedItem={selectedItem} />
      )}

      {milkReducerState.milkData.length == 0 &&
        milkReducerState.milkLoading == false ? (
        <View style={milkStyles.noRecordView}>
          <Text style={milkStyles.noRecordText}>No Record Found</Text>
        </View>
      ) : (
        <FlatList
          data={milkReducerState.milkData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => {
                setVisible(true), setSelectedItem(item);
              }}
              style={milkStyles.cardContainer}>
              <View style={milkStyles.cardContainerChild}>
                <Row label={'Date'} value={formatDate(item.date)} />

                {item.animal !== null && <Row label={'Animal Tag'} value={item.animal.tag} />}
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
    </ListView>

  </>
);
}


export { Milk };

import { shadow } from '../../../assets/styles/Index';

const milkStyles = {
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
