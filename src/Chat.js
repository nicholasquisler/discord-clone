import React, { useEffect, useState } from 'react';
import './Chat.css';
import ChatHeader from './ChatHeader';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from './features/appSlice';
import { selectUser } from './features/userSlice';
import db from './firebase';
import {
    collection,
    onSnapshot,
    query,
    orderBy,
    addDoc,
    serverTimestamp
} from "firebase/firestore";

function Chat() {
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (channelId) {
            const q = query(
                collection(db, 'channels', channelId, 'messages'),
                orderBy('timestamp', 'desc')
            );
            onSnapshot(q, (snapshot) => {
                setMessages(
                    snapshot.docs.map((doc) =>
                        doc.data()
                    )
                )
            });
        }
    }, [channelId]);

    const sendMessage = e => {
        e.preventDefault();
        const q = collection(db, 'channels', channelId, 'messages');
        addDoc(q, {
            timestamp: serverTimestamp(),
            message: input,
            user: user
        });
        setInput("");
    }

    return (
        <div className='chat'>
            <ChatHeader
                channelName={channelName}
            />
            <div className="chat__messages">
                {messages.map(message => (
                    <Message
                        timestamp={message.timestamp}
                        message={message.message}
                        user={message.user}
                    />
                ))}
            </div>
            <div className="chat__input">
                <AddCircleIcon fontSize="large" />
                <form>
                    <input
                        value={input}
                        disabled={!channelId}
                        onChange={e => setInput(e.target.value)}
                        placeholder={`Message #${channelName}`}
                    />
                    <button
                        disabled={!channelId}
                        className='chat__inputButton'
                        type="submit"
                        onClick={sendMessage}
                    >
                        Send Message
                    </button>
                </form>

                <div className="chat__inputIcons">
                    <CardGiftcardIcon />
                    <GifIcon />
                    <EmojiEmotionsIcon />
                </div>
            </div>
        </div>
    )
}

export default Chat