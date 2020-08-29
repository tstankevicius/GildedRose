export enum ITEM_NAMES {
  AGED_BRIE = 'Aged Brie',
  BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert',
  SULFURAS = 'Sulfuras, Hand of Ragnaros',
  DEXTERITY = '+5 Dexterity Vest',
  ELIXIR = 'Elixir of the Mongoose',
  MANA_CAKE = 'Conjured Mana Cake',
}

export enum QUALITY_TYPES {
  IMPROVES = 'Improves',
  REGULAR = 'Regular',
  IMPROVES_DOUBLE = 'Improves_Double',
  IMPROVES_TRIPLE = 'Improves_Triple',
  FIXED = 'Fixed',
  EXPIRES = 'Expires',
  CONJURED = 'Conjured',
}

export const ITEM_QUALITY_TYPES: { [key in keyof typeof QUALITY_TYPES]: Array<ITEM_NAMES> } = {
  IMPROVES: [ITEM_NAMES.AGED_BRIE, ITEM_NAMES.BACKSTAGE],
  REGULAR: [ITEM_NAMES.DEXTERITY, ITEM_NAMES.ELIXIR, ITEM_NAMES.MANA_CAKE],
  IMPROVES_DOUBLE: [ITEM_NAMES.BACKSTAGE],
  IMPROVES_TRIPLE: [ITEM_NAMES.BACKSTAGE],
  FIXED: [ITEM_NAMES.SULFURAS],
  EXPIRES: [ITEM_NAMES.BACKSTAGE],
  CONJURED: [ITEM_NAMES.MANA_CAKE],
};
