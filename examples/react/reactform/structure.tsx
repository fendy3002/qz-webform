import { react } from '../../../src/index';
// import 
export default (option?: any) => {
    // empty value for required or readonly is needed, for a valid XML
    return react.prepareStructure(`
        <Text name="name" label="Name (Text)" minLength="3" required=""></Text>
        <Text name="username" label="Username (Text)" minLength="3" required=""></Text>
        <Text name="email" label="Email (Text)" minLength="3" required=""></Text>
    `, option);
};