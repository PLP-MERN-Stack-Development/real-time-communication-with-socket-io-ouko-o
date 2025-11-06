import { useEffect, useMemo, useRef, useState } from 'react';
import { useSocket } from './socket/socket';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  return (
    <div style={{ maxWidth: 400, margin: '80px auto', textAlign: 'center' }}>
      <h2>Welcome to Socket.io Chat</h2>
      <input
        placeholder="Enter a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: '100%', padding: 10, marginTop: 20 }}
      />
      <button
        onClick={() => username && onLogin(username)}
        style={{ width: '100%', padding: 10, marginTop: 12 }}
      >
        Join Chat
      </button>
    </div>
  );
}

function Chat({ username, onLogout }) {
  const {
    isConnected,
    messages,
    users,
    typingUsers,
    connect,
    disconnect,
    sendMessage,
    sendPrivateMessage,
    setTyping,
    roomMessages,
    joinRoom,
    leaveRoom,
    sendRoomMessage,
  } = useSocket();

  const [text, setText] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [roomInput, setRoomInput] = useState('');
  const [currentRoom, setCurrentRoom] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    connect(username);
    return () => disconnect();
  }, [username]);

  // Simple browser notifications
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (!document.hasFocus() && messages.length) {
      const last = messages[messages.length - 1];
      if (last && !last.system && last.sender !== username) {
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(`${last.sender}`, { body: last.message });
        }
      }
    }
  }, [messages, username]);

  useEffect(() => {
    listRef.current?.scrollTo(0, listRef.current.scrollHeight);
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;
    if (selectedUserId) {
      sendPrivateMessage(selectedUserId, text.trim());
    } else if (currentRoom) {
      sendRoomMessage(currentRoom, text.trim());
    } else {
      sendMessage({ message: text.trim() });
    }
    setText('');
    setTyping(false);
  };

  const otherUsers = useMemo(
    () => users.filter((u) => u.username !== username),
    [users, username]
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', height: '100vh' }}>
      <aside style={{ borderRight: '1px solid #e5e7eb', padding: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong>{username}</strong>
          <span style={{ color: isConnected ? 'green' : 'red', fontSize: 12 }}>
            {isConnected ? 'online' : 'offline'}
          </span>
        </div>
        <button onClick={onLogout} style={{ width: '100%', marginTop: 8 }}>Logout</button>

        <h4 style={{ marginTop: 24 }}>Direct Messages</h4>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        >
          <option value="">Global Room</option>
          {otherUsers.map((u) => (
            <option key={u.id} value={u.id}>{u.username}</option>
          ))}
        </select>

        <h4 style={{ marginTop: 24 }}>Rooms</h4>
        <div style={{ display: 'flex', gap: 6 }}>
          <input
            placeholder="room-name"
            value={roomInput}
            onChange={(e) => setRoomInput(e.target.value)}
            style={{ flex: 1, padding: 8 }}
          />
          <button
            onClick={() => {
              if (!roomInput.trim()) return;
              joinRoom(roomInput.trim());
              setCurrentRoom(roomInput.trim());
              setSelectedUserId('');
            }}
          >Join</button>
        </div>
        {currentRoom ? (
          <button
            style={{ width: '100%', marginTop: 6 }}
            onClick={() => {
              leaveRoom(currentRoom);
              setCurrentRoom('');
            }}
          >Leave "{currentRoom}"</button>
        ) : null}

        <div style={{ marginTop: 16, fontSize: 12, color: '#6b7280' }}>
          Typing: {typingUsers.filter((n) => n !== username).join(', ') || '—'}
        </div>
      </aside>

      <main style={{ display: 'flex', flexDirection: 'column' }}>
        <div ref={listRef} style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {(currentRoom ? (roomMessages[currentRoom] || []) : messages).map((m) => (
            <div key={m.id} style={{ marginBottom: 10 }}>
              {m.system ? (
                <div style={{ color: '#6b7280', fontStyle: 'italic', fontSize: 12 }}>{m.message}</div>
              ) : (
                <div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>
                    <strong>{m.sender}</strong>
                    <span> · {new Date(m.timestamp).toLocaleTimeString()}</span>
                    {m.isPrivate ? <span style={{ marginLeft: 6 }}>[DM]</span> : null}
                    {m.room ? <span style={{ marginLeft: 6 }}>[{m.room}]</span> : null}
                  </div>
                  <div>{m.message}</div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, padding: 12, borderTop: '1px solid #e5e7eb' }}>
          <input
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setTyping(!!e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder={selectedUserId ? 'Message user…' : currentRoom ? `Message room "${currentRoom}"…` : 'Message global room…'}
            style={{ flex: 1, padding: 10 }}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [username, setUsername] = useState('');
  if (!username) return <Login onLogin={setUsername} />;
  return <Chat username={username} onLogout={() => setUsername('')} />;
}


