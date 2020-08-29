import { expect } from 'chai';
import {GildedRose} from '../app/gilded-rose';
import {Item} from '../app/model/item';
import {ITEM_NAMES} from '../app/model/enums';

describe('Gilded Rose', function () {

    let gildedRose: GildedRose;
    let result = [] as Array<Item>;

    it(`should increase ${ITEM_NAMES.AGED_BRIE} with quality  20 to max 50 over 30 days`, function() {
        givenGildedRoseWithItems([ new Item(ITEM_NAMES.AGED_BRIE, 10, 20) ]);
        whenDaysNumberPassed(30);
        thenItemsQualityIs(50);
    });

    it(`should not increase ${ITEM_NAMES.AGED_BRIE} with quality 20 to more than max 50 over 32 days`, function() {
        givenGildedRoseWithItems([ new Item(ITEM_NAMES.AGED_BRIE, 10, 20) ]);
        whenDaysNumberPassed(32);
        thenItemsQualityIs(50);
    });

    it(`should not change ${ITEM_NAMES.SULFURAS} quality over 32 days`, function() {
        givenGildedRoseWithItems([ new Item(ITEM_NAMES.SULFURAS, 10, 80) ]);
        whenDaysNumberPassed(32);
        thenItemsQualityIs(80);
    });

    it(`should not change ${ITEM_NAMES.SULFURAS} quality even with negative sellIn days`, function() {
        givenGildedRoseWithItems([ new Item(ITEM_NAMES.SULFURAS, -1, 80) ]);
        whenDaysNumberPassed(32);
        thenItemsQualityIs(80);
    });

    it(`should decrease ${ITEM_NAMES.DEXTERITY} quality according to amount of days passed`, function() {
        givenGildedRoseWithItems([ new Item(ITEM_NAMES.DEXTERITY, 10, 40) ]);
        whenDaysNumberPassed(10);
        thenItemsQualityIs(30);
    });

    it(`should not decrease any item quality more than 0`, function() {
        givenGildedRoseWithItems([ new Item(ITEM_NAMES.ELIXIR, 10, 10) ]);
        whenDaysNumberPassed(15);
        thenItemsQualityIs(0);
    });

    it(`should not decrease ${ITEM_NAMES.DEXTERITY} quality more than 0`, function() {
        givenGildedRoseWithItems([ new Item(ITEM_NAMES.DEXTERITY, 10, 10) ]);
        whenDaysNumberPassed(15);
        thenItemsQualityIs(0);
    });

    it(`should decrease ${ITEM_NAMES.DEXTERITY} quality twice fast after sell date passed`, function() {
        givenGildedRoseWithItems([ new Item(ITEM_NAMES.DEXTERITY, 10, 30) ]);
        whenDaysNumberPassed(15);
        thenItemsQualityIs(10);
    });

    it(`should decrease ${ITEM_NAMES.DEXTERITY} quality twice fast after sell date passed check upper limit`, function() {
        givenGildedRoseWithItems([ new Item(ITEM_NAMES.DEXTERITY, 11, 30) ]);
        whenDaysNumberPassed(15);
        thenItemsQualityIs(11);
    });

    it(`should decrease ${ITEM_NAMES.DEXTERITY} quality twice fast after sell date passed check lower limit`, function() {
        givenGildedRoseWithItems([ new Item(ITEM_NAMES.DEXTERITY, 9, 30) ]);
        whenDaysNumberPassed(15);
        thenItemsQualityIs(9);
    });

    it(`should increase ${ITEM_NAMES.BACKSTAGE} quality twice fast between 5 and 10 days before sell date`, function() {
        givenGildedRoseWithItems([ new Item(ITEM_NAMES.BACKSTAGE, 10, 30) ]);
        whenDaysNumberPassed(5);
        thenItemsQualityIs(40);
    });

    it(`should not increase ${ITEM_NAMES.BACKSTAGE} quality more than max 50 when entering last 10 days period`, function() {
        givenGildedRoseWithItems([ new Item(ITEM_NAMES.BACKSTAGE, 12, 40) ]);
        whenDaysNumberPassed(12);
        thenItemsQualityIs(50);
    });

    it(`should not increase ${ITEM_NAMES.BACKSTAGE} quality more than max 50 when last 5 days left until sell date`, function() {
        givenGildedRoseWithItems([ new Item(ITEM_NAMES.BACKSTAGE, 5, 40) ]);
        whenDaysNumberPassed(5);
        thenItemsQualityIs(50);
    });

    it(`should increase ${ITEM_NAMES.BACKSTAGE} quality three times fast between 0 and 5 days before sell date`, function() {
        givenGildedRoseWithItems([ new Item(ITEM_NAMES.BACKSTAGE, 5, 30) ]);
        whenDaysNumberPassed(5);
        thenItemsQualityIs(45);
    });

    it(`should clear ${ITEM_NAMES.BACKSTAGE} quality after sell date`, function() {
        givenGildedRoseWithItems([ new Item(ITEM_NAMES.BACKSTAGE, 5, 30) ]);
        whenDaysNumberPassed(6);
        thenItemsQualityIs(0);
    });

    it(`should initialize Gilded Rose with empty array if no constructor params provided`, function() {
        givenGildedRoseWithItems();
        whenDaysNumberPassed(1); // required because items is private var or need to make items static
        thenGildedRoseIsEmpty();
    });

    it(`should decrease conjured ${ITEM_NAMES.MANA_CAKE} quality twice fast as regular item according to amount of days passed`, function() {
        givenGildedRoseWithItems([ new Item(ITEM_NAMES.MANA_CAKE, 10, 40) ]);
        whenDaysNumberPassed(10);
        thenItemsQualityIs(20);
    });

    function givenGildedRoseWithItems(items?: Array<Item>) {
        gildedRose = new GildedRose(items);
    }

    function whenDaysNumberPassed(numberOfDays: number) {
        for(let i = 0; i < numberOfDays; i++) {
            result = gildedRose.updateQuality();
        }
    }

    function thenItemsQualityIs(value: number) {
        expect(result[0].quality).to.equal(value);
    }

    function thenGildedRoseIsEmpty() {
        expect(result).is.empty;
    }

});
