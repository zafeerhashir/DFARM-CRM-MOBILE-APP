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
  EditMedicine,
  Row,
  ListView,
  NumberFormatter,
} from '../../../components/Index';
import {
  deleteMedicine,
  editMedicineVisible,
  filterMedicineData,
} from '../../../redux/actions/Index';
import {agoDate, currentDate, formatDate} from './../../../conversions/Index';

function Medicine({navigation}) {
  const [toDate, setToDate] = useState(currentDate());
  const [fromDate, setFromDate] = useState(agoDate(7));
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  const medicineReducerState = useSelector((state) => state.medicine);
  const dispatch = useDispatch();

  useEffect(() => {
    getMedicineData();
    const unsubscribe = navigation.addListener('focus', () => {
      getMedicineMilkData();
    });
    return unsubscribe;
  }, [navigation, fromDate, toDate, medicineReducerState.editMedicineVisible]);

  const onRefresh = useCallback(() => {
    getMedicineMilkData();
  }, [medicineReducerState.medicineLoading]);

  const getMedicineMilkData = async () => {
    if (fromDate !== '' && toDate !== '') {
      const body = {toDate: toDate, fromDate: fromDate};
      dispatch(filterMedicineData(body));
    }
  };

  const _deleteMedicine = (item) => {
    setVisible(false);
    const payload = {id: item._id};
    dispatch(deleteMedicine(payload));
    getMedicineMilkData();
  };


  // refreshing={medicineReducerState.medicineLoading}
  // onRefresh={() => onRefresh()}

  return (
    //   <ListView
    //   refreshControl={
    //   <RefreshControl
    //   refreshing={medicineReducerState.medicineLoading}
    //   onRefresh={() => onRefresh()}
    // />}

    //   >

    <ListView
      refreshing={medicineReducerState.medicineLoading}
      onRefresh={() => onRefresh()}>
      <View style={medicineStyles.pickerRow}>
        <View style={medicineStyles.pickerColumnLeft}>
          <Date
            required={false}
            date={fromDate}
            placeholder={'Select from date'}
            onDateChange={(date) => {
              setFromDate(date);
            }}
          />
        </View>
        <View style={medicineStyles.pickerColumnRight}>
          <Date
            required={false}
            minDate={fromDate}
            date={toDate}
            placeholder={'Select to date'}
            onDateChange={(date) => {
              setToDate(date);
            }}
          />
        </View>
      </View>

      

      {visible && (
        <CardLongPressView
          onEditPress={() => {
            dispatch(editMedicineVisible({visible: true})), setVisible(false);
          }}
          onDeletePress={() => _deleteMedicine(selectedItem)}
          onTabOut={() => setVisible(false)}
        />
      )}

      {medicineReducerState.editMedicineVisible && (
        <EditMedicine selectedItem={selectedItem} />
      )}
      {console.log(selectedItem, 'selectedItem')}

      {medicineReducerState.medicineData.length == 0 &&
      medicineReducerState.medicineLoading == false ? (
        <View style={medicineStyles.noRecordView}>
          <Text style={medicineStyles.noRecordText}>No Record Found</Text>
        </View>
      ) : (
        <FlatList
          data={medicineReducerState.medicineData}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => (
            <TouchableOpacity
              onLongPress={() => {
                setVisible(true), setSelectedItem(item);
              }}
              style={medicineStyles.cardContainer}>
              <View style={medicineStyles.cardContainerChild}>
                <Row label={'Date'} value={formatDate(item.date)} />

                {item.animal !== null && (
                  <Row label={'Animal Tag'} value={item.animal.tag} />
                )}
                <Row label={'Price'} value={item.price} />
                <Row label={'Name'} value={item.name} />
                <Row label={'Purpose'} value={item.purpose} />
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </ListView>
  );
}

export {Medicine};

import {shadow} from '../../../assets/styles/Index';

const medicineStyles = {
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
