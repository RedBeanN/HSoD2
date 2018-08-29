const fs = require('fs');

const nope = _ => {};

fs.readFile('./equip.json', (err, data) => {
  if (err) console.error(err);
  data = JSON.parse(data);
  // sort by image id
  data.sort((a, b) => {
    return parseInt(a.display_image) - parseInt(b.display_image);
  });
  for (let i of data) {
    delete i.evolve;
    delete i.max_intimacy;
    delete i.max_exp;
    delete i.prop_num;
    for (let k in i) {
      if (k.startsWith('display_prop') && i[k] === '') delete i[k];
    }
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i].display_image == '0' || data[i].display_title == '') {
      // console.log(data[i]);
      data.splice(i, 1);
      i--;
    }
  }
  // console.log(data[0].display_image == '0');
  // data.splice(0,1);
  fs.writeFile('sorted.json', JSON.stringify(data, null, 2), nope);
  const mini = {
    weapon: [],
    costume: [],
    passive_skill: []
  };
  for (let i of data) {
    const item = i.display_image + '$'
               + i.rarity + '$'
               + i.display_title;
    // item['star'] = i.rarity;
    // skip stigmata skill
    if (i.display_image != 2545 && i.display_image != 2546) mini[i.type].push(item)
  }
  fs.writeFile('minify.json', JSON.stringify(mini), nope)
})
