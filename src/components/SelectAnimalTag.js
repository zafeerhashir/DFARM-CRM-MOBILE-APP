import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import color from '../assets/color/Index';
import styles from '../assets/styles/Index';
import {
  selectAnimalTagItem,
  selectAnimalTagVisible,
} from '../redux/actions/Index';
import {MYModal} from './Modal';
import {Row} from './Row';
import {SmartView} from './SmartView';
import {SearchBar} from 'react-native-elements';

function SelectAnimalTag(props) {
  const milkReducerState = useSelector((state) => state.milk);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {}, []);

  const onChangeText = async (searchTerm) => {
    setSearchTerm(searchTerm);

    if (
      searchTerm.trim().length >= 1 &&
      milkReducerState.animalTagData.length != 0
    ) {
      try {
        var suggestion = await milkReducerState.animalTagData
          .sort()
          .filter((x) => {
            return new RegExp(searchTerm, 'i').test(x.tag);
          });
      } catch (e) {
        // this.setState({searchFound: false});
      }

      if (suggestion.length == 0) {
        // this.setState({searchFound: false});
      } else {
        // this.setState({suggestion, searchFound: true});
      }
    } else {
      // this.setState({suggestion: []});
    }
  };

  return (
    <MYModal>
      <SmartView style={selectAnimalTagStyles.container}>
        <View style={selectAnimalTagStyles.form}>
          <View style={selectAnimalTagStyles.dismissRow}>
            <TouchableOpacity
              style={selectAnimalTagStyles.dismissTextContainer}
              onPress={() => dispatch(selectAnimalTagVisible({visible: false}))}
            >
              <Text style={{color: color.lightGrey}}>Dismiss</Text>
            </TouchableOpacity>
          </View>

          <SearchBar
            lightTheme
            placeholder="Search"
            containerStyle={styles.searchBarContainerStyle}
            inputContainerStyle={styles.searchBarInputContainerStyle}
            inputStyle={styles.searchBarInputStyle}
            onChangeText={(searchTerm) => onChangeText(searchTerm)}
            value={searchTerm}
          />

          {milkReducerState.animalTagData.length == 0 &&
          milkReducerState.milkLoading == false ? (
            <View style={selectAnimalTagStyles.noRecordView}>
              <Text style={selectAnimalTagStyles.noRecordText}>
                No Record Found
              </Text>
            </View>
          ) : (
            <FlatList
              data={milkReducerState.animalTagData}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    dispatch(selectAnimalTagItem({tag: item.tag, id: item._id}))
                  }
                  style={selectAnimalTagStyles.cardContainer}
                >
                  <View style={selectAnimalTagStyles.cardContainerChild}>
                    <Row label={'Animal Tag'} value={item.tag} />
                    <Row label={'Animal Tag'} value={item.tag} />
                    <Row label={'Animal Tag'} value={item.tag} />
                    <Row label={'Animal Tag'} value={item.tag} />
                    <Row label={'Animal Tag'} value={item.tag} />
                    <Row label={'Animal Tag'} value={item.tag} />
                    <Row label={'Animal Tag'} value={item.tag} />
                    <Row label={'Animal Tag'} value={item.tag} />
                    <Row label={'Animal Tag'} value={item.tag} />
                    <Row label={'Animal Tag'} value={item.tag} />
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </SmartView>
    </MYModal>
  );
}

export {SelectAnimalTag};

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
  container: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 500,
  },
  form: {
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    paddingHorizontal: 20,
    borderRadius: styles.borderRadius,
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
    borderWidth: 0.5,
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
    height: 40,
    borderWidth: 0,
  },
  noRecordText: {
    color: color.black,
    fontSize: 18,
  },
};
