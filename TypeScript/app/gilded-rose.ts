import {Constants} from './constants';
import {ITEM_QUALITY_TYPES, QUALITY_TYPES} from './model/enums';
import {Item} from './model/item';

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      item.sellIn = this.updateItemSellInDate(item);
      item.quality = this.updateItemQuality(item);
    }
    return this.items;
  }

  private updateItemSellInDate(item: Item): number {
    return item.sellIn - 1;
  }

  private updateItemQuality(item: Item): number {
    let quality = item.quality;
    if (this.itemQualityTypeIs(QUALITY_TYPES.FIXED, item.name)) {
      return quality;
    }
    if (this.itemQualityTypeIs(QUALITY_TYPES.EXPIRES, item.name) && this.sellDatePassedFor(item)) {
      return 0;
    }
    if (this.itemQualityTypeIs(QUALITY_TYPES.REGULAR, item.name) && quality > Constants.MIN_QUALITY) {
      quality = this.decreaseItemQuality(quality, item);
    }
    if (this.itemQualityTypeIs(QUALITY_TYPES.IMPROVES, item.name) && quality < Constants.MAX_QUALITY) {
      quality = this.increaseItemQuality(quality, item);
    }
    quality = quality > Constants.MAX_QUALITY ? Constants.MAX_QUALITY : quality;
    quality = quality < Constants.MIN_QUALITY ? Constants.MIN_QUALITY : quality;
    return quality;
  }

  private sellDatePassedFor(item: Item): boolean {
    return item.sellIn < 0;
  }

  private itemQualityTypeIs(qualityType: QUALITY_TYPES, itemName: string): boolean {
    return ITEM_QUALITY_TYPES[qualityType.toUpperCase()].includes(itemName);
  }

  private itemReachedDoubleQualityDate(item: Item): boolean {
    return item.sellIn < Constants.DOUBLE_QUALITY_DAYS_LIMIT;
  }

  private itemReachedTripleQualityDate(item: Item): boolean {
    return item.sellIn < Constants.TRIPLE_QUALITY_DAYS_LIMIT;
  }

  private increaseItemQuality(quality: number, item: Item): number {
    quality++;
    if (this.itemQualityTypeIs(QUALITY_TYPES.IMPROVES_DOUBLE, item.name) && this.itemReachedDoubleQualityDate(item)) {
      quality++;
      if (this.itemQualityTypeIs(QUALITY_TYPES.IMPROVES_TRIPLE, item.name) && this.itemReachedTripleQualityDate(item)) {
        quality++;
      }
    }
    return quality;
  }

  private decreaseItemQuality(quality: number, item: Item): number {
    quality = this.decreaseQualityCycle(quality, item);
    if (this.sellDatePassedFor(item)) {
      quality = this.decreaseQualityCycle(quality, item);
    }
    return quality;
  }

  private decreaseQualityCycle(quality: number, item: Item): number {
    quality--;
    if (this.itemQualityTypeIs(QUALITY_TYPES.CONJURED, item.name)) {
      quality--;
    }
    return quality;
  }
}
