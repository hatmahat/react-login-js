import useLocalStorage from "./useLocalStorage";

const useInput = (key, initValue) => {
    const [value, setValue] = useLocalStorage(key, initValue);

    const reset = () => setValue(initValue);

    const attibuteObj = {
        value,
        onChange: (e) => setValue(e.target.value),
    };

    return [value, reset, attibuteObj];
};

export default useInput;
