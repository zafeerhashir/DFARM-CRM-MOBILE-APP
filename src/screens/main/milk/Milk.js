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
} from '../../../components/Index';
import {
  deleteMilk,
  editMilkVisible,
  filterMilkData,
} from '../../../redux/actions/Index';
import {agoDate, currentDate, formatDate} from './../../../conversions/Index';

function Milk({navigation}) {
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
  }, [navigation, fromDate, toDate, milkReducerState.editMilkVisible]);

  const onRefresh = useCallback(() => {
    getFilterMilkData();
  }, [milkReducerState.milkLoading]);

  const getFilterMilkData = async () => {
    if (fromDate !== '' && toDate !== '') {
      const body = {toDate: toDate, fromDate: fromDate};
      dispatch(filterMilkData(body));
    }
  };

  const _deleteMilk = item => {
    setVisible(false);
    const payload = {animalTagId: item.animalTagId, _id: item._id};
    dispatch(deleteMilk(payload));
    getFilterMilkData();
  };

  const getTotalMilk = () => {
    var total = 0;

    for (let e of milkReducerState.milkData) {
      total = total + (e.milkProduceAM + e.milkProducePM);
    }

    return total;
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

    <ListView
      refreshing={milkReducerState.milkLoading}
      onRefresh={() => onRefresh()}>
      <View style={milkStyles.parentContainer}>
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
            <Text>Total Milk</Text>
          </View>

          <View style={milkStyles.countValueContainer}>
            <Text>
              {milkReducerState.milkData.length == 0 ? '0' : getTotalMilk()}
            </Text>
          </View>
        </View>

        {visible && (
          <CardLongPressView
            onEditPress={() => {
              dispatch(editMilkVisible({visible: true})), setVisible(false);
            }}
            onDeletePress={() => _deleteMilk(selectedItem)}
            onTabOut={() => setVisible(false)}
          />
        )}

        {milkReducerState.editMilkVisible && (
          <EditMilk selectedItem={selectedItem} />
        )}
        {console.log(selectedItem, 'selectedItem')}

        {milkReducerState.milkData.length == 0 &&
        milkReducerState.milkLoading == false ? (
          <View style={milkStyles.noRecordView}>
            <Text style={milkStyles.noRecordText}>No Record Found</Text>
          </View>
        ) : (
          <FlatList
            data={milkReducerState.milkData}
            renderItem={({item}) => (
              <TouchableOpacity
                onLongPress={() => {
                  setVisible(true), setSelectedItem(item);
                }}
                style={milkStyles.cardContainer}>
                <View style={milkStyles.cardContainerChild}>
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
    </ListView>
  );
}

export {Milk};

const milkStyles = {
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
