import elementToJson from './elementToJson';
const render = (element) => {
    elementToJson(element).then((elementsJson) => {
        console.log(elementsJson);
        for (let each of elementsJson) {

        }
    })
};

export {
    render
};