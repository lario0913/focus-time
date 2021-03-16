import React from 'react'
import {View, StyleSheet, FlatList, Text, SafeAreaView} from 'react-native'

import {fontSizes, paddingSizes} from '../../util/sizes'
import {RoundedButton} from '../../components/RoundedButton'

const HistoryItem = ({item, index}) => {
  return(
    <Text style={styles.historyItem(item.status)}>
      {item.subject}
    </Text>
  )
}

export const FocusHistory = ({focusHistory, onClear}) => {
  const clearHistory = () => {
    onClear();
  }

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
      {
          !!focusHistory.length &&
          <>
            <Text style={styles.title}>
              Things we have focused on
            </Text>
            <FlatList
              style={{flex: 1}}
              contentContainerStyle={{flex: 1, alignItems: "center"}}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton 
                size={75}
                title="Clear"
                onPress={()=>{onClear()}}
              />
            </View>
          </>
        }

      
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: fontSizes.lg
  },
  historyItem: (status) => ({
    color: status > 1 ? 'red' : 'green'
  }),
  clearContainer: {
    alignItems: "center",
    paddingTop: 30
  }
})

