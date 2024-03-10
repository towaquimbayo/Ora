import React, {useEffect, useRef, useState} from 'react';
import {useSession} from "next-auth/react";
import {LucideMessageCircle, LucideMessageCircleOff, LucideSendHorizontal} from "lucide-react";

function ChatBot() {
    const {data: session} = useSession();
    const [messages, setMessages] = useState([{
        from: 'bot',
        text: 'Hello world!'
    }]);
    const [botTyping, setBotTyping] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(true);

    const updateChat = (message) => {
        if (!message.trim()) return
        setMessages([...messages, {from: 'user', text: message}]);
        setInputValue('');
        setBotTyping(true);

    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.from === 'bot') return;

        setTimeout(() => {
            setBotTyping(false);
            setMessages([...messages, {from: 'bot', text: 'Bot response here'}]);
        }, 2000);

    }, [messages]);


    useEffect(() => {
        document.querySelector('#messages').scrollTop = document.querySelector('#messages').scrollHeight
    }, [messages])

    return (
        <div
            className={`flex-1 p-2 sm:p-6 justify-between h-[75vh] mt-10 w-full max-w-2xl flex flex-col gap-7 fixed ${isChatOpen ? 'glassmorphism' : ''}`}>
            <button onClick={toggleChat}
                    className="absolute bottom-2 right-2 bg-blue-500 text-white px-4 py-3  rounded-full focus:outline-none">
                {!isChatOpen ? <LucideMessageCircle size={18}/> : <LucideMessageCircleOff size={18}/>
                }
            </button>
            <div className={`${isChatOpen ? 'block' : 'hidden'} h-3/4`}>
                <div id="messages"
                     className="flex flex-col space-y-4 p-3 h-full overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"

                >
                    {messages.map((message, key) => (
                        <div key={key}>
                            <div className={`flex items-end ${message.from === 'bot' ? '' : 'justify-end'}`}>
                                <div
                                    className={`flex flex-col space-y-2 text-md leading-tight max-w-lg mx-2 ${message.from === 'bot' ? 'order-2 items-start' : 'order-1 items-end'}`}>
                                    <div>
                                    <span
                                        className={`px-4 py-3 rounded-xl inline-block ${message.from === 'bot' ? 'rounded-bl-none bg-gray-100 text-gray-600' : 'rounded-br-none bg-blue-500 text-white'}`}>
                                        {message.text}
                                    </span>
                                    </div>
                                </div>
                                <img
                                    src={message.from === 'bot' ? 'https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png' : session.user.image}
                                    alt="" className="w-6 h-6 rounded-full"/>
                            </div>
                        </div>
                    ))}
                    <div style={{display: botTyping ? 'flex' : 'none'}}>
                        <div>
                            <div className={`flex items-end`}>
                                <img
                                    src={'https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png'}
                                    alt="" className="w-6 h-6 rounded-full"/>
                                <div
                                    className={`flex flex-col space-y-2 text-md leading-tight max-w-lg mx-2 'order-2 items-start'`}>
                                    <div>
                                    <span
                                        className={`px-4 py-3 rounded-xl inline-block 'rounded-bl-none bg-gray-100 text-gray-600'`}>
                                        {"...."}
                                    </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                    <div className="relative flex">
                        <input type="text" placeholder="Say something..." autoComplete="off" autoFocus="true"
                               value={inputValue}
                               onChange={(e) => setInputValue(e.target.value)}
                               onKeyDown={(e) => {
                                   if (e.key === 'Enter') {
                                       updateChat(inputValue);
                                   }
                               }}
                               className="text-md w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 pr-16 bg-gray-100 border-2 border-gray-200 focus:border-blue-500 rounded-full py-2"/>
                        <div className="absolute right-2 items-center inset-y-0 hidden sm:flex">
                            <button type="button"
                                    className="inline-flex items-center justify-center rounded-full h-8 w-8 transition duration-200 ease-in-out text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                                    onClick={() => updateChat(inputValue)}>
                                <LucideSendHorizontal size={18}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatBot;
