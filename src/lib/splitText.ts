export interface SplitResult {
  chars: string[];
  words: string[];
}

export function splitTextIntoChars(text: string): string[] {
  return text.split('');
}

export function splitTextIntoWords(text: string): string[] {
  return text.split(' ');
}
