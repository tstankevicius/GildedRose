import {Constants} from './constants';
import {QUALITY_TYPES} from './model/enums';
import {Item} from './model/item-altered';

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
    if(item.hasQualityType(QUALITY_TYPES.FIXED)) {
      return quality;
    }
    if(item.hasQualityType(QUALITY_TYPES.EXPIRES) && item.sellDatePassed) {
      return 0;
    }
    if (item.hasQualityType(QUALITY_TYPES.REGULAR)) {
      quality = this.decreaseItemQuality(quality, item);
    }
    if (item.hasQualityType(QUALITY_TYPES.IMPROVES)) {
      quality = this.increaseItemQuality(quality, item);
    }
    quality = quality > Constants.MAX_QUALITY ? Constants.MAX_QUALITY : quality;
    quality = quality < Constants.MIN_QUALITY ? Constants.MIN_QUALITY : quality;
    return quality;
  }

  private increaseItemQuality(quality: number, item: Item): number {
    quality++;
    if (item.hasQualityType(QUALITY_TYPES.IMPROVES_DOUBLE) && item.hasReachedDoubleQualityDate) {
      quality++;
      if (item.hasQualityType(QUALITY_TYPES.IMPROVES_TRIPLE) && item.hasReachedTripleQualityDate) {
        quality++;
      }
    }
    return quality;
  }

  private decreaseItemQuality(quality: number, item: Item): number {
    quality = this.decreaseQualityCycle(quality, item);
    if (item.sellDatePassed) {
      quality = this.decreaseQualityCycle(quality, item);
    }
    return quality;
  }

  private decreaseQualityCycle(quality: number, item: Item): number {
    quality--;
    if(item.hasQualityType(QUALITY_TYPES.CONJURED)) {
      quality--;
    }
    return quality;
  }
}
