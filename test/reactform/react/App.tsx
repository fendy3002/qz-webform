import * as React from 'react';
import * as mobxReact from 'mobx-react';
let { observer, inject } = mobxReact;

@inject('store')
@observer
class App extends React.Component {
    render() {
        const { store, WebForm } = this.props;
        return <>
            {/* do not render if user null (not yet ready) */}
            {store.user &&
                <WebForm data={store.user} error={store.error} onChange={store.onFormChange} />
            }
            <div className="mb-2">
                <button className="btn btn-primary rounded-0" type="button"
                    onClick={store.validateData}>Validate</button>
            </div>
            <hr />
            <textarea className="form-control" rows={5} value={JSON.stringify(store.user, null, 2)} readOnly></textarea>
        </>;
    }
}

export default App;