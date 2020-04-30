import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import color from '../../../assets/color/Index';
import { CardLongPressView, Date, Row, SmartView, EditMilk } from '../../../components/Index';
import { deleteMilk, filterMilkData, getMilk } from '../../../redux/actions/Index';
import { agoDate, currentDate, formatDate } from './../../../conversions/Index';


var _fromDate = ''
var _toDate = ''

function Milk({navigation}) {

  const [toDate] = useState('');
  const [visible, setVisible] = useState(false);
  const [editMilkVisible, setEditMilkVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [fromDate] = useState('');
  const milkReducerState = useSelector(state => state.milk);
  const dispatch = useDispatch();


  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      setDatesForDefaultData()
      getFilterMilkData()
    });

    return unsubscribe;

  },[navigation])



  const setDatesForDefaultData= async ()=>
  {
     _fromDate = await agoDate(7)
     _toDate = await currentDate()
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getMilk());
    setTimeout(()=>setRefreshing(false),1000)
  }, [refreshing]);



  const getFilterMilkData = () => {
    if (_fromDate !== '' && _toDate !== '') {
      const body = {toDate: _toDate, fromDate: _fromDate};
      dispatch(filterMilkData(body));
    }
  };

  const _deleteMilk = item => {
    setVisible(false)
    const payload = {parentId: item.parentId, _id: item._id};
    dispatch(deleteMilk(payload));
    dispatch(getMilk());
  };


  const setFromDateHandler = async date => {
    _fromDate = date;
    getFilterMilkData();
  };

  const setToDateHandler = async date => {
    _toDate = date;
    getFilterMilkData();
  };


  const getTotalMilk = () =>
  {
    var total = 0

    for(let e of milkReducerState.milkData)
    {
      total = total + (e.milkProduceAM + e.milkProducePM)
    }
  
    return total
  }

  return (
    <SmartView refreshing={milkReducerState.milkLoading} onRefresh={onRefresh} >
      <View style={milkStyles.parentContainer}>
        <View style={milkStyles.childOneContainer}>
          <View style={milkStyles.subChildOneContainer}>
            <View style={milkStyles.subSubChildOneContainer}>
              <Date
                required={false}
                date={fromDate}
                placeholder={'Select from date'}
                onDateChange={date => setFromDateHandler(date)}
              />
            </View>

            <View style={milkStyles.subSubChildOneContainer}>
              <Date
                required={false}
                date={toDate}
                placeholder={'Select to date'}
                onDateChange={date => setToDateHandler(date)}
              />
            </View>
          </View>

           
            <View style={milkStyles.subChildTwoContainer}>
              <View style={milkStyles.subSubChildTwoContainer}>
                <Text>Total Milk</Text>
              </View>
  
              <View style={milkStyles.subSubChildTwoContainerLabel}>
                <Text>{milkReducerState.milkData.length == 0 ? '0' : getTotalMilk() }</Text>
              </View>
            </View>
            
        </View>

        {visible && (
          <CardLongPressView
            onEditPress={() => setEditMilkVisible(true)}
            onDeletePress={() => _deleteMilk(selectedItem)}
            onTabOut={() => setVisible(false)}
          />
        )}

       { editMilkVisible && (

            <EditMilk
             date={'2020-2-2'}
             milkAM={'13'}
             milkPM={'2'}
            />
       )} 
       

        {milkReducerState.milkData.length == 0 && milkReducerState.milkLoading == false ? (
          <View style={milkStyles.noRecordView}>
            <Text style={milkStyles.noRecordText}>No Record Found</Text>
          </View>
        ) : (
          
          <FlatList
            data={milkReducerState.milkData}
            renderItem={({item}) => (
              <TouchableOpacity
                activeOpacity={0.6}
                onLongPress={() => {setVisible(true),setSelectedItem(item)}}
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
    </SmartView>
  );
}

export { Milk };

const milkStyles = {
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
    elevation: 1,
  },

  subSubChildTwoContainerLabel: {
    height: 45,
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    elevation: 1,
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
    elevation: 3,
    borderWidth: 0,
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
    elevation: 1,
  },
  cardContainerChildOneColText: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderWidth: 0,
    elevation: 1,
    marginLeft: 5,
  },
  noRecordView: {
    marginTop: '25%',
    height: 30,
    borderWidth: 0

  },
  noRecordText: {
    color: color.black,
    fontSize: 18,
  },
};
