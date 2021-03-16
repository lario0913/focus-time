import React, {useState} from 'react'
import {View, StyleSheet, Text, Platform, Vibration} from 'react-native'
import {ProgressBar} from 'react-native-paper'
import {useKeepAwake} from 'expo-keep-awake'


import {paddingSizes} from '../../util/sizes'
import {RoundedButton} from '../../components/RoundedButton'
import {Countdown} from '../../components/Countdown'
import {Timing} from './Timing'

export const Timer = ({focusSubject, onTimerEnd, clearSubject}) => {
  useKeepAwake()

  const interval = React.useRef(null)
  const [minutes, setMinutes] = useState(1)
  const [isStarted, setIsStarted] = useState(false)
  const [progress, setProgress] = useState(1)

  const onProgress = progress => {
    setProgress(progress)
  }

  const changeTime = min => {
    setMinutes(min)
    setIsStarted(false)
    setProgress(1)
  }

  const onEnd = () => {
    vibrate()
    setMinutes(1)
    setIsStarted(false)
    setProgress(1)
    onTimerEnd()
  }
 
  const vibrate = () => {
    if(Platform.OS === 'ios'){
      const interval = setInterval(()=> Vibration.vibrate(), 1000)
      setTimeout(() => clearInterval(interval), 10000)
    }else{
      Vibration.vibrate(10000)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown 
          isPaused={!isStarted} 
          onProgress={onProgress}
          minutes={minutes}
          onEnd={onEnd}
        />
      </View>

      <View style={{paddingTop: 40}}>
        <Text style={styles.title}>Focusing on</Text>
        <Text style={styles.task}>{focusSubject} </Text>
      </View>

     <View style={{paddingTop: paddingSizes.md}}>
        <ProgressBar 
          progress={progress}
          color= '#5e84e2'
          style={{height: 10}}
        />
     </View>

     <View style={styles.buttonWrapper}>
      <Timing changeTime={changeTime} />
     </View>

      <View style={styles.buttonWrapper}>
        {
          isStarted ? 
            <RoundedButton
            title="Pause"
            onPress={() => setIsStarted(false)}
            /> :
            <RoundedButton
            title="Start"
            onPress={() => setIsStarted(true)}
            />
          
        }
      </View>

      <View style={styles.cancelButton}>
        <RoundedButton
          title="-"
          size={50}
          onPress={() => clearSubject()}
        />
      </View>
     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? paddingSizes.mg : paddingSizes.lg,
  },
  title: {
    textAlign: "center",
    color: '#fff',
  },
  task: {
    textAlign: "center",
    color: '#fff',
    fontWeight: 'bold'
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
    alignItems: "center"
  },
  cancelButton: {
    paddingBottom: 25,
    paddingLeft: 25,
  }
})