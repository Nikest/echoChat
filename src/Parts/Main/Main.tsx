import * as React from 'react';

import {cd, eventEmitter, storeInjector} from 'Services';
import { UserEnter, Alert, Chat } from "Components";

interface IMainProps {

}

interface IMainState {
    userName: string;
}

@cd(() => require('./Main.scss'))
export class Main extends React.Component<IMainProps, IMainState> {
    state = {
        userName: ''
    };
    render(c?) {
        const { userName } = this.state;

        return (
            <main className={c('container')}>
                <div className={c('alert')}>
                    <Alert/>
                </div>
                <section className={c('center')}>
                    {
                        userName ? <Chat/> : <UserEnter/>
                    }
                </section>
            </main>
        )
    }

    @storeInjector(['userName'])
    onUserEnterReducer({userName}) {
        this.setState({userName});
        eventEmitter.emit('ALERT_INFO', {
            type: 'success',
            msg: 'Enter success',
            timeout: 3000
        })
    }
}
