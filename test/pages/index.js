import { } from 'mobx';
import { inject, observer } from 'mobx-react';
import { useEffect } from 'react';
const Home = ({}) => {
  useEffect(() => {
    typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null
  }, []);

  return (
    <div></div>
  );
};

export default inject("homeStore")(observer(Home));
