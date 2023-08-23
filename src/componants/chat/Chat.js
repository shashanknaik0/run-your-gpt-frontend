import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import './Chat.css';

const Chat = () => {
    const [socketUrlHost, setSocketUrlHost] = useState('wss://sample');
    const [response, setResponse] = useState("");
    var dummy=[
        {
            user_input: "React Hook useCallback has missing dependencies: 'request' and 'sendJsonMessage'. Either include them or remove the dependency array", 
            response : "React Hook useCallback has missing dependencies: 'request' and 'sendJsonMessage'. Either include them or remove the dependency array React Hook useCallback has missing dependencies: 'request' and 'sendJsonMessage'. Either include them or remove the dependency array React Hook useCallback has missing dependencies: 'request' and 'sendJsonMessage'. Either include them or remove the dependency array"
        },
        {
            user_input: "React Hook useCallback has missing dependencies: 'request' and 'sendJsonMessage'. Either include them or remove the dependency array", 
            response : "React Hook useCallback has missing dependencies: 'request' and 'sendJsonMessage'. Either include them or remove the dependency array React Hook useCallback has missing dependencies: 'request' and 'sendJsonMessage'. Either include them or remove the dependency array React Hook useCallback has missing dependencies: 'request' and 'sendJsonMessage'. Either include them or remove the dependency array"
        },
        {
            user_input: "React Hook useCallback has missing dependencies: 'request' and 'sendJsonMessage'. Either include them or remove the dependency array", 
            response : "React Hook useCallback has missing dependencies: 'request' and 'sendJsonMessage'. Either include them or remove the dependency array React Hook useCallback has missing dependencies: 'request' and 'sendJsonMessage'. Either include them or remove the dependency array React Hook useCallback has missing dependencies: 'request' and 'sendJsonMessage'. Either include them or remove the dependency array"
        },
        {
            user_input: "React Hook useCallback has missing dependencies: 'request' and 'sendJsonMessage'. Either include them or remove the dependency array", 
            response : "React Hook useCallback has missing dependencies: 'request' and 'sendJsonMessage'. Either include them or remove the dependency array React Hook useCallback has missing dependencies: 'request' and 'sendJsonMessage'. Either include them or remove the dependency array React Hook useCallback has missing dependencies: 'request' and 'sendJsonMessage'. Either include them or remove the dependency array"
        },
        {
            user_input: "React Hook useCallback has missing dependencies: 'request' and 'sendJsonMessage'. Either include them or remove the dependency array", 
            response : "React Hook useCallback has missing dependencies: 'request' and 'sendJsonMessage'. Either include them or remove the dependency array React Hook useCallback has missing dependencies: 'request' and 'sendJsonMessage'. Either include them or remove the dependency array React Hook useCallback has missing dependencies: 'request' and 'sendJsonMessage'. Either include them or remove the dependency array"
        },
    ]
    const [previouseReasponse, setPreviouseReasponse] = useState(dummy)

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(socketUrlHost);

    useEffect(() => {
        if (lastJsonMessage !== null) {
            if(lastJsonMessage.event === 'text_stream'){
                setResponse(lastJsonMessage.history.visible[0][1])
            }else if(lastJsonMessage.event==='stream_end'){
                console.log(previouseReasponse)
                setPreviouseReasponse( pre =>[...pre, {user_input: userInput, response : response}])
                console.log(previouseReasponse)
                setResponse("")
                setUserInput("")
            }
        }
    }, [lastJsonMessage]);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    const [userInput, setUserInput] = useState("")
    var history = {'internal': [], 'visible': []}
    
    var request = {
        'user_input': userInput,
        'max_new_tokens': 250,
        'auto_max_new_tokens': false,
        'history': history,
        'mode': 'instruct', 
        'character': 'Example',
        'instruction_template': 'Vicuna-v1.1',
        'your_name': 'You',
        //'name1': 'name of user', 
        //'name2': 'name of character', 
        //'context': 'character context', 
        //'greeting': 'greeting', 
        //'name1_instruct': 'You', 
        //'name2_instruct': 'Assistant', 
        //'context_instruct': 'context_instruct', 
        //'turn_template': 'turn_template', 
        'regenerate': false,
        '_continue': false,
        'chat_instruct_command': 'Continue the chat dialogue below. Write a single reply for the character "<|character|>".\n\n<|prompt|>',
        'preset': 'None',
        'do_sample': true,
        'temperature': 0.7,
        'top_p': 0.1,
        'typical_p': 1,
        'epsilon_cutoff': 0,
        'eta_cutoff': 0,
        'tfs': 1,
        'top_a': 0,
        'repetition_penalty': 1.18,
        'repetition_penalty_range': 0,
        'top_k': 40,
        'min_length': 0,
        'no_repeat_ngram_size': 0,
        'num_beams': 1,
        'penalty_alpha': 0,
        'length_penalty': 1,
        'early_stopping': false,
        'mirostat_mode': 0,
        'mirostat_tau': 5,
        'mirostat_eta': 0.1,
        'guidance_scale': 1,
        'negative_prompt': '',
        'seed': -1,
        'add_bos_token': true,
        'truncation_length': 2048,
        'ban_eos_token': false,
        'skip_special_tokens': true,
        'stopping_strings': []
    }
    
    const handleClickSendMessage = useCallback(() => {
        setUserInput(document.getElementById('user-input').value)
        sendJsonMessage(request)
    }, []);
    const handleReconnect = () =>{
        setSocketUrlHost(document.getElementById('socketURLHost').value)
    }
    return (
        <div className='body'>
            <div className='info'>
                <b id="status">The WebSocket is currently {connectionStatus}</b>
                <div>
                    {/* for our convinience */}
                    <input id="socketURLHost" type="text" placeholder='Enter socketURLHost'/>
                    <button id="reconnect" onClick={handleReconnect}>
                        Reconnect
                    </button>
                </div>
            </div>
            
            <div className='interactions'>
                {previouseReasponse.map((data, idx) => (
                    <div className='message-block' key={idx}>
                        <div className='user-input'>{data.user_input}</div>
                        <pre className='response'>{data.response}</pre>
                    </div>
                ))}
                {(userInput !== "")?(
                    <>
                        <div className='user-input'>{userInput}</div>
                        <pre className='response'>{response}</pre>
                    </>
                ):("")}
            </div>

            <div className='input'>
                <input id="user-input" type="text" placeholder='Ask me anything'/>
                <button
                    id='send'
                    onClick={handleClickSendMessage}
                    disabled={readyState !== ReadyState.OPEN}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chat;