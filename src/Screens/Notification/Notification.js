//import liraries
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import FastImageComp from '../../Components/FastImageComp';
import HeaderComp from '../../Components/HeaderComp';
import TextComp from '../../Components/TextComp';
import WrapperContainer from '../../Components/WapperContainer';
import colors from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { textScale } from '../../styles/responsiveStyles';


const Notification = () => {
    const { selectedTheme } = useSelector(state => state?.appSetting)


    const renderItem = () => {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: spacing.PADDING_16,
                }}
            >

                <FastImageComp
                    url={'https://i1.sndcdn.com/artworks-JmErnf9jVsLNoqN4-7yRD4w-t500x500.jpg'}
                    imageStyle={styles.imgStyle}
                />
                <View style={{ marginHorizontal: spacing.MARGIN_16 }}>
                    <TextComp
                        text='User name'
                        style={{ fontSize: textScale(16) }}
                    >
                        <Text style={{ color: colors.redColor }}>added new</Text>
                    </TextComp>
                    <TextComp
                        text='1 hr'
                        style={{
                            marginVertical: spacing.MARGIN_4,
                            color: selectedTheme == 'dark' ? colors.whiteColorOpacity70 : colors.blackOpacity70
                        }}
                    />
                </View>

            </TouchableOpacity>
        )
    }

    return (
        <WrapperContainer>
            <View style={{ flex: 1 }}>
                <HeaderComp
                    isLeftImage={false}
                    leftText='Notifications'
                    style={{ marginBottom: spacing.MARGIN_16 }}

                />
                <FlashList
                    data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
                    renderItem={renderItem}
                    estimatedItemSize={70}
                    ItemSeparatorComponent={() => <View style={{ ...styles.horizontalLine, borderBottomColor: selectedTheme == 'dark' ? colors.whiteColorOpacity40 : colors.blackOpacity40 }} />}
                />
            </View>

        </WrapperContainer>
    );
};


const styles = StyleSheet.create({
   
    imgStyle: {
        width: spacing.WIDTH_40,
        height: spacing.HEIGHT_40,
        borderRadius: spacing.RADIUS_20,
    },
    horizontalLine: {
        height: spacing.HEIGHT_2,
        borderBottomWidth: 1,
        marginVertical:spacing.MARGIN_16
    }
});

//make this component available to the app
export default Notification;
