const useEmailNumberValidator = () => {
  const validateEmail = (email: string) => {
    // Simple email regex
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;
    return re.test(email.toLowerCase());
  };
  const isTenDigitNumber = (value: string): boolean => {
    return /^\d{10}$/.test(value);
  };
  return { validateEmail, isTenDigitNumber };
};
export default useEmailNumberValidator;
