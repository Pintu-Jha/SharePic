import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetPostsQuery, useGetUserQuery } from '@api/sharePicApi';
import UserLoader from '@components/UserLoader';
import Styles from '@config/Styles';

interface Types {
  navigation: any;
  route: any;
}
const UserScreen: React.FC<Types> = ({navigation, route}) => {
  // Get userId from route or fallback (implement actual userId logic as needed)
  const userId = route.params?.userId;
  const { data: userData, isLoading: userLoading } = useGetUserQuery(userId);
  const { data: posts = [], isLoading: postsLoading } = useGetPostsQuery();
  const userPosts = posts.filter((post: any) => post.userId === userId);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('jwt');
    Alert.alert('Logged out', 'You have been logged out.');
    // Optionally navigate to login screen
    // navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {userLoading ? (
        <UserLoader />
      ) : (
        <ScrollView
          style={Styles.userContainer}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          showsVerticalScrollIndicator={false}>
          <Image
            style={Styles.userImg}
            source={{
              uri: userData?.userImg ||
                'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
            }}
          />
          <Text style={Styles.userName}>
            {userData?.fName || 'Test'} {userData?.lName || 'User'}
          </Text>
          <Text style={Styles.userAbout}>
            {userData?.about || 'No details added.'}
          </Text>
          <View style={Styles.userBtnWrapper}>
            {route.params?.userId != null ? (
              <>
                <TouchableOpacity style={Styles.userBtn} onPress={() => {}}>
                  <Text style={Styles.userBtnTxt}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.userBtn} onPress={() => {}}>
                  <Text style={Styles.userBtnTxt}>Follow</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={Styles.userBtn}
                  onPress={() => navigation.navigate('EditProfile')}>
                  <Text style={Styles.userBtnTxt}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Styles.userBtn}
                  onPress={handleLogout}>
                  <Text style={Styles.userBtnTxt}>Logout</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          <View style={Styles.userInfoWrapper}>
            <View style={Styles.userInfoItem}>
              <Text style={Styles.userInfoTitle}>
                {userPosts && userPosts.length > 0 ? userPosts.length : 0}
              </Text>
              <Text style={Styles.userInfoSubTitle}>Posts</Text>
            </View>
            <View style={Styles.userInfoItem}>
              <Text style={Styles.userInfoTitle}>72m</Text>
              <Text style={Styles.userInfoSubTitle}>Followers</Text>
            </View>
            <View style={Styles.userInfoItem}>
              <Text style={Styles.userInfoTitle}>100</Text>
              <Text style={Styles.userInfoSubTitle}>Following</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default UserScreen;
