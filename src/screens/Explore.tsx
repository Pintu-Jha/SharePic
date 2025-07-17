import {Text, View, TextInput} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Styles from '@config/Styles';


const Explore = () => {
  return (
    <View style={[Styles.flexContainer,{paddingTop:'20%'}]}>
      <View>
        <Text style={Styles.xxlText}>Explore</Text>
        <View>
        <Ionicons name="ios-search-outline" color={'#AEAEAE'}  size={20} style={Styles.exploreSearchIcon}/>
        <TextInput style={Styles.exploreSearchInput} placeholder={'What are you looking for?'} placeholderTextColor={'#AEAEAE'}/>
        </View>
        
      </View>
    </View>
  );
};

export default Explore;

