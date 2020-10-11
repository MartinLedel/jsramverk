import React, { useState, useEffect, useRef } from 'react';
import { Button, InputGroup, FormControl } from "react-bootstrap";
import io from 'socket.io-client';

let socket;
export const SocketChat = () => {
    const chatBox = useRef(null);
    const [chatData, setChatData] = useState({
        message: '',
        user: '',
        isConnected: false,
    });

    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        socket = io('https://socket-server.ml-jsramverk.me');
    }, []);

    useEffect(() => {
        socket.on('chat message', function (data) {
            setChatMessages(data);
        });

        socket.on('user broadcast', function (data) {
            setChatMessages(data);
            setChatData({
                ...chatData,
                isConnected: true,
            });
        });
    }, [chatMessages, chatData]);

    const savingMessage = event => {
        setChatData({
            ...chatData,
            message: event.target.value,
        });
    };

    const messageHandleKeyDown = event => {
        if (event.key === 'Enter') {
            sendMessage(event);
        }
    };

    const sendMessage = event => {
        event.preventDefault();
        let time = new Date();

        socket.emit('chat message', {
            message: chatData.message,
            time: time.toLocaleTimeString().slice(0, -3),
            user: chatData.user
        });
        chatBox.current.scrollTop = 1;
    };

    const savingUser = event => {
        setChatData({
            ...chatData,
            user: event.target.value,
        });
    };

    const userHandleKeyDown = event => {
        if (event.key === 'Enter') {
            saveUser(event);
        }
    };

    const saveUser = event => {
        event.preventDefault();
        let time = new Date();

        socket.emit('user connecting', {
            user: chatData.user,
            time: time.toLocaleTimeString().slice(0, -3),
        });
        sessionStorage.setItem('chatUser', chatData.user);
    };

    function validateNick() {
        return chatData.user.length > 0;
    }

    return (
        <main>
            <h1>Websocket chatt</h1>

            <h2>Messages:</h2>
            <div ref={chatBox}  className="all-messages">
                {chatMessages.map((msg, i) => (
                   <p key={i}>
                       {msg}
                   </p>
               ))}
            </div>
            {chatData.isConnected ? (
                    <InputGroup className="mb-3 new-message">
                      <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">@msg</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        aria-label="Message"
                        aria-describedby="basic-addon1"
                        onChange={savingMessage}
                        onKeyDown={messageHandleKeyDown}
                      />
                      <Button
                          block
                          onClick={sendMessage}
                          type="submit"
                      >
                          Send Message
                      </Button>
                    </InputGroup>
            ) : (
                <InputGroup className="mb-3 new-message">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">@user</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={savingUser}
                    onKeyDown={userHandleKeyDown}
                  />
                  <Button
                      block
                      disabled={!validateNick()}
                      onClick={saveUser}
                  >
                    Create nickname
                  </Button>
                </InputGroup>
            )}
        </main>
    );
};

export default SocketChat;
