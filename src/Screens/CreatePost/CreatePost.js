//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform, Button, Image, TouchableOpacity } from 'react-native';
import WrapperContainer from '../../Components/WapperContainer';
import HeaderComp from '../../Components/HeaderComp';

import { CameraRoll, useCameraRoll } from "@react-native-camera-roll/camera-roll";
import { FlashList } from '@shopify/flash-list';
import imagePath from '../../Constants/imagePath';
import colors from '../../styles/colors';
import navigationStrings from '../../Navigations/navigationString';
import ImagePicker from 'react-native-image-crop-picker';
import { spacing } from '../../styles/spacing';

// create a component
const CreatePost = ({ navigation }) => {

    const [photos, setPhotos] = useState([])
    const [selectedImages, setSelectedImages] = useState([])
    const [currentImage, setCurrentImage] = useState({})


    async function hasAndroidPermission() {

        const getCheckPermissionPromise = async () => {
            if (Platform.Version >= 33) {
                const [hasReadMediaImagesPermission, hasReadMediaVideoPermission] = await Promise.all([
                    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
                    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
                ]);
                return hasReadMediaImagesPermission && hasReadMediaVideoPermission;
            } else {
                return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
            }
        };

        const hasPermission = await getCheckPermissionPromise();
        if (hasPermission) {
            return true;
        }
        const getRequestPermissionPromise = async () => {
            if (Platform.Version >= 33) {
                const statuses = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
                ]);
                return statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
                    PermissionsAndroid.RESULTS.GRANTED;
            } else {
                const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
                return status === PermissionsAndroid.RESULTS.GRANTED;
            }
        };

        return await getRequestPermissionPromise();
    }




    async function savePicture() {
        if (Platform.OS === "android" && !(await hasAndroidPermission())) {
            return;
        }
        try {
            let res = await CameraRoll.getPhotos({ first: 100, assetType: 'Photos' })
            const result = res.edges.map((val, i) => val.node).reverse()
            setCurrentImage(result[0])
            setPhotos(result)
        } catch (error) {
            console.log("erro raised",error)
        }

    };


    useEffect(() => {
        savePicture()
    }, [])



    const onSelect = (item, index) => {

        let clonePhotos = [...photos]

        clonePhotos[index].isSelected = !item?.isSelected
        setPhotos(clonePhotos)
        setCurrentImage(item)

        let cloneSelectImg = [...selectedImages]

        const indexItem = cloneSelectImg.findIndex(val => val.timestamp === item?.timestamp)
        if (indexItem === -1) {
            setSelectedImages(prev => [...prev, ...[item]]);
        } else {
            cloneSelectImg.splice(indexItem, 1);
            setSelectedImages(cloneSelectImg)
        }
    }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onSelect(item, index)}
            >
                <Image
                    source={{ uri: item.image.uri }}
                    style={{
                        height: spacing.FULL_HEIGHT / 4,
                        width: spacing.FULL_WIDTH / 4,
                        borderWidth: 0.5
                    }}
                />
                {!!item?.isSelected ? <Image

                    style={styles.checkStyle} source={imagePath.icCheck} /> : null}
            </TouchableOpacity>
        )
    }

    const listHeaderComponent = () => {
        return (
            <View style={{ marginBottom: spacing.MARGIN_16 }}>
                {!!currentImage?.image && currentImage?.image?.uri ? <Image
                    source={{ uri: currentImage.image.uri }}
                    style={styles.parentImage}
                /> : null}
            </View>
        )
    }

    const onNext = () => {

        navigation.navigate(navigationStrings.ADD_POST, { selectedImages })

    }

    const onPressCamera = () =>{
        ImagePicker.openPicker({
            width: 300,
            height: 400,
          }).then(image => {
            navigation.navigate(navigationStrings.ADD_POST, { selectedImages: [{image: image}] })
          }).catch((error)=>{
            console.log("error riased",error)
          });
    }
    return (
        <WrapperContainer>
            <HeaderComp
                leftText='Add post'
                isLeftImage={false}
                rightText='Next'
                onPressRight={onNext}
            />
            <View style={{ flex: 1 }}>

                <FlashList
                    numColumns={4}
                    data={photos}
                    renderItem={renderItem}
                    ListHeaderComponent={listHeaderComponent}
                    keyExtractor={(item, index) => String(item?.image?.uri || index)}
                    estimatedItemSize={spacing.MARGIN_84}
                />

                <TouchableOpacity onPress={onPressCamera} style={styles.cameraBtn}>
                    <Image style={{ tintColor: colors.whiteColor }} source={imagePath.icCamera} />
                </TouchableOpacity>

            </View>
        </WrapperContainer>
    );
};

// define your styles
const styles = StyleSheet.create({
    parentImage: {
        width: '100%',
        height: spacing.HEIGHT_300
    },
    checkStyle: {
        position: 'absolute',
        right: 10,
        top: 10,
        tintColor: colors.redColor
    },
    cameraBtn: {
        height: spacing.HEIGHT_60,
        width:spacing.WIDTH_60,
        borderRadius: spacing.RADIUS_30,
        backgroundColor: colors.redColor,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
    }
});

//make this component available to the app
export default CreatePost;
