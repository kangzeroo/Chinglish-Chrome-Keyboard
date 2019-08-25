import React, {useEffect} from 'react'

const PredictionBar = ({ wordString, selectChinese }) => {

    const predictions = [
        {id: "1", value: '我'},
        {id: "2", value: '的'},
        {id: "3", value: '猫'},
        {id: "4", value: '喜'},
        {id: "5", value: '欢'},
        {id: "6", value: '喝'},
        {id: "7", value: '牛'},
        {id: "8", value: '奶'},
    ]

    useEffect(() => {
        document.addEventListener('keyup', (e) => {
            if (e.code === "Digit1") {
                selectChinese(predictions[0].value)
            } else if (e.code === "Digit2") {
                selectChinese(predictions[1].value)
            } else if (e.code === "Digit3") {
                selectChinese(predictions[2].value)
            } else if (e.code === "Digit4") {
                selectChinese(predictions[3].value)
            } else if (e.code === "Digit5") {
                selectChinese(predictions[4].value)
            } else if (e.code === "Digit6") {
                selectChinese(predictions[5].value)
            } else if (e.code === "Digit7") {
                selectChinese(predictions[6].value)
            } else if (e.code === "Digit8") {
                selectChinese(predictions[7].value)
            } else if (e.code === "Digit9") {
                selectChinese(predictions[8].value)
            }
        });
    }, [])
    
    return (
        <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
            {
                predictions.map((word, idx) => (
                    <div key={word.id} onClick={() => selectChinese(word.value)} style={{ padding: '5px', border: '1px solid rgba(256,256,256,0.5)', cursor: 'pointer' }}>
                        <span style={{ fontSize: '5px' }}>{idx + 1}</span>
                        <span style={{ fontSize: '20px', fontWeight: 'bold', margin: '5px' }}>{word.value}</span>
                    </div>
                ))
            }
        </section>
    )
}

export default PredictionBar;