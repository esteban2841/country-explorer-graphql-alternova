interface Country {
  name?: string
  code?: string
  capital?: string
  continent?: Continent
  currency?: string
  languages?: Array<Language>
  states?: Array<State>
  native?: string
  emoji?: string
  emojiU?: string
}

interface State {
  name?: string
  code?: string
}
interface Language {
  name: string
  code: string
  native: string
}

interface Continent {
  name: string
  code: string
}

export type { Country, State, Language, Continent }
