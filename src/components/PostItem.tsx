import {Text, View, TouchableOpacity, Image, Dimensions} from 'react-native';
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  memo,
} from 'react';

import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import styles from '@config/Styles';

var width = Dimensions.get('window').width;

interface Types {
  onDelete?: any;
  onPress?: () => void;
  item?: any;
}
const PostItem: React.FC<Types> = ({item, onDelete, onPress}) => {
  // Context and Firebase removed. User data should be passed as prop or fetched via RTK Query if needed.
  const [userData, setUserData] = useState<any>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '50%'], []);
  const handleSheet = useCallback(
    (input: any) => {
      bottomSheetRef.current?.expand();
    },
    []
  );
  const handleSheetChanges = useCallback((index: number) => {}, []);

  // Dummy user for demonstration; replace with actual user logic as needed
  const user = { uid: 'demo' };

  return (
    <View key={item.index}>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <BottomSheetView style={styles.panel}>
          {user.uid == item.userId ? (
            <TouchableOpacity
              style={[styles.panelButton, {backgroundColor: 'crimson'}]}
              onPress={() => onDelete(item.id)}>
              <Text style={styles.panelButtonTitle}>Delete Post</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={styles.panelButton}
            onPress={(input: any) => handleSheet(input)}>
            <Text style={styles.panelButtonTitle}>Cancel</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
      <View style={styles.postTopContainer}>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={{
              uri:
                userData?.userImg ||
                'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
            }}
            style={styles.avatarImages}
          />
        </TouchableOpacity>
        <View style={styles.postHeaderTextContainer}>
          <View style={styles.postTextInnerContainer}>
            <TouchableOpacity onPress={onPress}>
              <Text style={styles.postUserNameText}>
                {' '}
                {userData ? userData.fName || 'Test' : 'Test'}{' '}
                {userData ? userData.lName || 'User' : 'User'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.postCreateText}>created a new post</Text>
          </View>
          <Text style={styles.postCreateTimeText}>
            {moment(item.postTime?.toDate ? item.postTime.toDate() : item.postTime).fromNow()}
          </Text>
        </View>
        <View style={styles.postIconContainer}>
          <TouchableOpacity
            style={styles.postIconStyle}
            onPress={(input: any) => handleSheet(input)}>
            <Entypo name={'dots-three-horizontal'} color={'gray'} size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{alignSelf: 'center', marginTop: 12, zIndex: -1}}>
        {item.postImage !== null ? (
          <Image
            source={{
              uri: item.postImage,
            }}
            style={{borderRadius: 20, width: width * 0.9, height: 350}}
          />
        ) : null}
      </View>
      <View style={styles.postText}>
        <Text style={{color: 'black'}}>{item.post}</Text>
      </View>
      <View style={styles.postBottom}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <Ionicons name={'paw-outline'} color={'gray'} size={24} />
          </TouchableOpacity>
          <Text
            style={{
              color: 'gray',
              alignSelf: 'center',
              paddingLeft: 12,
            }}>
            {item.likes}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <Ionicons name={'chatbubble-outline'} color={'gray'} size={24} />
          </TouchableOpacity>
          <Text
            style={{
              color: 'gray',
              alignSelf: 'center',
              paddingLeft: 12,
            }}>
            {item.comments}
          </Text>
        </View>
        <TouchableOpacity>
          <Ionicons name={'paper-plane-outline'} color={'gray'} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(PostItem);
