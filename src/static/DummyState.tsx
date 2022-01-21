import { observable, autorun, toJS, makeAutoObservable } from 'mobx';
export default class DummyState {
    constructor(defaultData) {
        [
            "onChange",
        ].forEach((handler) => {
            this[handler] = this[handler].bind(this);
        });
        makeAutoObservable(this);
        this.data = defaultData;
        autorun(() => {
            if (this.autorunHandler) {
                this.autorunHandler();
                this.autorunHandler = null;
            }
        });
    }

    data: any = observable({});
    error: any = observable({});

    autorunHandler: any = null;

    onChange({ data, error }, autorunHandler) {
        if (autorunHandler) {
            this.autorunHandler = autorunHandler;
        }
        this.data = { ...this.data, ...data };
        this.error = { ...this.error, ...error };
        //console.log("data, error", toJS(this.data), toJS(this.error))
    };
};