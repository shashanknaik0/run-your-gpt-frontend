import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const Chat = () => {
    const [socketUrl, setSocketUrl] = useState( 'wss://couple-portsmouth-devoted-stomach.trycloudflare.com/api/v1/chat-stream');
    const [response, setResponse] = useState("");
    const [previouseReasponse, setPreviouseReasponse] = useState([])

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl);

    useEffect(() => {
        if (lastJsonMessage !== null) {
            if(lastJsonMessage.event == 'text_stream'){
                setResponse(lastJsonMessage.history.visible[0][1])
            }else if(lastJsonMessage.event=='stream_end'){
                console.log(previouseReasponse)
                setPreviouseReasponse( pre =>[...pre, {user_input: user_input, response : response}])
                console.log(previouseReasponse)
                setResponse("")
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

    var user_input = "Please give me a step-by-step guide on how to plant a tree in my backyard.)"
    var history = {'internal': [], 'visible': []}
    
    var request = {
        'user_input': user_input,
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
    
    const handleClickSendMessage = useCallback(() => sendJsonMessage(request), []);

    return (
        <div className='body'>
            <div className='info'>
                <span id="status">The WebSocket is currently {connectionStatus}</span>
                <div>
                    {/* for our convinience */}
                    <input id="socketURL" placeholder='Enter socketURL'/>
                    <button id="reconnect" onClick={()=>setSocketUrl(document.getElementById('socketURL').value)}>
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
                <pre className='response'>{response}</pre>
            </div>

            <div className='input'>
                <input id="user-input" placeholder='Ask me anything'/>
                <button
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