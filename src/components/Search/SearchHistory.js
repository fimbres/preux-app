import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect } from 'react';
import colors from '../../styles/Colors';
import { getSearchHistory } from '../../api/search'
import { map } from 'lodash';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default function SearchHistory(props) {
    const { showHistory, onSearch } = props;
    const [ history, setHistory ] = useState(null);
  useEffect(() => {
    if(showHistory) {(async () => {
      const response = await getSearchHistory();
      setHistory(response);
    })();}
  }, [showHistory]);

  return (
    <View style={[showHistory ? styles.history : styles.hidden, {top:0}]}>
      {history && 
        map(history, (item, index) => (
          <TouchableWithoutFeedback key={index} onPress={() => onSearch(item.search)}>
            <View numberOfLines={1} style={styles.historyitem}>
              <Text style={styles.text}>{item.search}</Text>
              <AwesomeIcon name="arrow-right" size={15} />
            </View>
          </TouchableWithoutFeedback>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
    hidden: {
        display: 'none'
    },
    history: {
        position: 'absolute',
        backgroundColor: colors.white,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    historyitem: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    text: {
      fontSize: 15
    }
})