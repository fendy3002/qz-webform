export default {
    option: (provided, state) => {
        return {
            ...provided,
        };
    },
    control: (provided) => {
        return {
            ...provided,
            boxShadow: "none",
            paddingTop: "24px",            
            borderRadius: 0
        };
    },
    valueContainer: (provided) => {
        return {
            ...provided,
            paddingLeft: "8px"
        };
    },
    singleValue: (provided, state) => {
        return { ...provided };
    }
};