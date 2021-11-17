import type { NextPage } from 'next'
import { inject, observer } from 'mobx-react';
import { WebForm } from '../../../src';
import part from '../part';

const Home: NextPage = ({ homeStore }) => {
    return (<>
        <div className="container">
            <h1>QzWebForm - React</h1>
            <hr></hr>
            <WebForm
                Elements={homeStore.Elements} data={homeStore.data} error={homeStore.error}
                Parts={part}
                onChange={homeStore.onChange}
                readonly={homeStore.data.readonly ?? false}
            ></WebForm>
        </div>
    </>);
}

export default inject("homeStore")(observer(Home))
