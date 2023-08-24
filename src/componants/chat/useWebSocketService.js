import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const useWebSocketService=()=>{
    const [socketUrlHost, setSocketUrlHost] = useState('sample');
    const [response, setResponse] = useState("");
    const [userInput, setUserInput] = useState("")
    const [previouseReasponse, setPreviouseReasponse] = useState([])
    
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket("wss://" + socketUrlHost + "/api/v1/chat-stream");
    useEffect(() => {
        if (lastJsonMessage !== null) {
            if (lastJsonMessage.event === 'text_stream') {
                setResponse(lastJsonMessage.history.visible[0][1])
            } else if (lastJsonMessage.event === 'stream_end') {
                setPreviouseReasponse(pre => [...pre, { user_input: userInput, response: response }])
                setResponse("")
                setUserInput("")
            }
        }
        var scrollDiv = document.getElementById("interactions");
        scrollDiv.scrollTop = scrollDiv.scrollHeight;
    }, [lastJsonMessage, setResponse]);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];
    const statusColor = {
        Connecting: "orange",
        Open: "green",
        Closing: "blue",
        Closed: "red",
        Uninstantiated: "red"
    }

    var history = { 'internal': [], 'visible': [] }

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

    const handleClickSendMessage = useCallback((event) => {
        let form = event.target
        event.preventDefault();
        setUserInput(form.userinput.value)
        request['user_input'] = form.userinput.value
        form.userinput.value = ""
        sendJsonMessage(request)
    }, []);

    const handleReconnect = (event) => {
        let form = event.target
        event.preventDefault();
        setSocketUrlHost(form.host.value)
    }

    return {
        handleReconnect: handleReconnect,
        handleClickSendMessage: handleClickSendMessage,
        statusColor:statusColor,
        connectionStatus:connectionStatus,
        ReadyState:ReadyState,
        readyState:readyState,
        response:response,
        previouseReasponse:previouseReasponse,
        userInput:userInput,
    }
}

export default useWebSocketService;