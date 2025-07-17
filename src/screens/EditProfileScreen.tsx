import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import { useUpdateUserMutation } from '@api/sharePicApi';
import Styles from '@config/Styles';


const EditProfileScreen = () => {
  // Replace with actual userId from auth state or navigation params
  const userId = '';
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '50%'], []);
  const handleSheetChanges = useCallback((index: number) => {}, []);

  const [image, setImage] = useState<any>(null);
  const [userData, setUserData] = useState<any>({
    fName: '',
    lName: '',
    about: '',
    phone: '',
    country: '',
    city: '',
    userImg: '',
  });
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const takePhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      const imagePath = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imagePath);
      bottomSheetRef.current?.close();
    });
  };
  const choosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      const imagePath = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imagePath);
      bottomSheetRef.current?.close();
    });
  };
  const handleUpdate = async () => {
    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    if (image) {
      formData.append('userImg', {
        uri: image,
        name: 'profile.jpg',
        type: 'image/jpeg',
      } as any);
    }
    try {
      await updateUser({ id: userId, formData }).unwrap();
      Alert.alert('Profile Updated!', 'Your profile has been updated successfully.');
    } catch (e) {
      Alert.alert('Update Failed', 'Could not update profile.');
    }
  };
  // Optionally, fetch user data here and setUserData
  useEffect(() => {
    // Fetch user data and setUserData if needed
  }, []);
  return (
    <View style={[Styles.flexContainer,{padding:24}]}> 
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <BottomSheetView style={Styles.panel}>
          <View style={{alignItems: 'center'}}>
            <Text style={[Styles.panelTitle,{color:'black'}]}>Upload Photo</Text>
            <Text style={Styles.panelSubtitle}>
              Choose Your Profile Picture
            </Text>
          </View>
          <TouchableOpacity style={Styles.panelButton} onPress={takePhoto}>
            <Text style={Styles.panelButtonTitle}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.panelButton} onPress={choosePhoto}>
            <Text style={Styles.panelButtonTitle}>Choose From Library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.panelButton}
            onPress={() => bottomSheetRef.current?.close()}>
            <Text style={Styles.panelButtonTitle}>Cancel</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
      <ScrollView
        style={Styles.inputsContainer}
        showsVerticalScrollIndicator={false}>
        <View style={Styles.action}>
          <FontAwesome name="user-o" color="#333333" size={20} />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData.fName}
            onChangeText={txt => setUserData({...userData, fName: txt})}
            style={Styles.textInput}
          />
        </View>
        <View style={Styles.action}>
          <FontAwesome name="user-o" color="#333333" size={20} />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData.lName}
            onChangeText={txt => setUserData({...userData, lName: txt})}
            style={Styles.textInput}
          />
        </View>
        <View style={Styles.action}>
          <Ionicons name="ios-clipboard-outline" color="#333333" size={20} />
          <TextInput
            placeholder="About Me"
            placeholderTextColor="#666666"
            autoCorrect={true}
            multiline={true}
            value={userData.about}
            onChangeText={txt => setUserData({...userData, about: txt})}
            style={[Styles.textInput, {height: 100}]}
          />
        </View>
        <View style={Styles.action}>
          <Ionicons name="call-outline" color="#333333" size={20} />
          <TextInput
            placeholder="Phone"
            keyboardType="number-pad"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData.phone}
            onChangeText={txt => setUserData({...userData, phone: txt})}
            style={Styles.textInput}
          />
        </View>
        <View style={Styles.action}>
          <Ionicons name="globe-outline" color="#333333" size={20} />
          <TextInput
            placeholder="Country"
            placeholderTextColor="#666666"
            autoCorrect={true}
            value={userData.country}
            onChangeText={txt => setUserData({...userData, country: txt})}
            style={Styles.textInput}
          />
        </View>
        <View style={Styles.action}>
          <Ionicons name="location-outline" color="#333333" size={20} />
          <TextInput
            placeholder="City"
            placeholderTextColor="#666666"
            autoCorrect={true}
            value={userData.city}
            onChangeText={txt => setUserData({...userData, city: txt})}
            style={Styles.textInput}
          />
        </View>
        <View style={Styles.panelButtonContainer}>
          <TouchableOpacity
            style={[Styles.panelButton, {width: '40%', height: 40, opacity: isLoading ? 0.6 : 1}]}
            onPress={handleUpdate}
            disabled={isLoading}
          >
            <Text style={[Styles.panelTitle, {fontSize: 18}]}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;

