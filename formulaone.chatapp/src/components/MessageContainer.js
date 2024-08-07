import React from 'react';
import { Table } from 'react-bootstrap';

const MessageContainer = ({ messages }) => {
  return (
    <div>
      <Table striped bordered>
        <tbody>
          {messages.map((msg, index) => (
            <tr key={index}>
              <td>{msg.msg} - {msg.username}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default MessageContainer;
