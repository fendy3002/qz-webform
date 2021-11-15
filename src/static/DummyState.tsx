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

    onChange({ data, error }) {
        this.data = { ...this.data, ...data };
        this.error = { ...this.error, ...error };
    };
};