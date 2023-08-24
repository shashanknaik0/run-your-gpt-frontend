import { useEffect, useState } from 'react';
import './Chat.css';
import useWebSocketService from './useWebSocketService';
import chatService from './chatService';
import Cookies from "universal-cookie";

const Chat = ({setAuthenticated}) => {
    const { 
        handleReconnect,
        handleClickSendMessage,
        statusColor,
        connectionStatus,
        ReadyState,
        readyState,
        response,
        previouseReasponse,
        userInput,
        setPreviouseReasponse
    } = useWebSocketService();

    useEffect(()=>{
        chatService.getMessage().then((response)=>{
            setPreviouseReasponse(response.data)
        })
    },[])

    const cookies = new Cookies();
    const handleLogout = () => {
        cookies.remove("isloggedin")
        cookies.remove("uname")
        setAuthenticated(false)
        chatService.logout()
    }
    return (
        <div className='body'>
            <div className='info'>
                <div className='hover'>
                    <div id='logout' onClick={handleLogout}>
                        logout
                    </div>
                </div>
                <b id="status" style={{ color: statusColor[connectionStatus] }}>The WebSocket is currently {connectionStatus}</b>
                <div onSubmit={handleReconnect}>
                    {/* for our convinience */}
                    <form >
                        <input id="socketURLHost" type="text" name='host' placeholder='sample.trycloudflare.com' />
                        <button id="reconnect">
                            Reconnect
                        </button>
                    </form>
                </div>  
            </div>

            <div className='interactions' id='interactions'>
                {previouseReasponse.map((data, idx) => (
                    <div className='message-block' key={idx}>
                        <div className='user-input'>{data.user_input}</div>
                        <pre className='response'>{data.response}</pre>
                    </div>
                ))}
                {(userInput !== "") ? (
                    <>
                        <div className='user-input'>{userInput}</div>
                        <pre className='response'>{response}</pre>
                    </>
                ) : ("")}
            </div>

            <div className='input'>
                <form onSubmit={handleClickSendMessage}>
                    <input id="user-input" type="text" name='userinput' placeholder='Ask me anything' />
                    <button
                        id='send'
                        style={{ backgroundColor: statusColor[connectionStatus] }}
                        disabled={connectionStatus !== 'Open'}
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Chat;