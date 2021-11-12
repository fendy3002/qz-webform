import { observable, makeAutoObservable } from 'mobx';
export default class DummyState {
    constructor(defaultData) {
        [
            "onChange",
        ].forEach((handler) => {
            this[handler] = this[handler].bind(this);
        });
        makeAutoObservable(this);
        this.data = defaultData;
    }

    data: any = observable({});
    error: any = observable({});

    onChange(handler) {
        let result = handler({ data: this.data, error: this.error });
        this.data = { ...result.data };
        this.error = { ...result.error };
    };
};