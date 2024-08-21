import { useState,useCallback,useEffect,useRef } from 'react'

import './App.css'

function App() {
  const [Password, setpassword] = useState('')
  const [length,setlength] = useState(8)
  const [numberallow , setnumberallow] =useState(false)
  const [Special,setspecial] =useState(false)

      const passwordRef = useRef(null)

     const passwordgenerator = useCallback(()=>{
              let pass='';
              let str ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
              if(numberallow){
                 str= str + "0123456789"
              }
              if(Special){
                str=str + "!@#$%^&*()_+"
              }

             for(let i=0;i<length;i++){
                const s = Math.floor(Math.random() * str.length)
                  pass += str.charAt(s)
             } 

             setpassword(pass)
     },[length,numberallow,Special])

    useEffect(()=>{
      passwordgenerator();
    },[length,Special,numberallow])


    function copytoclipboard(){
      window.navigator.clipboard.writeText(Password)
      passwordRef.current?.select()
    }

  return (
    <div style={{
      margin: '0',
      padding: '0',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'black'
    }}>
      <div style={{
        width: '600px',
        height: '300px',
        border: '1px black solid',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '10px',
        backgroundColor: 'lightgrey'
      }}>
        <div style={{
          marginTop: '20px',
          fontSize: '2rem'
        }}>Password generator</div>
        <div>
          <input
            style={{
              width: '300px',
              marginTop: '20px',
              padding: '5px',
              borderTopLeftRadius: '5px',
              borderBottomLeftRadius: '5PX',
              borderRight: 'none'
            }}
            type="text"
            value={Password}
            name=""
            id=""
            placeholder='Password'
            ref={passwordRef}
            readOnly/>
          <button
            style={{
              backgroundColor: 'blue',
              fontSize: '0.8rem',
              fontWeight: 'bolder',
              padding: '6px',
              borderTopRightRadius: '5px',
              borderBottomRightRadius: '5px',
              borderLeft: 'none',
              color:'white'
            }}
            onClick={copytoclipboard}>Copy</button>
        </div>
        <div style={{
          marginTop: '20px'
        }}>
          <input
            style={{
              width: '100px'
            }}
            type="range"
            min={'6'}
            max={'30'}
            name="length"
            id=""
            onChange={(e)=>{
               setlength(e.target.value)
            }}
          />
          <label htmlFor="number">length:{length}</label>
        </div>
         <div style={{
          marginTop:'10px'
         }}>
          <input 
          type="checkbox" 
          name="number" 
          id="" 
          style={{
            marginTop:'10px'
           }}
           defaultChecked={numberallow}
           onChange={()=>{
            setnumberallow(prev=> !prev)
           }}
          />
          <label htmlFor="">Number Allowed</label>
         </div>
         <div style={{
          marginTop:'10px'
         }}>
          <input 
          type="checkbox" 
          name="char" 
          id=""
          defaultChecked={Special}
          onChange={()=>{
            setspecial(prev => !prev)
           }} />
          <label htmlFor="">Special Charecter</label>
         </div>
      </div>
    </div>
  )
}

export default App
