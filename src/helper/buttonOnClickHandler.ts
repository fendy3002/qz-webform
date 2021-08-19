export default (props) => {
    const { data, onChange } = props;
    let newData = {};
    let newError = {};

    let setDataHandler = (handler) => {
        newData = {
            ...newData,
            ...handler({
                ...data,
                ...newData
            })
        };
    };
    let setErrorHandler = (handler) => {
        newError = {
            ...newError,
            ...handler({
                ...data,
                ...newData
            })
        };
    };
    let getChange = () => {
        return {
            data: newData,
            error: newError
        };
    };

    return {
        setData: setDataHandler,
        setError: setErrorHandler,
        getChange: getChange
    };
}