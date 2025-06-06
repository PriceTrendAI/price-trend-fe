// clsx: 조건부로 클래스 문자열을 병합해주는 유틸 (false, null, undefined 무시)
// tailwind-merge: 중복된 Tailwind CSS 클래스 중 마지막 값만 남기고 자동 정리해줌
// tailwindcss 에서 조건부 클래스명 병합, 중복된 클래스는 제거하여 최종 classname 반환하는 유틸함수
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs));
}
