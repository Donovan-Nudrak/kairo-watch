export type FinishId = 'obsidian' | 'titanium' | 'arctic'

export type Finish = {
  id: FinishId
  name: string
  colorLabel: string
  reference: string
  swatch: string
  accent: string
  note: string
}

export type CampaignImageSource = {
  src: string
  fallback: string
  alt: string
}

export const FINISHES: Record<FinishId, Finish> = {
  obsidian: {
    id: 'obsidian',
    name: 'Obsidian',
    colorLabel: 'Deep black',
    reference: 'K-01.001',
    swatch: '#1C1D1D',
    accent: '#6E7272',
    note: 'A darkened titanium case, quiet against the wrist.',
  },
  titanium: {
    id: 'titanium',
    name: 'Titanium',
    colorLabel: 'Metallic silver',
    reference: 'K-01.002',
    swatch: '#B5BAB9',
    accent: '#B5BAB9',
    note: 'Grade 5 titanium left in its natural brushed tone.',
  },
  arctic: {
    id: 'arctic',
    name: 'Arctic',
    colorLabel: 'Cold light grey',
    reference: 'K-01.003',
    swatch: '#C9CECD',
    accent: '#D7DCDB',
    note: 'A cooler satin finish, closer to light than metal.',
  },
}

export const FINISH_ORDER: FinishId[] = ['obsidian', 'titanium', 'arctic']

export const WATCH = {
  brand: 'KAIRO',
  model: 'CHRONO 01',
  price: '$1,290 USD',
  shortPrice: 'From $1,290',
  caliber: 'Automatic',
  diameter: '40 mm',
}

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export const IMAGES = {
  hero: {
    src: asset('images/KAIRO-hero.png'),
    fallback: asset('images/watch-hero.jpg'),
    alt: 'KAIRO Chrono 01 automatic watch, three-quarter view of the dial and titanium bracelet',
  },
  detail: {
    src: asset('images/KAIRO-detail.png'),
    fallback: asset('images/watch-detail.jpg'),
    alt: 'Chrono 01 held in hand, showing the brushed case, crown and chronograph pushers',
  },
  craft: {
    src: asset('images/KAIRO-craft.png'),
    fallback: asset('images/watch-craft.jpg'),
    alt: 'Chrono 01 on a dark reflective surface, titanium case and sapphire crystal in close detail',
  },
  wrist: {
    src: asset('images/KAIRO-wrist.png'),
    fallback: asset('images/watch-wrist.jpg'),
    alt: 'Chrono 01 resting on dark fabric, showing the dial, bezel and metal bracelet',
  },
} satisfies Record<string, CampaignImageSource>

export const SPECS = [
  {
    value: '40 MM',
    label: 'Grade 5 titanium case',
  },
  {
    value: '72 H',
    label: 'Automatic power reserve',
  },
  {
    value: '10 ATM',
    label: 'Water resistance',
  },
  {
    value: '01',
    label: 'Inaugural mechanical edition',
  },
] as const

export const CRAFT_POINTS = [
  'Brushed titanium architecture',
  'Domed sapphire crystal',
  'Swiss automatic movement',
] as const
