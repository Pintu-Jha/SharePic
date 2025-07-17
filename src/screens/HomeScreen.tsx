import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useGetPostsQuery, useDeletePostMutation } from '../api/sharePicApi';
import Styles from '@config/Styles';
import PostItem from '@components/PostItem';
import PostLoader from '@components/PostLoader';

interface Types {
  navigation: any;
}
const HomeScreen: React.FC<Types> = ({navigation}) => {
  const [avatars, setAvatars] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const apiUrl = 'https://jsonplaceholder.typicode.com/photos';
  const { data: posts = [], isLoading, refetch } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();

  // Fetch avatars (unrelated to main posts API)
  React.useEffect(() => {
    const avatarApi = async () => {
      try {
        const data = await fetch(apiUrl, {
          method: 'GET',
        });
        const jsonData = await data.json();
        setAvatars(jsonData);
      } catch (err) {
        console.log(err);
      }
    };
    avatarApi();
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const storyFirstItem = () => {
    return (
      <View>
        <Image
          style={Styles.avatarImages}
          source={{
            uri:
              'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
          }}
        />
        <Text style={{color: '#1D1A20', textAlign: 'center'}}>You</Text>
      </View>
    );
  };
  const handleDelete = (postId: any) => {
    Alert.alert(
      'Delete Post',
      'Are you sure ?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              await deletePost(postId).unwrap();
              refetch();
            } catch (e) {
              Alert.alert('Error', 'Failed to delete post.');
            }
          },
        },
      ],
      {cancelable: false},
    );
  };
  const renderItem = ({item}: {item: any}) => (
    <PostItem
      item={item}
      onDelete={handleDelete}
      onPress={() => navigation.navigate('User', {userId: item.userId})}
    />
  );
  const memoizedValue = useMemo(() => renderItem, [posts]);
  const storyComponent = () => {
    return (
      <FlatList
        horizontal={true}
        data={avatars}
        ListHeaderComponent={storyFirstItem}
        style={Styles.avatarList}
        scrollEnabled={true}
        initialNumToRender={4}
        showsHorizontalScrollIndicator={false}
        keyExtractor={key => key.id}
        renderItem={({item}) => (
          <View>
            <View>
              <Image style={Styles.avatarImages} source={{uri: item.url}} />
              <Text style={{color: '#1D1A20', textAlign: 'center'}}>
                Friends
              </Text>
            </View>
          </View>
        )}
      />
    );
  };
  return (
    <View style={Styles.container}>
      <View style={Styles.topSection}>
        <Text style={Styles.xlText}>Rusty.</Text>
        <TouchableOpacity>
          <Icon name={'mail-unread-outline'} color={'#1D1A20'} size={30} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={Styles.xxlText}>The Latest</Text>
      </View>
      <View></View>
      {isLoading ? (
        <PostLoader />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          style={Styles.postContainer}
          initialNumToRender={3}
          ListHeaderComponent={storyComponent}
          contentContainerStyle={{paddingBottom: 5}}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}          
          renderItem={memoizedValue}
        />
      )}
    </View>
  );
};

export default HomeScreen;
