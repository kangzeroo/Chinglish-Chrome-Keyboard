import React from 'react'

const PredictionBar = ({ wordString, selectChinese, suggestions }) => {
    return (
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            {
                suggestions.map((word, idx) => (
                    <div key={word.id} onClick={() => selectChinese(word.mandarin)} style={{ padding: '5px 5px 5px 10px', border: '1px solid rgba(256,256,256,0.5)', cursor: 'pointer', minWidth: '100px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <span style={{ fontSize: '5px' }}>{idx + 1} &nbsp;</span>
                        <span style={{ fontSize: '20px', fontWeight: 'bold', margin: '5px' }}>{word.mandarin}</span>
                        <span style={{ fontSize: '10px', fontWeight: 'bold', margin: '5px' }}>{word.english}</span>
                    </div>
                ))
            }
            {
                suggestions.length === 0
                ?
                <img src="https://www.fluentu.com/blog/chinese/wp-content/uploads/2016/05/learn-chinese-facebook-1.png" style={{ width: '250px', height: 'auto' }} />
                :
                null
            }
        </section>
    )
}

export default PredictionBar;