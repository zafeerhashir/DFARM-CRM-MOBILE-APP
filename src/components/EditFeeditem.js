import React, {useEffect, useRef, useState, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import color from '../assets/color/Index';
import {
  editFeedItem,
  addFeedItemDate,
  editFeedItemVisible,
} from '../redux/actions/Index';
import {literRegex,charactersRegex,integerRegex} from '../validations/Index';
import {Button} from './Button';
import {Date} from './DatePicker';
import {Input} from './Input';
import {MYModal} from './Modal';
import {SmartView} from './SmartView';
import {formatDate} from '../conversions/Index';
import styles,{ shadow} from '../assets/styles/Index';

function EditFeedItem(props) {
  const feedItemId = props.selectedItem._id;
  const feedItemDateId = props.selectedItem.feedItemDateId;
  const feedItemReducerState = useSelector(state => state.feedItem);
  const dispatch = useDispatch();


  const [feedName, setFeedName] = useState(props.selectedItem.name);
  const [feedUnit, setFeedUnit] = useState(props.selectedItem.unit);
  const [feedQuantity, setFeedQuantity] = useState(props.selectedItem.quantity);
  const [feedPrice, setFeedPrice] = useState(props.selectedItem.price);
  const [date, setDate] = useState(formatDate(props.selectedItem.date));
  const [feedNameError, setFeedNameError] = useState(true);
  const [feedUnitError, setFeedUnitError] = useState(true);
  const [feedQuantityError, setFeedQuantityError] = useState(true);
  const [feedPriceError, setFeedPriceError] = useState(true);
  const [dateError, setDateError] = useState(true);

  const feedPriceRef = useRef();
  const feedNameRef = useRef();
  const feedQuantityRef = useRef();
  const feedUnitRef = useRef();
  const dateRef = useRef();

  useEffect(() => {}, []);

  const callApi = () => {
    const postBodyEditFeedItem = {
          unit: feedUnit == '' ? 0 : feedUnit,
          quantity: feedQuantity == '' ? 0 : feedQuantity,
          name: feedName,
          price: feedPrice,
    };

    const payload = {
      postBodyEditFeedItem,
      feedItemId: feedItemId,
      feedItemDateId:
        feedItemReducerState.feedItemDate.id == ''
          ? feedItemDateId
          : feedItemReducerState.feedItemDate.id,
    };

    dispatch(editFeedItem(payload));
  };

  return (
    <MYModal>
      <View style={editFeedItemStyles.modalView}>
        <View style={editFeedItemStyles.dismissRow}>
          <TouchableOpacity
            style={editFeedItemStyles.dismissTextContainer}
            onPress={() => dispatch(editFeedItemVisible({visible: false}))}>
            <Text style={{color: color.lightGrey}}>Dismiss</Text>
          </TouchableOpacity>
        </View>

        <Date
          date={date}
          ref={dateRef}
          onDateChange={date => {
            setDate(date);
            dispatch(addFeedItemDate({date: date}));
          }}
        />

        <Input
          label={'Feed Name'}
          ref={feedNameRef}
          value={feedName}
          placeholder={'Enter Feed Name'}
          errorMessage={'Feed Name must be characters'}
          onChangeText={value => setFeedName(value)}
          error={error => {
            setFeedNameError(error);
          }}
          regex={charactersRegex}
        />

        <Input
          label={'Feed Unit'}
          keyboardType={'number-pad'}
          maxLength={9}
          ref={feedUnitRef}
          value={feedUnit}
          placeholder={'Enter Feed Unit'}
          errorMessage={'Feed Unit must be numeric'}
          onChangeText={value => setFeedUnit(value)}
          error={error => {
            setFeedUnitError(error);
          }}
          regex={integerRegex}
        />

        <Input
          label={'Feed Quantity'}
          keyboardType={'number-pad'}
          maxLength={9}
          ref={feedQuantityRef}
          value={feedQuantity}
          placeholder={'Enter Feed Quantity'}
          errorMessage={'Feed Quantity must be numeric'}
          onChangeText={value => setFeedQuantity(value)}
          error={error => {
            setFeedQuantityError(error);
          }}
          regex={integerRegex}
        />

        <Input
          label={'Feed Price'}
          keyboardType={'number-pad'}
          maxLength={9}
          ref={feedPriceRef}
          value={feedPrice}
          placeholder={'Feed Price'}
          errorMessage={'Feed Price must be numeric'}
          onChangeText={value => setFeedPrice(value)}
          error={error => {
            setFeedPriceError(error);
          }}
          regex={integerRegex}
        />

        <Button
          loading={feedItemReducerState.editFeedItemLoading}
          error={[
            feedNameError,
            feedPriceError,
            feedUnitError,
            feedQuantityError,
          ]}
          title={'Edit'}
          onPress={() => callApi()}
        />
      </View>
    </MYModal>
  );
}

export {EditFeedItem};

const editFeedItemStyles = {
  modalView: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
    ...shadow
  },
  dismissRow: {
    borderWidth: 0,
    height: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dismissTextContainer: {
    borderWidth: 0,
    height: 35,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: styles.borderRadius,
  },
};
