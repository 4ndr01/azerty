import react, {useState} from "react";
import useChat from "../useChat";
function ChatRoom(props){

    const {roomId} = props.match.params;
    const handleNewMessageChange = (e) => {
        setNewMessage(e.target.value);
    }
    const handleSendMessage = () => {
        setNewMessage(newMessage);
        setNewMessage("")
    }
    const [messages, sendMessage] = useChat(roomId);

    const [newMessage, setNewMessage] = useState("");
    return(
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-12"}>
                    <div className={"card"}>
                        <div className={"card-body"}>
                            <div className={"wrapper"}>
                                <h1>Room :{roomId}</h1>
                                <div className={"messages"}>
                                    <ol className={"message-list"}>
                                        {messages.map((message, i) => (
                                            <li>

                                                <p className={"message-text"}>{message.body}</p>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                                <div className={"send-message-form"}>
                                   <textarea
                                       value={newMessage}
                                        onChange={handleNewMessageChange}
                                        placeholder={"Type your message here..."}
                                        className={"new-message-input-field"}></textarea>
                                    <button onClick={handleSendMessage} className={"send-message-button"}>Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>





    )
}

export default ChatRoom;