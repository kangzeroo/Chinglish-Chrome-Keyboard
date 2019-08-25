import React, { useState , useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import PredictionBar from './components/PredictionBar'
import getType from 'pinyin-or-hanzi'
import { Helmet } from 'react-helmet'
import { Input } from 'antd'

const App = () => {

  const [fullString, setFullString] = useState("")
  const [decidedString, setDecidedString] = useState("")
  const [decidingString, setDecidingString] = useState("")

  const continueChinese = (e) => {
    const text = e.target.value
    setFullString(text)
    const undecidedPosition = decidedString.length
    setDecidingString(text.slice(undecidedPosition))
    console.log(text.slice(undecidedPosition))
  }

  const selectChinese = (chineseText) => {
    setFullString(`${decidedString}${chineseText}`)
    setDecidedString(`${decidedString}${chineseText}`)
    setDecidingString("")
    document.getElementById("input-bar").focus()
  }

  return (
    <div className="App">
      <Helmet>
          <meta charSet="utf-8" />
          <title>Chinglish</title>
      </Helmet>
      <header className="App-header">
        <PredictionBar wordString={decidingString} selectChinese={selectChinese} />
        <br/>
        <Input
          id="input-bar"
          placeholder="Type Pinyin..."
          style={{ fontSize: '16px', padding: '10px', width: '500px' }}
          value={fullString}
          onChange={(e) => continueChinese(e)}
        />
      </header>
    </div>
  );
}

export default App;