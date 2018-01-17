const fs = require('fs');

fs.readFile('./pet.csv', (err, data) => {
  let parsedList = [];
  let petMap = {};
  if (err) throw err;
  data = data.toString().split('\r\n');
  data.forEach(line => {
    if (line) {
      line = line.split(',');
      let [startTime, endTime] = line[0].split(' - ').map(i => i.replace(/\./g, '-'));
      startTime += ':00';
      endTime = endTime.replace('24:00', '23:59:59');
      let data = [line[1], line[3]];
      petMap[line[1]] = petMap[line[1]] || line[2];
      petMap[line[3]] = petMap[line[3]] || line[4];
      parsedList.push({startTime, endTime, data});
      // console.log(startTime + ' ~ ' + endTime + '\t' + data.toString());
      // console.log(JSON.stringify(petMap));
    }
  });
  fs.writeFileSync('./rule-data/pets.json', JSON.stringify(parsedList, null, 2));
  fs.writeFileSync('./rule-data/pet-map.json', JSON.stringify(petMap, null, 2));
});