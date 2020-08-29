// in the excerise it is written to NOT alter Item class so I don't, but normally in TS I would make it an interface
// unless I need special inner methods of Item class like in item-altered.ts file
export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}
