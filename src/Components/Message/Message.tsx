import * as React from 'react';

import { sl } from 'Services';
import { Button } from 'Components';


interface IMessageProps {
    msg: IMessage;
    onRemove: (hash: string) => void
}

export interface IMessage {
    userName: string;
    message: string;
    self: boolean;
    hash: string;
    removed?: boolean;
}


export const Message = function({ msg, onRemove }:IMessageProps) {
    const c = sl(() => require('./Message.scss'));
    const { userName, self, message, hash, removed } = msg;

    const classList = `msg ${self ? 'self' : ''}`;
    return (
        <aside className={c('container')}>
            <div className={c(classList)}>

                {
                    !removed ? (
                        <div className={c('wrapper')}>
                            <p className={c('name')}>{userName}</p>

                            <p className={c('message')}>{removed ? 'Removed' : message}</p>
                        </div>
                    ) : <div className={c('removed')}>Removed</div>
                }

                { (self && !removed) && <p className={c('button')}> <Button onClick={() => onRemove(hash)}> X </Button> </p> }
            </div>
        </aside>
    )
};


