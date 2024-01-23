//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import WrapperContainer from '../../Components/WapperContainer';
import FastImageComp from '../../Components/FastImageComp';
import TextComp from '../../Components/TextComp';
import {useSelector} from 'react-redux';
import colors from '../../styles/colors';
import {FlashList} from '@shopify/flash-list';
import imagePath from '../../Constants/imagePath';
import {spacing} from '../../styles/spacing';
import {textScale} from '../../styles/responsiveStyles';
import navigationString from '../../Navigations/navigationString';

// create a component
const Profile = ({navigation}) => {
  const {selectedTheme} = useSelector(state => state?.appSetting);

  const isDark = selectedTheme == 'dark';

  const listHeader = () => {
    return (
      <View style={{marginBottom: spacing.MARGIN_16}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FastImageComp
              url="https://www.nautiljon.com/images/perso/00/48/gojo_satoru_19784.webp"
              imageStyle={{
                borderRadius: spacing.MARGIN_50,
              }}
            />
            <View style={{marginLeft: spacing.MARGIN_16}}>
              <TextComp text="Satoru Gojo" style={{fontSize: textScale(20)}} />
              <TextComp
                text="gojo@email.com"
                style={{
                  fontSize: textScale(14),
                  color: isDark
                    ? colors.whiteColorOpacity70
                    : colors.blackOpacity70,
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate(navigationString.PORFILE_EDIT)}>
            <Image source={imagePath.icEdit} />
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: spacing.MARGIN_16}}>
          <TextComp
            text="Developed a dynamic e-commerce website from scratch, providing customers with a"
            style={{fontSize: textScale(16)}}
          />
        </View>

        <View
          style={{
            ...styles.boxView,
            backgroundColor: isDark
              ? colors.blackOpacity20
              : colors.blackOpacity40,
          }}>
          <TextComp text="Dashboard" style={{fontSize: textScale(14)}} />
          <TextComp
            text="1k account reached in the last 30 days"
            style={{
              fontSize: textScale(14),
              color: isDark
                ? colors.whiteColorOpacity70
                : colors.blackOpacity70,
            }}
          />
        </View>
      </View>
    );
  };

  const renderItem = () => {
    return (
      <TouchableOpacity>
        <FastImageComp
          url={
            'https://i1.sndcdn.com/artworks-JmErnf9jVsLNoqN4-7yRD4w-t500x500.jpg'
          }
          imageStyle={{
            ...styles.imgStyle,
            borderColor: isDark ? colors.whiteColor : colors.blackColor,
          }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <WrapperContainer>
      <View style={{flex: 1, padding: spacing.PADDING_16}}>
        <FlashList
          showsVerticalScrollIndicator={false}
          numColumns={3}
          data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
          renderItem={renderItem}
          ListHeaderComponent={listHeader}
          ListEmptyComponent={() => <Text>No posts found</Text>}
           estimatedItemSize={spacing.FULL_WIDTH / 2}
          keyExtractor={(item, index) => item?._id || String(index)}
        />
      </View>
    </WrapperContainer>
  );
};

// define your styles
const styles = StyleSheet.create({
  boxView: {
    padding: spacing.PADDING_12,
    borderRadius: spacing.RADIUS_8,
  },
  imgStyle: {
    width: spacing.FULL_WIDTH / 3,
    height: spacing.FULL_HEIGHT / 3,
    borderWidth: 0.5,
  },
});

//make this component available to the app
export default Profile;
