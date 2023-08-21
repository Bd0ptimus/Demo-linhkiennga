import styles from './styles.module.css';
import { useState } from 'react';
import io from 'socket.io-client'; // Add this
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import * as actions from "@/store/action";

const socket = io.connect('http://localhost:4000');

const Chat = ({ chatSocketUpdate }) => {
    // console.log('socket instance : ', socket);
    const router = useRouter()

    const [username, setUsername] = useState(''); // Add this
    const [room, setRoom] = useState(''); // Add this

    const joinRoom = () => {
        if (room !== '' && username !== '') {
            socket.emit('join_room', { username, room });
        }

        // router.replace("/test/chat/box");
        // chatSocketUpdate(socket);
        // router.push({
        //     pathname: '/test/chat/box',
        //     query: {
        //         username: username,
        //         room: room,
        //         socket: socket,
        //     }
        // });

        socket.on('receive_message', (data) => {
            console.log('data received : ', data);
        });

    };
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1>{`<>DevRooms</>`}</h1>
                <input className={styles.input} placeholder='Username...'
                    onChange={(e) => setUsername(e.target.value)} />

                <select className={styles.input} onChange={(e) => setRoom(e.target.value)}>
                    <option>-- Select Room --</option>
                    <option value='javascript'>JavaScript</option>
                    <option value='node'>Node</option>
                    <option value='express'>Express</option>
                    <option value='react'>React</option>
                </select>

                <button className='btn btn-secondary' onClick={joinRoom} >Join Room</button>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        chatSocketUpdate: (socket) => dispatch(actions.chatSocketUpdate(socket)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);