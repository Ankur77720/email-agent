import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import "./Chat.css"

const Chat = () => {
    const [ messages, setMessages ] = useState([
        // {
        //     role: "user",
        //     content: "Hello, how are you?"
        // },
        // {
        //     role: "assistant",
        //     content: "I'm fine, thank you! How can I help you today?"
        // }
    ])
    const [ input, setInput ] = useState("")
    const [ socket, setSocket ] = useState(null)

    useEffect(() => {

        const tempSocket = io('http://localhost:3000')
        tempSocket.connect()

        tempSocket.on('message', (message) => {
            setMessages((prevMessages) => {
                return [
                    ...prevMessages,
                    message
                ]
            })
        })

        setSocket(tempSocket)
    }, [])


    function sendMessage() {

        socket.emit("message", { input, messages })

        setMessages((prevMessages) => {
            return [
                ...prevMessages,
                {
                    role: "user",
                    content: input
                }
            ]
        })

        setInput("")

    }


    return (

        <main className='chat-main' >

            <section className="chat-section">
                <div className="conversation-area">
                    <div className="messages">

                        {
                            messages.map((message, index) => {
                                return (
                                    <div key={index} className={`message ${message.role}`}>
                                        <div className="message-content">
                                            {message.content}
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className="input-area">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage()
                                }
                            }}
                            type="text" placeholder='Enter message' />
                        <button onClick={sendMessage}>send</button>
                    </div>
                </div>
            </section>

        </main>

    )
}

export default Chat