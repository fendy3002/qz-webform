import { types } from 'qz-webform';
let customPartSet: types.Part.CustomPartSet = {
    "text": {
        Component: ({ name, readonly, value, label, error, placeholder, dataset, validation, hidden,
            onChange }) => {
            if (hidden) {
                return <input type="hidden" name={name} value={value} />
            }
            let requiredSign = validation.required ? <span className="text-danger">*</span> : <></>;
            return <div className="form-floating">
                <input type="text" className={"form-control rounded-0 " + (error ? "is-invalid" : "")} name={name}
                    value={value} readOnly={readonly} placeholder={placeholder} {...dataset}
                    onChange={onChange} />
                {label &&
                    <label>{label}&nbsp;{requiredSign}</label>
                }
                {error &&
                    <div className="invalid-feedback">
                        {error}
                    </div>
                }
            </div>;
        }
    }
};

export default customPartSet;