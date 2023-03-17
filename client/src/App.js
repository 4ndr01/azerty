import "./App.css";
import React, { Component } from "react";
import Switch from "react-switch";
import io from "socket.io-client";
import {useEffect, useState} from "react";
import {BrowserRouter, Link, Route} from 'react-router-dom';
import darkMode from '../src/darkMode.css';
import Login from "./route/login";
const socket = io("http://localhost:3001");



function App() {




    Login.data = JSON.parse(localStorage.getItem('token'))




    const [roomName, setRoomName] = useState('');
    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value);

    }
    const [messages, setMessages] = useState([]);

    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        if (isDarkTheme) {
            document.documentElement.classList.add('dark-theme');
        } else {
            document.documentElement.classList.remove('dark-theme');
        }
    }, [isDarkTheme]);

    function toggleDarkTheme() {
        setIsDarkTheme(!isDarkTheme);
    }

    function setNewMessage(msg) {
        setMessages([
            ...messages,
            msg
        ]);
    }

    socket.on('TEST_MSG', msg => {
        setNewMessage(msg);
    });

    function sendMessage(e, message) {
        e.preventDefault();
        //cas d'erreur
        if (e.target.username.value === '' || e.target.text.value === '') {
            alert("Veuillez remplir tous les champs")
            //n'envoie pas le message
            return;
        }

        const msg = {
            username: e.target.username.value,
            text: e.target.text.value
        };
        socket.emit('CLIENT_MSG', msg);

    }






    return (

        <div className="App">
            <div className="row">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="wrapper">
                                <h1>Application</h1>
                                <h2>Bonjour {Login.data}</h2>
                                <a href={"/profil"}>Profil</a>
                                <a href="/signup">Login</a>
                                <div className="room">
                                    <input type="text" placeholder="Room name" value={roomName} onChange={handleRoomNameChange} className={"input_room"}/>
                                </div>
                                <button className="theme-button" onClick={toggleDarkTheme}>Theme</button>
                                <Link to={`${roomName}`} className="enter-room-button">Join Room</Link>


                            </div>
                            <div className="card-title">My first chat</div>
                            <hr/>
                            <div className="messages">
                                {messages.map(msg => {
                                    return (
                                        <div>{msg.username}: {msg.text}</div>


                                    )
                                })}
                            </div>
                        </div>
                        <form onSubmit={e => sendMessage(e)}>
                            <div className="card-footer">
                                <input id="username"
                                       type="text"
                                       placeholder="Username"
                                       className="form-control"
                                />
                                <br/>
                                <input id="text"
                                       type="text"
                                       placeholder="Your message"
                                       className="form-control"
                                />
                                <br/>
                                <button type="submit"
                                        className="submit">
                                    send
                                </button>
                                <button>
                                    gif
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <style jsx="true">{`
                .App {
                    text-align: center;
                    
                }
                .card {
                    margin-top: 20px;
                    background-color: #f5f8fa;
                    border: none;
                    
                }
                .card-body {
                    padding: 30px;
                    text-align: left;
                    
                }
                .card-title {
                    font-weight: bold;
                    font-size: 30px;
                    color: #172b4d;
                    
                }
                .card-footer {
                    padding: 0 30px 30px 30px;
                    border-bottom-left-radius: 3px;
                    border-bottom-right-radius: 3px;
                    
                }
                .messages {
                    height: 300px;
                    overflow-y: scroll;
                    margin-bottom: 20px;
                  
                }
                .wrapper {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    
                    background: #f5f5f5;
                    
                }
                .wrapper h1 {
                    font-size: 2rem;
                    font-weight: 400;
                    margin-bottom: 1rem;
                    
                }
                .wrapper form {
                    width: 100%;
                    max-width: 300px;
                    padding: 15px;
                    margin: 0 auto;
                    
                }
                button {
                    background: black;
                    border: none;
                    color: #fff;
                    padding: 0.5rem 1rem;
                    border-radius: 0.25rem;
                    cursor: pointer;
                    margin-top: 1rem;
                    
                }
                input {
                    width: 100%;
                    padding: 0.5rem;
                    margin-top: 1rem;
                    border: 1px solid #ccc;
                    border-radius: 0.25rem;
                    
                }
                
            `}</style>
        </div>
    );


}
export default App;
