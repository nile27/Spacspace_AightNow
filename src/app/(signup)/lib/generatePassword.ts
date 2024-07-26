export function generatePassword(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const specialChars = "!@#$%^&*";
  const allChars = letters + digits + specialChars;

  function getRandomChar(str: string): string {
    return str[Math.floor(Math.random() * str.length)];
  }

  while (true) {
    let password = "";
    let hasLetter = false;
    let hasDigit = false;
    let hasSpecialChar = false;

    // 길이 8에서 20 사이로 설정
    const passwordLength = Math.floor(Math.random() * 13) + 8;

    for (let i = 0; i < passwordLength; i++) {
      const char = getRandomChar(allChars);
      password += char;

      if (letters.includes(char)) hasLetter = true;
      if (digits.includes(char)) hasDigit = true;
      if (specialChars.includes(char)) hasSpecialChar = true;
    }

    if (
      (hasLetter && (hasDigit || hasSpecialChar)) ||
      (hasDigit && (hasLetter || hasSpecialChar)) ||
      (hasSpecialChar && (hasLetter || hasDigit))
    ) {
      return password;
    }
  }
}
