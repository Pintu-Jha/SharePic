//import liraries
import React, {  useCallback } from 'react';
import { View, Image, TouchableOpacity, FlatList } from 'react-native';
import WrapperContainer from '../../Components/WapperContainer';
import styles from './styles'
import FastImageComp from '../../Components/FastImageComp';
import imagePath from '../../Constants/imagePath';
import TextComp from '../../Components/TextComp';
import { useSelector } from 'react-redux';
import colors from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { FlashList } from "@shopify/flash-list";

const DATA = [
    {
        title: "First Item",
    },
    {
        title: "Second Item",
    },
    {
        title: "Second Item",
    },
];



// create a component
const Home = () => {
    const { selectedTheme } = useSelector(state => state?.appSetting)

    const renderItem = useCallback(({ item, index }) => {
        return (
            <View style={styles.boxStyle}>
                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: "row", alignItems: 'center', flex: 1 }}>
                        <FastImageComp
                            url={'https://i1.sndcdn.com/artworks-JmErnf9jVsLNoqN4-7yRD4w-t500x500.jpg'}
                            imageStyle={styles.profileImage}
                        />
                        <View>
                            <TextComp
                                text='Gojo Satru'
                                style={styles.nameStyle}
                            />
                            <TextComp
                                text='Software developer'
                                style={{
                                    ...styles.bioStyle,
                                    color: selectedTheme == 'dark' ? colors.whiteColorOpacity40 : colors.blackOpacity70
                                }}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                    >
                        <Image source={imagePath.icDots} />
                    </TouchableOpacity>
                </View>
                <FastImageComp
                    url={'https://e0.pxfuel.com/wallpapers/24/87/desktop-wallpaper-gojo-satoru-electric-blue-art.jpg'}
                    imageStyle={styles.postImage}
                />

                <TextComp
                    text='Lorem ipsum pipsum'
                    style={styles.descStyle}
                />

                <TextComp
                    text='1hr'
                    style={{
                        ...styles.descStyle,
                        marginVertical: spacing.MARGIN_12,
                        color: selectedTheme == 'dark' ? colors.whiteColorOpacity70 : colors.blackOpacity70
                    }}
                />

                <View style={styles.flexHorizontal}>

                    <View style={{ flexDirection: 'row' }}>
                        <TextComp
                            text={`Comments ${20}`}
                            style={{ ...styles.descStyle, marginRight: spacing.MARGIN_8 }}
                        />

                        <TextComp
                            text={`Likes ${10}`}
                            style={styles.descStyle}
                        />
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                    >
                        <Image source={imagePath.icShare} />
                    </TouchableOpacity>

                </View>

            </View>
        )
    }, [])



    return (
        <WrapperContainer>
            <View style={{ flex: 1, padding: spacing.MARGIN_8,paddingBottom:0 }}>
                <FlashList
                    data={DATA}
                    renderItem={renderItem}
                    estimatedItemSize={200}
                    ItemSeparatorComponent={() => <View style={{ height: spacing.HEIGHT_20 }} />}
                />
            </View>
        </WrapperContainer>
    );
};

export default Home;
