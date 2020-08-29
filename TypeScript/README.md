## How to use this Kata

Pre-req:

NodeJS installed on your Mac/PC

Yarn installed on your Mac/PC if you prefer it over npm

In terminal execute following commands:

`npm install` or `yarn install`

`npm test` or `yarn test` - to execute unit tests

`npm run start` or `yarn run start` - to use the gilded rose for your needs modifying `golden-master-text-test.ts`


## Explanations

* Not altering Item class I understand as not changing its interface. But logically adding code to the class is
normal thing so my preferred solution is in `gilded-rose-altered-item.ts` file.

* However, just in case this Item class cannot be modified on purpose I also refactored original file.

* Following Agile principles to not over-complex system without current need having several if statements in 
this case is still ok in updateQuality method, but if requirements expand and we have more cases 
we would need to map item to quality update strategy and use dependency injection to set correct strategy 
for qualityCalculator service to calculate quality. 
