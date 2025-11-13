
import React, {useState} from 'react'
import axios from 'axios'

export default function App(){
  const [smiles, setSmiles] = useState('c1ccccc1')
  const [pred, setPred] = useState(null)

  async function doPredict(){
    try{
      const r = await axios.post('http://127.0.0.1:8000/predict', {smiles})
      setPred(r.data)
    }catch(e){ alert('Predict failed: '+e) }
  }

  function openKetcher(){
    const ketcherUrl = 'https://ketcher.surfteams.org/';
    window.open(ketcherUrl, 'ketcher','width=1000,height=700')
    alert('Ketcher opened in a new window. Draw and export SMILES, then paste into the input.')
  }

  return (
    <div style={{maxWidth:900, margin:'2rem auto'}}>
      <h1>MolProp — React + Ketcher</h1>
      <textarea value={smiles} onChange={e=>setSmiles(e.target.value)} style={{width:'100%',height:120}} />
      <div style={{display:'flex', gap:8, marginTop:8}}>
        <button onClick={doPredict}>Predict</button>
        <button onClick={openKetcher}>Open Ketcher</button>
      </div>
      <section><h3>Prediction</h3><pre>{JSON.stringify(pred,null,2)}</pre></section>
    </div>
  )
}
