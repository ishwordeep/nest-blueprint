export const formatResponse = (success: boolean, data: any, message: string) => {
    return {
        success,
        data,
        message
    };
};