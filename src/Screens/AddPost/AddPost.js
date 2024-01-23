//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Alert, Pressable } from 'react-native';
import WrapperContainer from '../../Components/WapperContainer';
import HeaderComp from '../../Components/HeaderComp';
import imagePath from '../../Constants/imagePath';
import colors from '../../styles/colors';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import MultiTextInput from '../../Components/MultiTextInput';
import strings from '../../Constants/lang';
import ButtonComp from '../../Components/BottonComp';
import { spacing } from '../../styles/spacing';


// create a component
const AddPost = ({ navigation, route }) => {

    const { selectedTheme } = useSelector(state => state?.appSetting)

    const isDark = selectedTheme == 'dark'


    const [images, setImages] = useState(route?.params?.selectedImages || [])
    const [text, setText] = useState('')

    const onSelect = () => {

    }

    const renderItem = (item, index) => {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onSelect(item, index)}
                style={{ marginRight: spacing.MARGIN_16 }}
            >
                <Image
                    source={{ uri: item?.image?.uri || item?.image?.path }}
                    style={styles.imgStyle}
                />

                <Pressable
                    onPress={() => removeImage(index)}
                    style={styles.crossStyle}
                >
                    <Image
                        style={{ tintColor: isDark ? colors.whiteColor : colors.blackColor , overflow:"visible"}}
                        source={imagePath.icCross} />
                </Pressable>
            </TouchableOpacity>
        )
    }

    const onAdd = () => {
        if (images.length >= 4) {
            Alert("You can only add 4 images")
            return;
        }

        Alert.alert(
            'Upload Image',
            'Choose an option',
            [
                { text: 'Camera', onPress: () => openCamera() },
                { text: 'Gallery', onPress: () => openGallery() },
                { text: 'Cancel', onPress: () => { } },
            ]
        )
    }

    const openCamera = () => {
        try {
            const image = ImagePicker.openCamera({ mediaType: 'photo' })
            console.log("image", image)
        } catch (error) {
            console.log('error raised',error)
        }
    }

    const openGallery = async () => {
        try {
            const image = await ImagePicker.openPicker({ mediaType: 'photo' })
            console.log("image", image)
            // [{image: image}]
            setImages(prev => [...prev, ...[{ image: image }]])

        } catch (error) {
            console.log('error raised',error)
        }
    }

    const removeImage = (index) => {
        let cloneImages = [...images]
        cloneImages.splice(index, 1)
        setImages(cloneImages)
    }

    return (
        <WrapperContainer>
            <HeaderComp leftText='Create post' />

            <View style={styles.container}>

                <View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ overflow: 'visible' }}
                    >
                        {images.length > 0 ? images.map((val, i) => {
                            return renderItem(val, i)
                        })
                            : null
                        }

                        <TouchableOpacity
                            onPress={onAdd}
                            style={{
                                ...styles.imgStyle,
                                backgroundColor: colors.gray2,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Image style={{ tintColor: colors.whiteColor }} source={imagePath.icAdd} />
                        </TouchableOpacity>

                    </ScrollView>

                    <MultiTextInput
                        value={text}
                        placeholder={strings.DESCRIPTION}
                        onChangeText={(value) => setText(value)}
                        multiline={true}
                        inputStyle={{marginTop:spacing.MARGIN_24}}
                    />
                </View>


                <ButtonComp
                    text={strings.SAVE}
                />

            </View>

        </WrapperContainer>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.PADDING_16,
        justifyContent: 'space-between'

    },
    imgStyle: {
        height: spacing.FULL_HEIGHT / 4,
        width: spacing.FULL_WIDTH / 4,
        borderRadius: spacing.RADIUS_8
    },
    crossStyle: {
        position: 'absolute',
        right: -10,
        top: -10,
        tintColor: colors.redColor,
        overflow:"visible"
        
    },
});

//make this component available to the app
export default AddPost;
