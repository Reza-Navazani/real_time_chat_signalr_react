import { useState } from "react"
import { Form, Col, Row, Button } from "react-bootstrap";

const Waitingroom = ({joinChatRoom})=>{
    const [username, setUsername] = useState();
    const [chatroom, setChatroom] = useState();

    return <Form onSubmit={e=>{
        e.preventDefault();
        joinChatRoom(username, chatroom);
    }}>
        <Row>
            <Col>
            <Form.Group>
                <Form.Control onChange={e=>setUsername(e.target.value)}/>
                <Form.Control onChange={e=>setChatroom(e.target.value)}/>
            </Form.Group>
                <hr/>
                <Button variant = 'success' type = 'submit'>Join</Button>
            </Col>
        </Row>
    </Form>
}

export default Waitingroom;