// 상대 시간 표시
const formatRelativeTime = (datetime: string): string => {
  const year = parseInt(datetime.slice(0, 4), 10);
  const month = parseInt(datetime.slice(4, 6), 10) - 1; // 월은 0부터 시작
  const day = parseInt(datetime.slice(6, 8), 10);
  const hour = parseInt(datetime.slice(8, 10), 10);
  const minute = parseInt(datetime.slice(10, 12), 10);

  const articleDate = new Date(year, month, day, hour, minute);
  const now = new Date();

  const diff = now.getTime() - articleDate.getTime();
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (diffDays >= 1) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  } else if (diffHours >= 1) {
    return `${diffHours}시간 전`;
  } else if (diffMinutes >= 1) {
    return `${diffMinutes}분 전`;
  } else {
    return "방금 전";
  }
};

// HTML 문자열에서 텍스트만 추출
const extractTextFromHTML = (htmlString: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // 불필요한 태그 및 텍스트 제거
  const styleTags = doc.querySelectorAll("style");
  styleTags.forEach(tag => tag.remove());

  const textContent = doc.body.innerText || doc.body.textContent || "";
  return textContent.replace(/[\n\r]+/g, " ").trim(); // 줄바꿈 제거 및 트림 처리
};

export { formatRelativeTime, extractTextFromHTML };
