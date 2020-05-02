import * as React from 'react';

import { sl, storeInterface, eventEmitter } from 'Services';
import { Button } from 'Components';
import { Form, InputArea } from 'ModularForm';

interface IUserEnterProps {
    onEnter?: () => void
}

const formData = {};

function formDataUpdate(data) {
    Object.keys(data).forEach(key => formData[key] = data[key])
}

const dataSave = (key: string, errorMsg: string) => () => {
    formData[key] ? storeInterface().setData(key, formData[key]) : eventEmitter.emit('ALERT_INFO', {
        type: 'error',
        msg: errorMsg
    })
};

export const UserEnter = function({}:IUserEnterProps) {
    const c = sl(() => require('./UserEnter.scss'));

    return (
        <div className={c('container')}>
            <Form onValuesUpdate={formDataUpdate}>
                <InputArea name={'userName'} placeholder={'Type your name'}/>
                <div className={c('center')}>
                    <Button onClick={dataSave('userName', 'Need to enter user name')}>Enter</Button>
                </div>
            </Form>
        </div>
    )
};


