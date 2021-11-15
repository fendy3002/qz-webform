import type { NextPage } from 'next'
import { inject, observer } from 'mobx-react';
import { WebForm } from '../../../src';
import part from '../part';

const Home: NextPage = ({ homeStore }) => {
    return (<>
        <WebForm
            Elements={homeStore.Elements} data={homeStore.data} error={homeStore.error}
            Parts={part}
            onChange={homeStore.onChange}
            readonly={homeStore.data.readonly ?? false}
        ></WebForm>
        <button type="button" className="btn btn-sm rounded-0 btn-primary" onClick={homeStore.onSubmit}>SUBMIT</button>
    </>);
}

export default inject("homeStore")(observer(Home))
