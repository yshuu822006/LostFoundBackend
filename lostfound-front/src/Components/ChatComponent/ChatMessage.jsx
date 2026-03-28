import React , { useState ,useEffect } from "react";
import { getUserDetails} from "../../Services/LoginService";
import { useNavigate } from "react-router-dom";
import "./ChatMessage.css";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import {getRole} from "../../Services/LoginService";


let stompClient = null;

const ChatMessage = () => {
    let navigate = useNavigate();
    const [role, setRole] = useState("");
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState("");
     const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem("messages");
        return saved? JSON.parse(saved) : [];
    });

    const [input ,setInput] = useState("");
    const [users,setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const setUserRole = () => {
        getRole().then((response) => {
            setRole(response.data);
        });
    }

    useEffect(() => {
        localStorage.setItem("messages", JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        setUserRole();
        const fetchUserDetails = async () => {
            try {
                const response= await getUserDetails();
                const user = response.data?.username || response.data?.name || response.data;
                if (user) {
                    setUsername(user);
                    connect(true);
                } else {
                    console.error("Username not found in response:", response.data);
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            } finally {
                setLoading(false);
            }   
        };

        fetchUserDetails();
    return () => {
        if (stompClient) {
            console.log("Disconnecting from WebSocket...");
            stompClient.deactivate();
            stompClient = null;
        }
    };
    }, []);

    const connect =(autoName = username)=> {
        if(!autoName.trim()) return;
        if (stompClient && stompClient.active) {
        console.log("Already connected to WebSocket.");
        return;
        }

        const socket = new SockJS("http://localhost:9595/lostfound/ws");
 
    stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
 
      onConnect: () => {
       
        console.log("✅ Connected to WebSocket");
        setConnected(true);
 
        // Register user
        stompClient.publish({
          destination: "/app/register",
          body: JSON.stringify({ sender: autoName }),
        });
 
        // Subscribe to messages (only once)
        stompClient.subscribe("/topic/messages", (payload) => {
          const msg = JSON.parse(payload.body);
          setMessages((prev) => [...prev, msg]);
        });
 
        // Subscribe to online users list
        stompClient.subscribe("/topic/users", (payload) => {
          const list = JSON.parse(payload.body);
          setUsers(list);
        });
      },
 
      onStompError: (frame) => {
        console.error("Broker error:", frame.headers["message"]);
      },
    });
 
    stompClient.activate();
    // Send message safely
  const sendMessage = () => {
    if (!stompClient || !stompClient.connected) {
      console.warn("Not connected to server");
      return;
    }
 
    if (!input.trim()) return;
 
    const msg = { sender: username, content: input };
 
    stompClient.publish({
      destination: "/app/sendMessage",
      body: JSON.stringify(msg),
    });
 
    setInput("");
  };
 
  if (loading) {
    return (
      <div className="loading-screen">
        <h3>Loading user details...</h3>
      </div>
    );
  }
 
  const returnBack=()=>{
    if(role === "Admin"){
      navigate('/admin-menu');
    } else if(role === "Student"){
       navigate('/student-menu');
    }
    }

    return (
    <div className="chat-container">
      {!connected ? (
        <div className="login-screen">
          <div className="login-card">
            <h2>Connecting to Chat...</h2>
          </div>
        </div>
      ) : (
        <div className="chat-room">
          {/* Sidebar */}
          <div className="sidebar">
            <h3>👥 Online Users</h3>
            <ul>
              {users.map((user, i) => (
                <li key={i} className="user-item">
                  🟢 {user}
                </li>
              ))}
              {users.length === 0 && <li>No users online</li>}
            </ul>
          </div>
 
          {/* Chat section */}
          <div className="chat-content">
            <div className="chat-header">
              <h3>💬 General Chat</h3>
             
              <span className="username">{username}</span>
              <button style={{marginLeft: "10px"}} onClick={()=>returnBack()} className="btn btn-danger">Return</button>  
            </div>
 
            <div className="messages" id="messageBox">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message ${
                    msg.sender === username ? "self" : "other"
                  }`}
                >
                  <b>{msg.sender}:</b> {msg.content}
                </div>
              ))}
            </div>
 
            <div className="input-area">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
}

export default ChatMessage;