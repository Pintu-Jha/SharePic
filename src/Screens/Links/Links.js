//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity } from 'react-native';
import WrapperContainer from '../../Components/WapperContainer';
import HeaderComp from '../../Components/HeaderComp';
import { FlashList } from '@shopify/flash-list';
import TextComp from '../../Components/TextComp';
import colors from '../../styles/colors';
import { useSelector } from 'react-redux';
import fontFamily from '../../styles/fontFamily';
import ModalComp from '../../Components/ModalComp';
import TextInputComp from '../../Components/TextImputComp';
import ButtonComp from '../../Components/BottonComp';
import { spacing } from '../../styles/spacing';
import { textScale } from '../../styles/responsiveStyles';
import strings from '../../Constants/lang';
import imagePath from '../../Constants/imagePath';

// create a component
const Links = () => {
    const { selectedTheme } = useSelector(state => state?.appSetting)
    const isDark = selectedTheme == 'dark'

    const [showModal, setShowModal] = useState(false)
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

    const renderItem = () => {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.itemStyle}
            >
                <View style={{ flex: 0.1 }}>
                    <Image source={imagePath.icLink} />
                </View>
                <View style={{ flex: 0.8 }}>
                    <TextComp
                        numberOfLines={1}
                        text='https://www.youtube.com/channel/UCe4N2QmyaYQwPHQn82mZy3w'
                        style={{ color: colors.blueColor }}
                        numof
                    />
                </View>
                <View style={{ flex: 0.1 }}>
                    <Image style={{ tintColor: isDark ? colors.whiteColor : colors.blackColor }} source={imagePath.rightArrow} />
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <WrapperContainer>
            <View style={{ flex: 1, padding: spacing.PADDING_16 }}>
                <HeaderComp
                    leftText={strings.ADD_LINKS}
                />

                <TouchableOpacity
                    style={styles.addLinkStyle}
                    activeOpacity={0.7}
                    onPress={()=>setShowModal(true)}
                >
                    <Image style={{
                        tintColor: isDark ? colors.whiteColor : colors.blackColor,
                        marginRight: spacing.MARGIN_16
                    }} source={imagePath.icAdd} />
                    <TextComp
                        text={strings.ADD_LINKS}
                        style={{ fontSize: textScale(16), fontFamily: fontFamily.Medium }}
                    />
                </TouchableOpacity>
                <FlashList
                    data={[{}, {}]}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={{ ...styles.horizontalLine, borderBottomColor: isDark ? colors.whiteColorOpacity40 : colors.blackOpacity40 }} />}
                />
            </View>

            <ModalComp
                    key={'1'}
                    isVisible={showModal}
                    style={{ margin: 0, justifyContent: 'flex-end' }}
                    avoidKeyboard
                    onBackdropPress={() => setShowModal(false)}

                >
                    <View style={{
                        ...styles.modalStyle,
                        backgroundColor: isDark ? colors.whiteColorOpacity20 : colors.whiteColor,
                    }}>


                        <TextInputComp
                            value={title}
                            placeholder={strings.TITLE}
                            onChangeText={(value) => setTitle(value)}
                        
                        />
                        <TextInputComp
                           value={url}
                           placeholder={strings.LINKS}
                           onChangeText={(value) => setUrl(value)}
                        />
                        <ButtonComp
                            text={strings.SAVE}

                        />
                    </View>

                </ModalComp>
        </WrapperContainer>
    );
};

// define your styles
const styles = StyleSheet.create({
    itemStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1

    },
    horizontalLine: {
        height: spacing.HEIGHT_2,
        borderBottomWidth: 1,
        marginVertical:spacing.MARGIN_16
    },
    addLinkStyle: {
        flexDirection: 'row',
        marginVertical: spacing.MARGIN_16,
        alignItems: 'center'
    },
    modalStyle: {
        padding: spacing.PADDING_16,
        borderTopLeftRadius: spacing.RADIUS_8,
        borderTopRightRadius: spacing.RADIUS_8
    }
});

//make this component available to the app
export default Links;
