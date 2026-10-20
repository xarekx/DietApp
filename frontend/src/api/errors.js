export const getErrorMessage = (error, fallback= 'Coś poszło nie tak. Spróbuj ponownie.') => {
    if (!error) return ''; 
    if (error.status === undefined) return 'Brak połączenia z serwerem. Spróbuj ponownie.';
    if (error.status >= 500) return 'Wystąpił błąd serwera. Spróbuj ponownie.';
    if (error.status === 403) return 'Brak uprawnień do wykonania tej akcji. Odśwież stronę i spróbuj ponownie.';
    if (typeof error.data?.detail === 'string') return error.data.detail;
    if (Array.isArray(error.data?.non_field_errors)) return error.data.non_field_errors[0];
    if (error.status === 400) return 'Niepoprawne dane. Spróbuj ponownie.';
    if (error.status === 404) return 'Nie znaleziono zasobu.';
    return fallback;

}

export const getFieldErrors = (error) => {
    if (error?.status !== 400 || typeof error.data !== 'object' || error.data === null) return {};

    return Object.fromEntries(
        Object.entries(error.data)
        .filter(([field, messages]) => field !== 'detail' && field !=='non_field_errors' && Array.isArray(messages))
        .map(([field, messages]) => [field, messages[0]])
    );
};