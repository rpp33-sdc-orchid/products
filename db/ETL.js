const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const fs = require('fs');
const results = [];
// const current = 1;

// const csvWriter = createCsvWriter({
//   path: 'clean_data/photos_small_clean_write.csv',
//   header: [
//     {id: 'id', title: 'id'},
//     {id: 'styleId', title: 'styleId'},
//     {id: 'url', title: 'url'},
//     {id: 'thumbnail_url', title: 'thumbnail_url'}
//   ]
// });

const csvStringifier = createCsvStringifier({
  header: [
    {id: 'id', title: 'id'},
    {id: 'styleId', title: 'styleId'},
    {id: 'url', title: 'url'},
    {id: 'thumbnail_url', title: 'thumbnail_url'}
  ]
});

const writeStream = fs.createWriteStream(
  'clean_data/photos_test.csv'
);
writeStream.write(csvStringifier.getHeaderString());

fs.createReadStream('clean_data/splitcsv/photos-1.csv')
.pipe(csv())
.on('headers', (headers) => {
    console.log('header?', headers);
})
.on('data', (row) => {
  // let id = parseInt(row.id);
  // console.log('row', row);
  // console.log(row.id, row.styleId, row.url, row.thumbnail_url);
  // console.log(row.id, 'problem?', row.thumbnail_url);
  // console.log('how long', row.thumbnail_url.split('\n').length);
  // console.log('after', row.thumbnail_url.split('\n').slice(0, 1)[0]);
  // if (id === 263) {
    if (row.thumbnail_url.split('\n').length > 1) {
      results.push({
        id: row.id,
        styleId: row.styleId,
        url: row.url,
        thumbnail_url: row.thumbnail_url.split('\n').slice(0, 1)[0]
      });
    } else {
      results.push({
        id: row.id,
        styleId: row.styleId,
        url: row.url,
        thumbnail_url: row.thumbnail_url
      });
    }
  // }
})
.on('end', () => {
  // csvWriter.writeRecords(results)
  // .then(() => {
  //   console.log('done')
  // }).catch((err) => {
  //   console.log('err');
  // });
  console.log('result?', results);
  writeStream.write(csvStringifier.stringifyRecords(results));
  console.log('done');
  // console.log('results', results);
});