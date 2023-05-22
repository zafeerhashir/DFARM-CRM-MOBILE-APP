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
  EditMilkPerDay,
  Row,
  ListView,
  NumberFormatter,
  PDFGenerator
} from '../../../components/Index';
import {
  deleteMilk,
  editMilkPerDayVisible,
  filterMilkPerDayData,
} from '../../../redux/actions/Index';
import { agoDate, currentDate, formatDate } from './../../../conversions/Index';
import { currency } from '../../../constants'

const MAAN_PER_LITER = 40

function MilkPerDay({ navigation }) {
  const [toDate, setToDate] = useState(currentDate());
  const [fromDate, setFromDate] = useState(agoDate(7));
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  const milkReducerState = useSelector(state => state.milk);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedItem !== false) {
      setVisible(true)
    }
  }, [selectedItem])

  useEffect(() => {
    getFilterMilkPerDayData();
    const unsubscribe = navigation.addListener('focus', () => {
      getFilterMilkPerDayData();
    });
    return unsubscribe;
  }, [navigation, fromDate, toDate, visible, milkReducerState.editMilkPerDayVisible]);

  const onRefresh = useCallback(() => {
    getFilterMilkPerDayData();
  }, [milkReducerState.milkLoading]);

  const getFilterMilkPerDayData = async () => {
    if (fromDate !== '' && toDate !== '') {
      const body = { toDate: toDate, fromDate: fromDate };

      dispatch(filterMilkPerDayData(body));
    }
  };

  const _deleteMilk = item => {
    setVisible(false);
    const payload = { animalTagId: item.animalTagId, id: item._id };
    dispatch(deleteMilk(payload));
    getFilterMilkPerDayData();
  };


  const totalMilk = (item) => {
    const { milkGallonAM, milkLiterAM, milkGallonPM, milkLiterPM } = item
    var extraGallon = 0
    var totalLiter = milkLiterAM + milkLiterPM
    if (totalLiter >= MAAN_PER_LITER) {
      const covnersionResult = (totalLiter / MAAN_PER_LITER).toFixed(2).split('.')
      extraGallon = parseInt(covnersionResult[0])
      totalLiter = totalLiter - (extraGallon * MAAN_PER_LITER)
      totalLiter = totalLiter + parseInt(covnersionResult[1])
    }
    const totalMaan = milkGallonAM + milkGallonPM + extraGallon
    return `${totalMaan}.${totalLiter}`
  }

  const getTotalMilk = () => {
    var total = 0;
    for (let e of milkReducerState.milkPerDayData) {
      total = total + totalMilk(e)
      return <NumberFormatter value={total} suffix={'maan/seer'} />;
    };

    const dataFormatter = async () => {
      const data = []
      for (let p of milkReducerState.milkPerDayData) {
        const TotalMilkMaanSeer = totalMilk(p)
        data.push({
          Date: formatDate(p.date),
          MorningMilkMaan: p.milkGallonAM,
          MorningMilkSeer: p.milkLiterAM,
          EveningMilkMaan: p.milkGallonPM,
          EveningMilkSeer: p.milkLiterPM,
          Rate: p.rate,
          TotalMilkMaanSeer,
          TotalMilkAmount: `${(p.milkGallonAM + p.milkLiterAM + p.milkGallonPM + milkLiterPM) * p.rate} ${currency.PKR}`,
        })
      }
      return data
    }

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
                {milkReducerState.milkPerDayData.length == 0 ? '0' : getTotalMilk()}
              </Text>
            </View>
          </View>

          {visible && (
            <CardLongPressView
              onEditPress={() => {
                dispatch(editMilkPerDayVisible({ visible: true })), setVisible(false);
              }}
              onDeletePress={() => _deleteMilk(selectedItem)}
              onTabOut={() => setVisible(false)}
            />
          )}

          {milkReducerState.editMilkPerDayVisible && (
            <EditMilkPerDay milkPerDay={true} selectedItem={selectedItem} />
          )}

          {milkReducerState.milkPerDayData.length == 0 &&
            milkReducerState.milkLoading == false ? (
            <View style={milkStyles.noRecordView}>
              <Text style={milkStyles.noRecordText}>No Record Found</Text>
            </View>
          ) : (
            <FlatList
              data={milkReducerState.milkPerDayData}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onLongPress={async () => {
                    setSelectedItem(item);
                  }}
                  style={milkStyles.cardContainer}>
                  <View style={milkStyles.cardContainerChild}>
                    <Row label={'Date'} value={formatDate(item.date)} />
                    <Row
                      label={'Morning Milk'}
                      value={`${item.milkProduceAM} Seer`}
                    />
                    <Row
                      label={'Evening Milk'}
                      value={`${item.milkProducePM} Seer`}
                    />

                    <Row
                      label={'Rate'}
                      value={item.rate}
                    />

                    <Row
                      label={'Total Milk'}
                      value={item.milkProduceAM + item.milkProducePM}
                    />

                    <Row
                      label={'Total Milk Amount'}
                      value={`${(item.milkProduceAM + item.milkProducePM) * item.rate} ${currency.PKR}`}
                    />

                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </ListView>
        {milkReducerState.milkData.length !== 0 &&
          <PDFGenerator
            keys={['MorningMilk', 'EveningMilk', 'TotalMilk', 'Rate', 'Date', 'TotalMilkAmount']}
            data={dataFormatter()}
            name={'Milk'}
          />
        }
      </>
    );
  }

  export { MilkPerDay };

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
  }
