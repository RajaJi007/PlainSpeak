
export interface SimplifiedResult {
  summary: string;
  keyPoints: string[];
  whatItMeans: string;
  whatToDo: string[];
  definitions: { word: string; meaning: string }[];
}

export enum ToneType {
  KID_FRIENDLY = 'Kid-Friendly',
  BASIC_ENGLISH = 'Basic English',
  SUPPORTIVE = 'Supportive'
}
