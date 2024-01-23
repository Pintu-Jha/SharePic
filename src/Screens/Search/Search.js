//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import WrapperContainer from '../../Components/WapperContainer';
import {FlashList} from '@shopify/flash-list';
import FastImageComp from '../../Components/FastImageComp';
import colors from '../../styles/colors';
import SerachBar from '../../Components/SerachBar';
import {spacing} from '../../styles/spacing';

// create a component
const Search = () => {
  const renderItem = ({index}) => {
    return (
      <TouchableOpacity
        style={{
          marginTop: index % 2 == 0 ? spacing.MARGIN_10 : 0,
        }}>
        <FastImageComp
          url={
            'https://i1.sndcdn.com/artworks-JmErnf9jVsLNoqN4-7yRD4w-t500x500.jpg'
          }
          imageStyle={{
            ...styles.imageStyle,
            borderColor: colors.whiteColor,
          }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <WrapperContainer>
      <View style={{flex: 1}}>
        <SerachBar
          placeholder="Searach..."
          inputStyle={{
            marginHorizontal: spacing.MARGIN_8,
            marginTop: spacing.MARGIN_6,
          }}
          // isSearch
        />
        <FlashList
          data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
          numColumns={2}
          renderItem={renderItem}
          estimatedItemSize={spacing.FULL_WIDTH / 2}
          // ItemSeparatorComponent={() => <View style={{ height: spacing.MARGIN_10 }} />}
        />
      </View>
    </WrapperContainer>
  );
};

// define your styles
const styles = StyleSheet.create({
  imageStyle: {
    width: spacing.FULL_WIDTH / 2.2,
    height: spacing.FULL_HEIGHT / 3,
    borderWidth: 1,
    borderRadius: spacing.RADIUS_10,
  },
});

//make this component available to the app
export default Search;
