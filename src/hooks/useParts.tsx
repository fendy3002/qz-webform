import { useContext } from 'react';
import { PartsContext } from '../context/PartsContext';

function useParts() {
    const { parts } = useContext(PartsContext);
    return parts;
};

export { useParts };