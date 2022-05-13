import { StyleSheet, ScrollView, View, Keyboard, Animated, Text } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Searchbar } from 'react-native-paper';
import StatusBar from '../components/StatusBar';
import Colors from '../styles/Colors';
import LayoutStyle from '../styles/Layout';
import { AnimatedIcon, inputAnimation, inputAnimationWidth, animatedTransition, animatedTransitionReset, arrowAnimation } from '../components/Search/SearchAnimator';
import Searchpage from './Search-page';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import SearchHistory from '../components/Search/SearchHistory';
import { updateSearchHistory } from '../api/search';

export default function Search() {
  const [ searching, setSearching ] = useState(false);
  const [ query, setQuery ] = useState("");
  const [ search, setSearch ] = useState(false);
  const [ showHistory, setShowHistory ] = useState(false);
  const [ containerHeight, setContainerHeight ] = useState(0);
  const navigation = useNavigation();

  const openSearch = () =>{
    animatedTransition.start();
    setSearching(true);
    setSearch(false);
    setShowHistory(true);
  };

  const closeSearch = () =>{
    animatedTransitionReset.start();
    Keyboard.dismiss();
    setSearching(false);
    setShowHistory(false);
  };

  const onChangeSearch = (query) => { setQuery(query); }

  const onSearch = async (reuseSearch = null) => {
    Keyboard.dismiss();
    animatedTransitionReset.start();
    if(query.length > 0) {
      console.log(query + " no es reciclada");
      setSearch(true);
      setSearching(false);
      setShowHistory(false);
      await updateSearchHistory(query);
      setQuery('');
    }
    else if(reuseSearch){
      console.log(reuseSearch + " es reciclada");
      setSearch(true);
      setSearching(false);
      setShowHistory(false);
      setQuery(reuseSearch);
      setQuery('');
    }
  }

  return (
    <>
      <StatusBar BackgroundColor={Colors.black} barStyle="light-content"/>
      <View style={styles.container} onLayout={(event) => setContainerHeight(event.nativeEvent.layout.height)}>
        <View style={styles.containerInput}>
          <AnimatedIcon name="arrow-left" size={16} onPress={closeSearch} style= {[ styles.backarrow, arrowAnimation ]}/>
          <Animated.View style={[inputAnimation, {width: inputAnimationWidth}]}>
            <Searchbar placeholder="Search" onFocus={openSearch} onChangeText={onChangeSearch} onSubmitEditing={onSearch}/>
          </Animated.View>
        </View>
      </View>
      <ScrollView contentContainerStyle={LayoutStyle.containerB}>
        {searching ? 
          <>
            <SearchHistory showHistory={showHistory} containerHeight={containerHeight} onSearch={onSearch}/>
          </>
         : !search &&
          <>
            <Icon name="search" size={100}/>
            <Text style={{ padding: 20, fontSize: 20 }}>Search a product</Text>
          </>
        }
        {search && <Searchpage search={search} query={query}/>}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 1
  },
  containerInput: {
    position: 'relative',
    alignItems: 'flex-end'
  },
  backarrow: {
    color: Colors.white,
    top: 15, 
    left: 0, 
    position: 'absolute',
  }
});