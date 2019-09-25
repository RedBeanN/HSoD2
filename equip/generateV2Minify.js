const fs = require('fs');
const all = require('./V2/all');

const data = {
  weapon: [],
  costume: [],
  passiveSkill: [],
  pet: [],
};

const getMinify = equip => {
  const { uid, id, rarity, img, title } = equip;
  return `${uid}$${id}$${rarity}$${img}$${title}`;
}

for (let equip of all) {
  let type = 'passiveSkill';
  if ('ultraSkill' in equip) type = 'pet';
  else if ('baseType' in equip) type = 'weapon';
  else if ('hpBase' in equip) type = 'costume';
  data[type] && data[type].push(getMinify(equip));
}
fs.writeFileSync('./V2/minify.json', JSON.stringify(data, null, 2));
