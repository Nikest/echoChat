import { storeInterface, eventEmitter, makeHash, Config } from 'Services';
import { IMessage } from 'Components';

const socket = new WebSocket(Config.get('SERVER'));

export const DataRequester = {
    testConnection() {
        return socket.readyState
    },
    sendMessage(message: IMessage) {
        if (this.testConnection() != 1) {
            eventEmitter.emit('ALERT_INFO', {
                type: 'error',
                msg: 'Server connection failed'
            });
            return;
        }

        storeInterface().setData('lastMessage', message);

        socket.onmessage = (msg) => {
            const dataObj = JSON.parse(msg.data);

            const echoMsg: IMessage = {
                self: false,
                hash: makeHash(),
                userName: 'Echo server',
                message: dataObj.message,
            };

            storeInterface().setData('lastMessage', echoMsg);
        };

        socket.send(JSON.stringify(message))
    }
};