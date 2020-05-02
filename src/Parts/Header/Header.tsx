import * as React from 'react';

import { cd, eventEmitter, DataRequester } from 'Services';
import { Button } from 'Components';
import { Form, InputArea, Label } from 'ModularForm';

interface IHeaderProps {

}

@cd(() => require('./Header.scss'))
export class Header extends React.Component<IHeaderProps> {
    render(c?) {
        return (
            <header className={c('container')}>

            </header>
        )
    }
}
