import { useState, useEffect } from 'react'
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');  // API 응답 메시지를 저장할 상태 변수

    // 컴포넌트 마운트 시 백엔드 API 호출
    useEffect(() => {
        axios.get('/api/hello')  // 백엔드의 /api/hello API 호출
            .then((response) => {
                console.log('API 응답:', response.data);  // 응답 데이터를 콘솔에 출력
                setMessage(response.data);  // 응답 메시지를 상태에 저장
            })
            .catch((error) => {
                console.error('API 호출 에러:', error);  // 에러 발생 시 출력
            });
    }, []);  // 빈 배열로 설정하여 컴포넌트 마운트 시에만 호출

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

        {/* 백엔드에서 받은 응답 메시지 표시 */}
        <div>
            <h2>백엔드 메시지:</h2>
            <p>{message}</p>  {/* API 응답 메시지를 화면에 출력 */}
        </div>


    </>
  )
}

export default App
