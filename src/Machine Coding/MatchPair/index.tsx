import { useState } from "react";



export default function MatchPair() {
    const initialEmojis = ['❤️', '🍀', '🌎', '🍎', '⚽️', '🚗', '⛵️', '💎'];
    const [emojis, setEmojis] = useState([...initialEmojis, ...initialEmojis])
    const [selectedEmojis, setSelectedEmojis] = useState<number[]>([])
    const [moves, setMoves] = useState(0)

    const HandleShuffle = (index) => {
        
        const copyEmoji = [...emojis]
        for(let i = copyEmoji.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i + 1);
            [copyEmoji[i], copyEmoji[j]] = [copyEmoji[j], copyEmoji[i]]
        }
        setEmojis(copyEmoji)
        setSelectedEmojis([index])
        setMoves(prev => prev + 1)

    }

    const HandleEmojiClick = (index) => {
        if(selectedEmojis.length < 2 ) {
            if(emojis[index] === emojis[selectedEmojis[0]]) {
                setSelectedEmojis([...selectedEmojis,index])
                setMoves(0)
                console.log('Match Found')
            } else {  
                setSelectedEmojis([...selectedEmojis,index])
            }
        } else {
            HandleShuffle(index)        
        }
    }


    console.log(emojis)
    return (
        <div style={{ width: '30%', margin: 'auto', marginTop: '80px', textAlign: 'center' }}>
            <h1>Match Pair Game</h1>
            <div style={{ display: 'flex', flexFlow: 'wrap', justifyContent: 'space-between', marginTop:'10px' }}>
                {
                    emojis.map((item, index) => (
                        <div 
                        key={index}
                        style={{ width: '80px', height: '80px', margin: '5px', backgroundColor: 'lightGray', borderRadius:'12px' }}
                        onClick={() =>HandleEmojiClick(index)}
                        >
                            <span
                                style={{ alignItems: 'center', fontSize: '35px' }}
                            >{selectedEmojis.includes(index) ? item : ''}
                            </span>
                        </div>
                    ))
                }
            </div>
            <div>Moves : {moves}</div>
            <button onClick={() => setSelectedEmojis([])}>Reset</button>
            <div style={{width:'400px', height:'150px',border:'2px solid green',borderRadius:'20px',textAlign:'center'}}>
                <h2>Match Found on {moves} move </h2>
            </div>
        </div>
    )
}