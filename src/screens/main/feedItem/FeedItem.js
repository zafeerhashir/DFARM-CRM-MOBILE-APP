import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import color from '../../../assets/color/Index';
import styles from '../../../assets/styles/Index';
import {
  CardLongPressView,
  Date,
  EditMilk,
  Row,
  ListView,
  EditFeedItem,
  NumberFormatter,
  PDFGenerator
} from '../../../components/Index';
import {
  deleteFeedItem,
  editMilkVisible,
  getFeedData,
  editFeedItemVisible,
} from '../../../redux/actions/Index';
import { agoDate, currentDate, formatDate } from './../../../conversions/Index';
import { currency } from '../../../constants'

function FeedItem({ navigation }) {
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
  }, [navigation, fromDate, toDate]);

  const onRefresh = useCallback(() => {
    getData();
  }, [feedItemReducerState.feedItemLoading]);

  const getData = () => {
    if (fromDate !== '' && toDate !== '') {
      const body = { toDate: toDate, fromDate: fromDate };
      dispatch(getFeedData(body));
    }
  };

  const _deleteMilk = item => {
    setVisible(false);
    const payload = { feedItemDateId: item.feedItemDateId, feedItemId: item._id };
    dispatch(deleteFeedItem(payload));
    getData()
  };

  const getTotalFeedPrice = () => {
    var total = 0;

    for (let e of feedItemReducerState.feedItemData) {
      total = total + (e.price);
    }
    return (
      <NumberFormatter
        value={total}
        suffix={' PKR'}
      />
    );
  };

  const dataFormatter = () => {
    const data = []
    for (let p of feedItemReducerState.feedItemData) {
      data.push({
        Date: formatDate(p.date),
        FeedName: p.name,
        FeedUnit: p.unit,
        FeedQuantity: p.quantity,
        FeedPrice: `${p.price} ${currency.PKR}`
      })
    }
    return data
  }

  return (
    <>
      <ListView
        refreshing={feedItemReducerState.feedItemLoading}
        onRefresh={() => onRefresh()}>
        <View style={FeedItemStyles.parentContainer}>
          <View style={FeedItemStyles.pickerRow}>
            <View style={FeedItemStyles.pickerColumnLeft}>
              <Date
                required={false}
                date={fromDate}
                placeholder={'Select from date'}
                onDateChange={date => {
                  setFromDate(date);
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
                  setToDate(date);
                }}
              />
            </View>
          </View>

          <View style={FeedItemStyles.countContainer}>
            <View style={FeedItemStyles.countLabelContainer}>
              <Text style={FeedItemStyles.countLabel}>Total Price</Text>
            </View>
            {feedItemReducerState.feedItemData.length != 0 && (
              <View style={FeedItemStyles.countValueContainer}>
                {getTotalFeedPrice()}
              </View>
            )}
          </View>

          {visible && (
            <CardLongPressView
              onEditPress={() => {
                dispatch(editFeedItemVisible({ visible: true })), setVisible(false);
              }}
              onDeletePress={() => _deleteMilk(selectedItem)}
              onTabOut={() => setVisible(false)}
            />
          )}

          {feedItemReducerState.editFeedItemVisible && (
            <EditFeedItem selectedItem={selectedItem} />
          )}

          {feedItemReducerState.feedItemData.length == 0 &&
            feedItemReducerState.feedItemLoading == false ? (
            <View style={FeedItemStyles.noRecordView}>
              <Text style={FeedItemStyles.noRecordText}>No Record Found</Text>
            </View>
          ) : (
            <FlatList
              data={feedItemReducerState.feedItemData}
              keyExtractor={(item) => item._Id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onLongPress={() => {
                    setVisible(true), setSelectedItem(item);
                  }}
                  style={FeedItemStyles.cardContainer}>
                  <View style={FeedItemStyles.cardContainerChild}>
                    <Row label={'Date'} value={formatDate(item.date)} />
                    <Row label={'Feed Name'} value={item.name} />
                    <Row label={'Feed Unit'} value={item.unit} />
                    <Row label={'Feed Quantity'} value={item.quantity} />

                    <Row label={'Feed Price'} value={`${item.price} ${currency.PKR}`} />
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </ListView>
      {feedItemReducerState.feedItemData.length !== 0 &&
        <PDFGenerator
          keys={['Date', 'FeedName', 'FeedUnit', 'FeedQuantity', 'FeedPrice']}
          data={dataFormatter()}
          name={'Feed'}
        />
      }
    </>
  );
}

export { FeedItem };

const FeedItemStyles = {
  countLabel: {
    color: color.black,
  },
  countValue: {
    color: color.black,
  },
  pickerRow: {
    width: '90%',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerColumnLeft: { width: '50%', justifyContent: 'center', borderWidth: 0 },
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
