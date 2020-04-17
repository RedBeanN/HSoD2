const fs = require('fs');

const nope = _ => {};

fs.readFile('./equip.json', (err, data) => {
  if (err) console.error(err);
  data = JSON.parse(data);
  for (let i of data) {
    delete i.evolve;
    delete i.max_intimacy;
    delete i.max_exp;
    delete i.prop_num;
    delete i.related;
    for (let k in i) {
      if (k.startsWith('display_prop') && (i[k] === '' || i[k] === null)) delete i[k];
    }
    if (i.display_image === '1486') i.display_image = '0';
    if (i.display_image == '1487') i.display_image = '0';
  }
  for (let i = 0; i < data.length; i++) {
    if (
      data[i].display_image == '0' ||
      data[i].display_title == '' ||
      data[i].display_title == '0'
    ) {
      // console.log(data[i]);
      data.splice(i, 1);
      i--;
    }
  }
  // console.log(data[0].display_image == '0');
  let pet = fs.readFileSync('./pet.json');
  pet = JSON.parse(pet);
  for (let i of pet) {
    delete i.evolve;
    delete i.cost;
    delete i.related;
    data.push(i);
  }
  // sort by image id
  data.sort((a, b) => {
    return parseInt(a.display_image) - parseInt(b.display_image);
  });
  console.log(data.length);
  fs.writeFile('sorted.json', JSON.stringify(data, null, 2), nope);
  // TODO: sorted map
  const map = {};
  for (let i in data) {
    map[data[i]['display_image']] = i;
  }
  fs.writeFile('sortmap.json', JSON.stringify(map), nope);
  const mini = {
    weapon: [],
    costume: [],
    passive_skill: [],
    pet: [],
  };
  for (let i of data) {
    const item = i.display_image + '$'
               + i.rarity + '$'
               + i.display_title;
    // item['star'] = i.rarity;
    // skip stigmata skill
    if (i.display_image != 2545 && i.display_image != 2546) mini[i.type].push(item)
  }
  // fs.readFile('./pets.json', (err, data) => {
  //   if (err) console.error(err);
  //   mini.pet = [];
  //   let {pets, spec} = JSON.parse(data);
  //   for (let i in pets) {
  //     let st = spec[i] || [5, 6];
  //     for (let si in st) {
  //       let s = st[si];
  //       let item = `${Number(pets[i]) + Number(si)}$${s}$${i}`;
  //       mini['pet'].push(item);
  //     }
  //   }
  //   fs.writeFile('minify.json', JSON.stringify(mini), nope)
  // });
  fs.writeFile('minify.json', JSON.stringify(mini), nope);
})
