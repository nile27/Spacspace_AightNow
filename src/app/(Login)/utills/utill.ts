export function loginRegExp(id: string, pw: string) {
  // id 정규식: 알파벳과 숫자 조합, 최소 5자 이상
  const idRegex = /^[a-zA-Z0-9]{5,}$/;

  // pw 정규식: 알파벳, 숫자, 특수문자 조합, 최소 8자 이상
  const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,}$/;

  // id와 pw가 각각 해당 조건을 만족하는지 검사
  const isIdValid = idRegex.test(id);
  const isPwValid = pwRegex.test(pw);

  if (!isIdValid && !isPwValid)
    return {
      bool: [false, false],
      message: [
        "*  6~12자의 영문, 숫자, ,_을 이용한 조합",
        "*  8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합",
      ],
    };
  else if (!isIdValid)
    return { bool: [false, true], message: "*  6~12자의 영문, 숫자, ,_을 이용한 조합" };
  else if (!isPwValid)
    return {
      bool: [false, true],
      message: "*  8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합",
    };
  else return { bool: [true, true], message: "완료" };
}
