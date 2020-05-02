import * as React from 'react';

import {sl, storeInterface, DataRequester, eventEmitter, makeHash } from 'Services';
import { Form, IFormAPI, InputArea, Label } from 'ModularForm';
import { Button, MessagesView } from 'Components';


interface IChatProps {

}

let formData = {};
let formAPI: IFormAPI;


const sendMessage = (userName: string) => () => {
   if (!formAPI.getErrors().message) {
        DataRequester.sendMessage({
            userName,
            self: true,
            hash: makeHash(),
            message: formData['message']
        });
        formAPI.clear();
        formData = {};
        return
   }

    eventEmitter.emit('ALERT_INFO', {
        type: 'error',
        msg: 'Need a message'
    })
};

export const Chat = function({}:IChatProps) {
    const c = sl(() => require('./Chat.scss'));
    const userName = storeInterface().getData('userName');

    return (
        <section className={c('container')}>
            <aside className={c('title')}>{userName}: ChatRoom </aside>

            <div className={c('board')}>
                <MessagesView/>
            </div>

            <Form className={c('form')} onValuesUpdate={onFormUpdate} getAPI={(api: IFormAPI) => formAPI = api}>
                <Label className={c('label')}>
                    <InputArea
                        name={'message'}
                        textarea={true}
                        value={'Type message'}
                        required={true}
                        validationFn={val => val.length > 0}/>
                </Label>

                <Button onClick={sendMessage(userName)}> Send </Button>
            </Form>
        </section>
    )
};

function onFormUpdate(data) {
    Object.keys(data).forEach(key => formData[key] = data[key])
}