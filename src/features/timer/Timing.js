import React from 'react'
import {View, StyleSheet, Text} from 'react-native'

import {RoundedButton} from '../../components/RoundedButton'

export const Timing = ({changeTime}) => {
  return (
    <>
      <View>
        <RoundedButton 
          size={75}
          title='10'
          onPress={() => changeTime(10)}
        />
      </View>
      <View>
        <RoundedButton 
          size={75}
          title='15'
          onPress={() => changeTime(15)}
        />
      </View>
      <View>
        <RoundedButton 
          size={75}
          title='20'
          onPress={() => changeTime(20)}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  timimgButton: {
    flex: 1,
    alignItems: "center",
  }
})