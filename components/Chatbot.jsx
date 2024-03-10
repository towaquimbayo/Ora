import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  LucideMessageCircle,
  LucideMessageCircleOff,
  LucideSendHorizontal,
} from "lucide-react";

function ChatBot() {
  const sampleData = [
    {
      from: "bot",
      text: "Hi Asmerelda, last time you had issues with understanding the four chambers of the heart, is that clearer now?",
    },
    {},
    {
      from: "bot",
      text: "The left atrium receives oxygen-rich blood from the lungs and passes it to the left ventricle. The left ventricle then pumps this oxygenated blood out to the body through the aorta.",
    },
    {},
    {
      from: "bot",
      text: "You're welcome! If you have any more questions or need further assistance, feel free to ask.",
    },
  ];

  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [botTyping, setBotTyping] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const inputRef = useRef(null);

  console.log(messages);

  const updateChat = (message) => {
    if (!message.trim()) return;
    setMessages([...messages, { from: "user", text: message }]);
    setInputValue("");
    setBotTyping(true);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
    if (messages.length) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.from === "bot") {
        // Focus the input field after bot responds
        inputRef.current.focus();
        return;
      }
    }

    setTimeout(() => {
      setBotTyping(false);
      setMessages([...messages, sampleData[messages.length]]);
    }, 2000);
  }, [messages]);

  useEffect(() => {
    document.querySelector("#messages").scrollTop =
      document.querySelector("#messages").scrollHeight;
  }, [messages]);

  return (
    <div
      className={`flex-1 p-0 justify-between h-[75vh] mt-10  max-sm:w-5/6 w-full max-w-2xl flex flex-col gap-7 fixed ${
        isChatOpen ? "glassmorphism max-sm:bg-white" : ""
      }`}
    >
      <button
        onClick={toggleChat}
        className="absolute bottom-5 right-5 bg-blue-500 text-white px-4 py-3  rounded-full focus:outline-none"
      >
        {!isChatOpen ? (
          <LucideMessageCircle size={18} />
        ) : (
          <LucideMessageCircleOff size={18} />
        )}
      </button>
      <div className={`${isChatOpen ? "block" : "hidden"} h-3/4`}>
        <div
          id="messages"
          className="flex flex-col space-y-4 p-3 h-full overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch  overflow-x-hidden"
        >
          {messages.map((message, key) => (
            <div key={key}>
              <div
                className={`flex items-end ${
                  message.from === "bot" ? "" : "justify-end"
                }`}
              >
                <div
                  className={`flex flex-col space-y-2 text-md leading-tight max-w-lg mx-2 ${
                    message.from === "bot"
                      ? "order-2 items-start"
                      : "order-1 items-end"
                  }`}
                >
                  <div>
                    <span
                      className={`px-4 py-3 rounded-xl inline-block ${
                        message.from === "bot"
                          ? "rounded-bl-none bg-white text-gray-600"
                          : "rounded-br-none bg-blue-500 text-white"
                      }`}
                    >
                      {message.text}
                    </span>
                  </div>
                </div>
                <Image
                  src={
                    message.from === "bot"
                      ? "https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png"
                      : session.user.image
                  }
                  alt=""
                  className="w-6 h-6 rounded-full"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          ))}
          <div style={{ display: botTyping ? "flex" : "none" }}>
            <div>
              <div className={`flex items-end`}>
                <Image
                  src={
                    "https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png"
                  }
                  alt=""
                  className="w-6 h-6 rounded-full"
                  width={24}
                  height={24}
                />

                <div
                  className={`flex flex-col space-y-2 text-md leading-tight max-w-lg mx-2 'order-2 items-start'`}
                >
                  <div>
                    <span
                      className={`px-4 py-3 rounded-xl inline-block 'rounded-bl-none bg-white text-gray-600'`}
                    >
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
            <input
              type="text"
              placeholder={
                botTyping ? "Wait for bot's response..." : "Say something..."
              }
              autoComplete="off"
              autoFocus="true"
              value={inputValue}
              disabled={botTyping}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateChat(inputValue);
                }
              }}
              ref={inputRef}
              className="text-md w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 pr-16 bg-white border border-gray-200 focus:border-blue-500 rounded-full py-2"
            />
            <div className="absolute right-2 items-center inset-y-0 hidden sm:flex">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-8 w-8 transition duration-200 ease-in-out text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                onClick={() => updateChat(inputValue)}
              >
                <LucideSendHorizontal size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
