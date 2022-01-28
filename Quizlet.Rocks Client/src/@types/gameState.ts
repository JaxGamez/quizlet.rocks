interface Options {
  answerWith: number;
  promptWith: number;
  termAudio: boolean;
}

interface Player {
  username: string;
  id: string;
  joinTimestamp: number;
  connectionStatuses: string[];
}

interface Players {
  [key: string]: Player;
}

interface Terms {
  [key: number]: number[];
}

interface Streak {
  answers: any[];
  lastAnsweredTimestamp: number;
  prompts: number[];
  roundTerms: number[][];
  terms: Terms;
}

interface Team {
  color: string;
  expectedPlayerCount: 1;
  mascotCode: string;
  name: string;
  players: string[];
  teamCode: null;
  streaks: Streak[];
}

interface Set {
  numTerms: number;
  _thumbnailUrl: string;
  accessCodePrefix?: any;
  privacyLockStatus: number;
  passwordEdit: boolean;
  parentId: number;
  creatorId: number;
  publishedTimestamp: number;
  price?: any;
  passwordUse: boolean;
  hasImages: boolean;
  defLang: string;
  mcqCount: number;
  timestamp: number;
  wordLang: string;
  title: string;
  purchasableType: number;
  _webUrl: string;
  hasDiagrams: boolean;
  creationSource: number;
  id: number;
  description: string;
  accessType: number;
  lastModified: number;
}

export interface Term {
  _wordAudioUrl: string;
  definitionImageId?: number;
  _wordTtsUrl: string;
  _wordSlowTtsUrl: string;
  definitionCustomDistractors?: any;
  word: string;
  _definitionAudioUrl: string;
  rank: number;
  definitionCustomAudioId?: any;
  _definitionTtsUrl: string;
  _definitionSlowTtsUrl: string;
  wordCustomDistractors?: any;
  definition: string;
  wordRichText?: any;
  _imageUrl: string;
  wordCustomAudioId?: any;
  id: number;
  definitionRichText?: any;
  setId: number;
  lastModified: number;
}

export interface GameState {
  diagramImage?: any;
  diagramShapes?: any;
  gameInstanceId: number;
  id: string;
  mascotLang: string;
  options: Options;
  players: Players;
  set: Set;
  statuses: string[];
  teams: any[];
  terms: Term[];
  type: number;
}
