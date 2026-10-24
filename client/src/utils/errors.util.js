export const getErrors = async(response) => {
    const errorData = await response.json();
    const error = new Error('An unexpected error has occurred');
    error.errors = errorData.errors || [];
    return error;
}