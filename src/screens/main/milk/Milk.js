import React, {useEffect,useState,useRef} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SmartView, Row, Date} from '../../../components/Index';
import {getMilk} from '../../../redux/actions/Index';
import {formatDate} from './../../../conversions/Index';

function Milk() {

  const dateRef = useRef();
  const [date, setDate] = useState('');
  const milkReducerState = useSelector(state => state.milk);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMilk());
  }, []);

  return (
    <SmartView loading={milkReducerState.milkLoading}>
      <View style={milkStyles.parentContainer}>
        <View style={milkStyles.childOneContainer}>
          <View style={milkStyles.subChildOneContainer}>
            <View style={milkStyles.subSubChildOneContainer}>
            <Date
            date={date}
            placeholder={'Select from date'}
            ref={dateRef}
            onDateChange={date => {
              setDate(date);
            }}
          />
            </View>

            <View style={milkStyles.subSubChildOneContainer}>
            <Date
            date={date}
            placeholder={'Select to date'}
            ref={dateRef}
            onDateChange={date => {
              setDate(date);
            }}
          />
            </View>
          </View>

          <View style={milkStyles.subChildTwoContainer}>
            <View style={milkStyles.subSubChildTwoContainer}>
            <Text>Total Milk</Text>
            </View>

            <View style={milkStyles.subSubChildTwoContainerLabel}>
            <Text>1000000 Liter</Text>
            </View>
          </View>
        </View>

        <FlatList
          data={milkReducerState.milkData}
          renderItem={({item}) => (
            <View style={milkStyles.cardContainer}>
              <View style={milkStyles.cardContainerChild}>
                <Row 
                 label={'Date'} 
                 value={formatDate(item.date)} 
                />
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
            </View>
          )}
        />
      </View>
    </SmartView>
  );
}

// const mapStateToProps = ({ ui }) => ({
//   ui
// });

// const mapDispatchToProps =({ dispatch }) => ({
//   getMilk:()=> dispatch(getMilk)
// })

// const Milk = connect(
//   mapStateToProps,
//   null
// )(IMilk)

{
  /*  <View style={milkStyles.cardContainer}>
            <View style={milkStyles.cardContainerChildOne}>
              <View style={milkStyles.cardContainerChildOneRow}>
                <View style={milkStyles.cardContainerChildOneColLabel}>
                  <Text style={{fontSize: 15}}>Morning Milk (liter)</Text>
                </View>

                <View style={milkStyles.cardContainerChildOneColText}>
                  <Text style={{fontSize: 15}}>22</Text>
                </View>
              </View>

              <View style={milkStyles.cardContainerChildOneRow}>
                <View style={milkStyles.cardContainerChildOneColLabel}>
                  <Text style={{fontSize: 15}}>Evening Milk (liter)</Text>
                </View>

                <View style={milkStyles.cardContainerChildOneColText}>
                  <Text style={{fontSize: 16}}>22</Text>
                </View>
              </View>
            </View>

            <View style={milkStyles.cardContainerChildTwo}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>2020/04/28</Text>
            </View>
        </View>*/
}

export {Milk};

const milkStyles = {
  parentContainer: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 40
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
    elevation: 1
  },

  subSubChildTwoContainerLabel: {
    height: 45,
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    elevation: 1
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
};
