import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../../assets/color/Index';
import styles from '../../../assets/styles/Index';
import {
  Row,
  ListView,
  CardLongPressView,
  EditUserPassword,
} from '../../../components/Index';
import {
  getUser,
  deleteUser,
  editUserPasswordVisible,
   selectedUser,
  searchUser,
} from '../../../redux/actions/Index';

function User({navigation}) {
  const userReducerState = useSelector(state => state.user);
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(false);
  const [data, setData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setData(userReducerState.userData);
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, [navigation, userReducerState.userLoading]);

  const onRefresh = useCallback(() => {
    getData();
  }, [userReducerState.userLoading]);

  const getData = () => {
    dispatch(getUser());
  };

  const _deleteUser = () => {
    setVisible(false);
    const payload = {
      userId: userReducerState.selectedUser.userId,
    };
    dispatch(deleteUser(payload));
  };

  return (
    <ListView
      refreshing={userReducerState.userLoading}
      onRefresh={() => onRefresh()}>
      <View style={userStyles.form}>
        <SearchBar
          lightTheme
          placeholder="Search"
          containerStyle={styles.searchBarContainerStyle}
          inputContainerStyle={styles.searchBarInputContainerStyle}
          inputStyle={styles.searchBarInputStyle}
          onChangeText={searchTerm => dispatch(searchUser({searchTerm}))}
          value={userReducerState.userSearchTerm}
          placeholderTextColor={color.grey}
          clearIcon={false}
          searchIcon={false}
        />

        <View style={userStyles.countContainer}>
          <View style={userStyles.countLabelContainer}>
            <Text style={userStyles.countLabel}>Total User</Text>
          </View>

          <View style={userStyles.countValueContainer}>
            <Text style={userStyles.countValue}>
              {userReducerState.userData == 0
                ? '0'
                : userReducerState.userData.length }
            </Text>
          </View>
        </View>

        {visible && (
          <CardLongPressView
            onEditPress={() => {
              dispatch(editUserPasswordVisible({visible: true})),
                setVisible(false);
            }}
            onDeletePress={() => _deleteUser()}
            onTabOut={() => setVisible(false)}
          />
        )}

        {userReducerState.changeUserPasswordVisible && (
          <EditUserPassword selectedItem={userReducerState.selectedUser} />
        )}
        {console.log(userReducerState.selectedUser, 'selectedItem')}

        {userReducerState.userSearchResults.length == 0 &&
        userReducerState.userLoading == false ? (
          <View style={userStyles.noRecordView}>
            <Text style={userStyles.noRecordText}>No Record Found</Text>
          </View>
        ) : (
          <FlatList
            data={userReducerState.userSearchResults}
            renderItem={({item}) => (
              <TouchableOpacity
                onLongPress={() => {
                  setVisible(true),
                    dispatch(
                      selectedUser({
                        selectedUser: {
                          username: item.userName,
                          userId: item._id,
                        },
                      }),
                    );
                }}
                style={userStyles.cardContainer}>
                <View style={[userStyles.cardContainerChild]}>
                  <Row label={'Username'} value={item.userName} />
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </ListView>
  );
}

export {User};

const userStyles = StyleSheet.create({
  countLabel: {
    color: color.black,
  },
  countValue: {
    color: color.black,
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
    marginTop: '25%',
    height: 30,
    borderWidth: 0,
  },
  noRecordText: {
    color: color.black,
    fontSize: 18,
  },
});
