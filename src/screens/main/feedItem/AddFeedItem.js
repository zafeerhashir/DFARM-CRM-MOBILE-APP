import React, {useRef, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Date, Input, SmartView} from '../../../components/Index';
import {addFeedItem, addFeedItemDate} from '../../../redux/actions/Index';
import {charactersRegex, integerRegex} from '../../../validations/Index';
import {currentDate} from './../../../conversions/Index';

function AddFeedItem({navigation}) {
  const feedItemReducerState = useSelector((state) => state.feedItem);
  const [feedName, setFeedName] = useState('');
  const [feedUnit, setFeedUnit] = useState('');
  const [feedQuantity, setFeedQuantity] = useState('');
  const [feedPrice, setFeedPrice] = useState('');
  const [date, setDate] = useState(currentDate());
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

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      /// date is select but not added
      dispatch(addFeedItemDate({date: date}));
    });
    return unsubscribe;
  }, [navigation]);

  const callApi = () => {
    const postBodyAddFeedItem = {
      item: [
        {
          unit: feedUnit == '' ? 0 : feedUnit,
          quantity: feedQuantity == '' ? 0 : feedQuantity,
          name: feedName,
          price: feedPrice,
        },
      ],
    };

    const payload = {
      postBodyAddFeedItem,
      feedItemDateId: feedItemReducerState.feedItemDate.id,
    };
    feedNameRef.current.clear();
    feedQuantityRef.current.clear();
    feedUnitRef.current.clear();
    feedPriceRef.current.clear();
    // dateRef.current.clear();
    dispatch(addFeedItem(payload));
  };

  return (
    <SmartView>
      <Date
        date={date}
        ref={dateRef}
        onDateChange={(date) => {
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
        onChangeText={(value) => setFeedName(value)}
        error={(error) => {
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
        onChangeText={(value) => setFeedUnit(value)}
        error={(error) => {
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
        onChangeText={(value) => setFeedQuantity(value)}
        error={(error) => {
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
        onChangeText={(value) => setFeedPrice(value)}
        error={(error) => {
          setFeedPriceError(error);
        }}
        regex={integerRegex}
      />

      <Button
        loading={feedItemReducerState.feedItemLoading}
        error={[
          feedNameError,
          feedPriceError,
          feedUnitError,
          feedQuantityError,
        ]}
        title={'Submit'}
        onPress={() => callApi()}
      />
    </SmartView>
  );
}

export {AddFeedItem};

const addFeedItemStyles = {
  container: {
    marginTop: 20,
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
};
