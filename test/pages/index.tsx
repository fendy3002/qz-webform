import type { NextPage } from 'next'
import { inject, observer } from 'mobx-react';
import { WebForm } from '../../src/Components/WebForm2';
import { toJS } from 'mobx';

const Home: NextPage = ({ homeStore }) => {
    return (<WebForm
        Elements={homeStore.Elements} data={homeStore.data} error={homeStore.error}
        onChange={homeStore.onChange}
    ></WebForm>);
}

export default inject("homeStore")(observer(Home))
