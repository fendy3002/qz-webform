import { useContext } from 'react';
import { PartsContext } from '../context/PartsContext';

let useParts = () => {
    const { parts } = useContext(PartsContext);
    return parts;
};

export { useParts };