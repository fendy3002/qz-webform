import * as React from 'react';
import * as mobxReact from 'mobx-react';
let { observer, inject } = mobxReact;

@inject('store')
@observer
class App extends React.Component {
    render() {
        const { store, WebForm } = this.props;
        return <>
            <WebForm data={store.user} error={store.error}/>
        </>;
    }
}

export default App;