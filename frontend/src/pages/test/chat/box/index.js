import styles from './styles.module.css';
import MessagesReceived from './messages';
import { withRouter } from 'next/router'
import { connect } from 'react-redux';
const Chat = (props, { socket }) => {
    console.log('check socket in box : ', socket);
    return (
        <div className={styles.chatContainer}>
            <div>
                <MessagesReceived socket={socket} />
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        socket: state.system.socket,

    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);