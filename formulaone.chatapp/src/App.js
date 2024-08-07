import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Waitingroom from './components/Waitingroom';
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import ChatRoom from './components/ChatRoom';

function App() {
  const [conn, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  const joinChatRoom = async (username, chatroom) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5204/Chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("JoinSpecificChatRoom", (username, msg) => {
        console.log("msga: ", msg);
        setMessages((m) => [...m, { username, msg }]);
      });

      connection.on("ReceiveSpecificMessage", (username, msg) => {
        setMessages((m) => [...m, { username, msg }]);
      });

      await connection.start();
      await connection.invoke("JoinSpecificChatRoom", { username, chatroom });
      setConnection(connection);
    } catch (e) {
      console.error(e);
    }
  }

  const sendMessage = async(message)=>{
    try{
      await conn.invoke("SendMessage", message);
    }catch(e){
      console.log(e);
    }
  }

  return (
    <div>
      <main>
        <Container>
          <Row className='px-5 my-5'>
            <Col sm='12'>
              <h1>Welcome to the F1 ChatApp</h1>
            </Col>
          </Row>
          { !conn
            ? <Waitingroom joinChatRoom={joinChatRoom} />
            : <ChatRoom messages={messages} sendMessage={sendMessage} />
          }
        </Container>
      </main>
    </div>
  );
}

export default App;
