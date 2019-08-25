import React, { useState , useEffect} from 'react';
import './App.css';
import { fromEvent } from 'rxjs';
import PredictionBar from './components/PredictionBar'
import { Helmet } from 'react-helmet'
import { Input } from 'antd'
import * as _ from 'lodash'
import firebase from 'firebase'

const hardcodedSuggestions = [
  {id: "1", mandarin: '我', english: 'I', pinyin: 'wo'},
  {id: "2", mandarin: '的', english: 'donut', pinyin: 'wa'},
  {id: "3", mandarin: '猫', english: 'living', pinyin: 'whuo'},
  {id: "4", mandarin: '喜', english: 'stateful', pinyin: 'wu'},
  {id: "5", mandarin: '欢', english: 'cord', pinyin: 'whoo'},
  {id: "6", mandarin: '喝', english: 'exhaust', pinyin: 'woo'},
  {id: "7", mandarin: '牛', english: 'nope', pinyin: 'whoa'},
  {id: "8", mandarin: '奶', english: 'every', pinyin: 'wha'},
  {id: "9", mandarin: '种', english: 'innards', pinyin: 'who'},
]

const generateSuggestions = () => {
  return _.shuffle(hardcodedSuggestions)
}

// const isNumber = (str) => {
//   const REGEX_NUMBER = /^\d+$/u;
//   return REGEX_NUMBER.test(str)
// }
const isEnglish = (str) => {
  const REGEX_ENGLISH = /([a-zA-Z]+)|(\s)/u;
  return REGEX_ENGLISH.test(str);
}

const determineConstantVariableSplit = (text) => {
  // const isChinese = (str) => {
  //   const REGEX_CHINESE = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;
  //   return REGEX_CHINESE.test(str);
  // }
  
  // const isEmoji = (str) => {
  //   const REGEX_EMOJI = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/u;
  //   return REGEX_EMOJI.test(str);
  // }
  let latestNonEnglish = 0
  text.split('').forEach((char, idx) => {
    if (!isEnglish(char)) {
      latestNonEnglish = idx + 1
    }
  })
  return latestNonEnglish
}

const App = () => {

  // the strings
  const [fullString, setFullString] = useState("")
  const [constantString, setConstantString] = useState("")
  const [variableString, setVariableString] = useState("")
  // handles an edge case where the event listener keypress and the native input onChange results in onChange entering in a duplicated number
  // to see this edge case, simply remove `if (numbersAllowed)` anywhere you see it in this file
  const [numbersAllowed, setNumbersAllowed] = useState(true)
  // the estimated values
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    firebase.initializeApp({
      apiKey: "AIzaSyBCMo2Peyseb9xXZSBIV2uChXToGg3Y68g",
      authDomain: "chinglish-keyboard.firebaseapp.com",
      databaseURL: "https://chinglish-keyboard.firebaseio.com",
      projectId: "chinglish-keyboard",
      storageBucket: "",
      messagingSenderId: "915727899842",
      appId: "1:915727899842:web:3b8a1636f9260633"
    })
  }, [])

  useEffect(() => {
    const input = document.getElementById("input-bar")
    const keyPresses = fromEvent(input, 'keypress');
    const subscription = keyPresses.subscribe(e => {
      console.log(e)
      console.log(variableString)
      if (!e.shiftKey && !e.ctrlKey && !e.altKey && variableString && variableString !== " ") {
        if (e.code === "Digit1") {
          selectChinese(suggestions[0].mandarin)
        } else if (e.code === "Digit2") {
            selectChinese(suggestions[1].mandarin)
        } else if (e.code === "Digit3") {
            selectChinese(suggestions[2].mandarin)
        } else if (e.code === "Digit4") {
            selectChinese(suggestions[3].mandarin)
        } else if (e.code === "Digit5") {
            selectChinese(suggestions[4].mandarin)
        } else if (e.code === "Digit6") {
            selectChinese(suggestions[5].mandarin)
        } else if (e.code === "Digit7") {
            selectChinese(suggestions[6].mandarin)
        } else if (e.code === "Digit8") {
            selectChinese(suggestions[7].mandarin)
        } else if (e.code === "Digit9") {
            selectChinese(suggestions[8].mandarin)
        }
      }
    });
    return () => subscription.unsubscribe()
  }, [variableString])
  
  const continueChinese = async (e) => {
    console.log(e)

    let text = e.target.value

    const latestNonEnglish = determineConstantVariableSplit(text)
    setConstantString(text.slice(0,latestNonEnglish))
    const varStr = text.slice(latestNonEnglish)
    setVariableString(varStr)

    if (isEnglish(varStr) && varStr !== " ") {
      setSuggestions(generateSuggestions())
    }
    if (!text) {
      setSuggestions([])
    }

    if (numbersAllowed) {
      setFullString(text)
    }

    console.log(`TEXT: `, text)
    console.log(`CONSTANT: `, text.slice(0,latestNonEnglish))
    console.log(`VARIABLE: `, text.slice(latestNonEnglish))
  }

  const selectChinese = (chineseText) => {
    let newText = `${constantString}${variableString[0] === " " ? " " : ""}${chineseText}`
    console.log('newText: ', newText)
    setFullString(newText)
    setConstantString(`${constantString}${chineseText}`)
    setVariableString("")
    setNumbersAllowed(false)
    setTimeout(() => {
      setNumbersAllowed(true)
      setSuggestions([])
    },100)
    document.getElementById("input-bar").focus()
  }

  return (
    <div className="App">
      <Helmet>
          <meta charSet="utf-8" />
          <title>Chinglish Keyboard</title>
          <link rel="shortcut icon" type="image/png" href="https://www.emojimeaning.com/img/img-facebook-64/1f472.png"/>
      </Helmet>
      <header className="App-header">
        <PredictionBar wordString={variableString} selectChinese={selectChinese} suggestions={suggestions} />
        <br/>
        <Input
          id="input-bar"
          placeholder="Type Pinyin..."
          style={{ fontSize: '16px', padding: '10px', width: '500px', position: 'absolute', bottom: '50px', left: '30vw' }}
          value={fullString}
          onChange={(e) => continueChinese(e)}
        />
      </header>
    </div>
  );
}

export default App;