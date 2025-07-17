import { useCreatePostMutation } from '@api/sharePicApi';
import Styles from '@config/Styles';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator, Alert } from 'react-native';


interface Params {
  route: any;
  navigation: any;
}
const EditPostScreen: React.FC<Params> = ({route, navigation}) => {
  const image = route.params?.param || null;
  const [text, setText] = useState<string>('');
  const [createPost, { isLoading }] = useCreatePostMutation();

  const handleShare = async () => {
    if (!text) {
      Alert.alert('Missing Text', 'Please enter a caption.');
      return;
    }
    const formData = new FormData();
    formData.append('post', text);
    if (image) {
      formData.append('postImage', {
        uri: image,
        name: 'post.jpg',
        type: 'image/jpeg',
      } as any);
    }
    try {
      await createPost(formData).unwrap();
      navigation.replace('Tabs');
    } catch (e) {
      Alert.alert('Failed', 'Could not create post.');
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleShare} style={{right: '10%'}} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#000" /> : <Text style={Styles.addText}>Share</Text>}
        </TouchableOpacity>
      ),
    });
  }, [text, isLoading]);
  return (
    <View style={[Styles.flexContainer, {backgroundColor: '#fff'}]}>
      <View style={Styles.addInputContainer}>
        <Image
          source={{uri: 'file://' + image}}
          style={{width: 80, height: 80, alignSelf: 'center'}}
        />
        <TextInput
          placeholder="Write a caption..."
          placeholderTextColor={'lightgray'}
          onChangeText={setText}
          value={text}
          style={Styles.addInputStyle}
          multiline={true}
          numberOfLines={4}
        />
      </View>
    </View>
  );
};

export default EditPostScreen;
