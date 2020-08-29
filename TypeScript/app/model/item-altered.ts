import {ITEM_QUALITY_TYPES, QUALITY_TYPES} from './enums';
import {Constants} from '../constants';

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  get sellDatePassed() {
    return this.sellIn < 0;
  }

  get hasReachedDoubleQualityDate() {
    return this.sellIn < Constants.DOUBLE_QUALITY_DAYS_LIMIT;
  }

  get hasReachedTripleQualityDate() {
    return this.sellIn < Constants.TRIPLE_QUALITY_DAYS_LIMIT;
  }

  hasQualityType(qualityType: QUALITY_TYPES) {
    return ITEM_QUALITY_TYPES[qualityType.toUpperCase()].includes(this.name);
  }

}
