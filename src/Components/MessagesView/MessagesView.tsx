import * as React from 'react';

import { cd, storeInjector } from 'Services';
import { Message, IMessage } from 'Components';


interface IMessagesViewProps {

}

interface IMessagesViewState {
    messages: IMessage[];
}

@cd(() => require('./MessagesView.scss'))
export class MessagesView extends React.Component<IMessagesViewProps, IMessagesViewState> {
    state = {
        messages: []
    };

    render(c?) {
        const { messages } = this.state;
        return (
            <div className={c('container')}>
                {
                    messages.map(msg => <Message key={msg.hash} msg={msg} onRemove={this.onRemove}/>)
                }
            </div>
        )
    }

    @storeInjector(['lastMessage'])
    onStoreUpdateReducer({lastMessage}) { console.log(lastMessage);
        this.state.messages.push(lastMessage);
        this.forceUpdate();
    }

    onRemove = (hash: string) => {
        const index = this.state.messages.findIndex(msg => msg.hash === hash);
        this.state.messages[index].removed = true;
        this.forceUpdate();
    }
}