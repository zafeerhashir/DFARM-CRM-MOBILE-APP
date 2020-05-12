import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../../assets/color/Index';
import styles from '../../../assets/styles/Index';
import {
  CardLongPressView,
  Date,
  EditMilk,
  Row,
  SmartView,
  EditFeedItem
} from '../../../components/Index';
import {
  deleteMilk,
  editMilkVisible,
  getFeedData,
  editFeedItemVisible
} from '../../../redux/actions/Index';
import {agoDate, currentDate, formatDate} from './../../../conversions/Index';

function FeedItem({navigation}) {
  const [toDate, setToDate] = useState(currentDate());
  const [fromDate, setFromDate] = useState(agoDate(7));
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  const feedItemReducerState = useSelector(state => state.feedItem);
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, [navigation, fromDate, toDate, ]);

  const onRefresh = useCallback(() => {
    getData();
  }, [feedItemReducerState.feedItemLoading]);

  const getData = () => {
    if (fromDate !== '' && toDate !== '') {
      const body = {toDate: toDate, fromDate: fromDate};
      dispatch(getFeedData(body));
    }
  };

  const _deleteMilk = item => {
    setVisible(false);
    const payload = {animalTagId: item.animalTagId, _id: item._id};
    dispatch(deleteMilk(payload));
    getFilterMilkData();
  };

  const getTotalFeedPrice = () => {
    var total = 0;

    for (let e of feedItemReducerState.feedItemData) {
      total = total + (e.price + e.price);
    }

    return total;
  };

  return (
    <SmartView>
      <View style={FeedItemStyles.parentContainer}>
        <View style={FeedItemStyles.pickerRow}>
          <View style={FeedItemStyles.pickerColumnLeft}>
            <Date
              required={false}
              date={fromDate}
              placeholder={'Select from date'}
              onDateChange={date => {
                setFromDate(date)
              }}
            />
          </View>
          <View style={FeedItemStyles.pickerColumnRight}>
            <Date
              required={false}
              minDate={fromDate}
              date={toDate}
              placeholder={'Select to date'}
              onDateChange={date => {
                 setToDate(date)
              }}
            />
          </View>
        </View>

        <View style={FeedItemStyles.countContainer}>
          <View style={FeedItemStyles.countLabelContainer}>
            <Text>Total Price</Text>
          </View>
          {feedItemReducerState.feedItemData.length != 0 && 
          <View style={FeedItemStyles.countValueContainer}>
            <Text>
            
               { `${getTotalFeedPrice()} PKR`}
            </Text>
          </View>
         }
        </View>

        {visible && (
          <CardLongPressView
            onEditPress={() => {
              dispatch(editFeedItemVisible({visible: true})), setVisible(false);
            }}
            onDeletePress={() => _deleteMilk(selectedItem)}
            onTabOut={() => setVisible(false)}
          />
        )}

        {feedItemReducerState.editFeedItemVisible && (
          <EditFeedItem selectedItem={selectedItem} />
        )}
        {console.log(selectedItem, 'selectedItem')}

        {feedItemReducerState.feedItemData.length == 0 &&
        feedItemReducerState.feedItemLoading == false ? (
          <View style={FeedItemStyles.noRecordView}>
            <Text style={FeedItemStyles.noRecordText}>No Record Found</Text>
          </View>
        ) : (
          <FlatList
            refreshing={feedItemReducerState.editFeedItemLoading}
            onRefresh={() => onRefresh()}
            data={feedItemReducerState.feedItemData}
            renderItem={({item}) => (
              <TouchableOpacity
                onLongPress={() => {
                  setVisible(true), setSelectedItem(item);
                }}
                style={FeedItemStyles.cardContainer}>
                <View style={FeedItemStyles.cardContainerChild}>
                  <Row 
                  label={'Date'} 
                  value={formatDate(item.date)} 
                  />
                  <Row 
                  label={'Feed Name'} 
                  value={item.name} 
                  />
                  <Row 
                  label={'Feed Unit'} 
                  value={item.unit} 
                  />
                  <Row 
                  label={'Feed Quantity'} 
                  value={item.quantity} 
                  />

                  <Row 
                  label={'Feed price'} 
                  value={`${item.price} PKR`} 
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

export {FeedItem};

const FeedItemStyles = {
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
