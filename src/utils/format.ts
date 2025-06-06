/**
 * 숫자 값을 한국식 금액 표기로 변환
 * ex. 300   → "300만원"
 * * 5000  → "5천만원"
 */

export function formatPrice(value: number): string {
  if (value >= 10000) {
    const 억 = Math.floor(value / 10000);
    const 만 = value % 10000;

    if (만 === 0) return `${억}억`;
    if (만 % 1000 === 0) return `${억}억 ${만 / 1000}천만원`;
    return `${억}억 ${만}만원`;
  }

  if (value >= 1000) {
    return `${value / 1000}천만원`;
  }

  return `${value}만원`;
}
