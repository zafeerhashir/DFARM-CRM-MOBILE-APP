import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../../assets/color/Index';
import styles from '../../../assets/styles/Index';

import {
  CardLongPressView,
  Date,
  Row,
  SmartView,
  EditMilk,
} from '../../../components/Index';
import {
  deleteMilk,
  filterMilkData,
  getMilk,
  editMilkVisible,
} from '../../../redux/actions/Index';
import {agoDate, currentDate, formatDate} from './../../../conversions/Index';
import {SearchBar} from 'react-native-elements';
import {
  searchFeedDate,
  selectFeedDateItem,
  getFeedItemDateData,
} from '../../../redux/actions/Index';
import {feedItem} from '../../../redux/reducers/FeedItem';

function SelectFeedItemDate({navigation}) {
  const feedItemReducerState = useSelector(state => state.feedItem);
  const dispatch = useDispatch();

  useEffect(() => {
    onRefresh();

    const unsubscribe = navigation.addListener('focus', () => {
      onRefresh();
    });
    return unsubscribe;
  }, [navigation]);

  const onRefresh = useCallback(() => {
    dispatch(getFeedItemDateData());
  }, [feedItemReducerState.feedItemLoading]);

  return (
    <SmartView>
      <View style={selectAnimalTagStyles.form}>
        <SearchBar
          lightTheme
          placeholder="Search"
          containerStyle={styles.searchBarContainerStyle}
          inputContainerStyle={styles.searchBarInputContainerStyle}
          inputStyle={styles.searchBarInputStyle}
          onChangeText={searchTerm => dispatch(searchFeedDate({searchTerm}))}
          value={feedItemReducerState.animalTagSearchTerm}
          placeholderTextColor={color.grey}
          clearIcon={false}
          searchIcon={false}
        />

        {feedItemReducerState.feedItemDateSearchResults.length == 0 &&
        feedItemReducerState.feedItemLoading == false ? (
          <View style={selectAnimalTagStyles.noRecordView}>
            <Text style={selectAnimalTagStyles.noRecordText}>
              No Record Found
            </Text>
          </View>
        ) : (
          <FlatList
            onRefresh={() => onRefresh()}
            refreshing={feedItemReducerState.feedItemLoading}
            data={feedItemReducerState.feedItemDateSearchResults}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  dispatch(
                    selectFeedDateItem({
                      date: formatDate(item.date),
                      id: item._id,
                    }),
                  );
                  navigation.goBack();
                }}
                style={selectAnimalTagStyles.cardContainer}>
                <View style={[selectAnimalTagStyles.cardContainerChild]}>
                  <Row label={'Date'} value={formatDate(item.date)} />
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SmartView>
  );
}

export {SelectFeedItemDate};

const selectAnimalTagStyles = {
  dismissRow: {
    borderWidth: 0,
    height: 40,
    width: '110%',
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

  form: {
    backgroundColor: color.white,
    alignItems: 'center',
    width: '100%',
    borderRadius: styles.borderRadius,
    flex: 1,
  },

  parentContainer: {
    width: '100%',
    borderWidth: 0,
    alignItems: 'center',
    height: 600,
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
  },

  subSubChildTwoContainerLabel: {
    height: 45,
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
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
    height: 50,
    ...styles.abstractCardStyles,
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
  },
  cardContainerChildOneColText: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderWidth: 0,
    elevation: 0,
    marginLeft: 5,
  },
  noRecordView: {
    height: 40,
    borderWidth: 0,
  },
  noRecordText: {
    color: color.black,
    fontSize: 18,
  },
};
