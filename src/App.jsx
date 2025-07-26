import { useState, useCallback, useEffect, useRef} from 'react'

function App() {
  const [length, setLenght] = useState(0)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) {
      str = str + "0123456789"
    }
    if (charAllowed) {
      str = str + "!@#$%^&*();`~"
    }

    // if(numberAllowed) str += "0123456789"
    // if(charAllowed) str += "!@#$%^&*()_-+=[]{}~`"

    //useRef hook
    // const passwordRef = useRef(null)

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
    },[length,numberAllowed,charAllowed, setPassword])

    useEffect(() => {
      passwordGenerator();
    },
  [length, numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
      <h1 className='text-4xl text-center text-white'>PassWord Generator</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-3 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3 text-3xl'>Password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 bg-amber-50'>
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          // ref={passwordRef} 
          />
          <button  className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min = {6}
            max={40}
            value={length} 
            className='cursor-pointer' 
            onChange={(e) => {setLenght(e.target.value)}}
             />
            <label>Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
             />
            <label htmlFor='numberInput'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={charAllowed}
            id='characterInput'
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
             />
            <label htmlFor='characterInput'>Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
