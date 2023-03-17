import {useState} from "react";

export const ErrorMessage = () => {
    const [errorMessage, setErrorMessage] = useState('');

    const showError = (message) => {
        setErrorMessage(message);

    }

    return (
        <p>{errorMessage}</p>
    )

}