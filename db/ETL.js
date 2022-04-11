const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const CombinedStream = require('combined-stream');
const fs = require('fs');
const results = [];

const csvStringifier = createCsvStringifier({
  header: [
    {id: 'id', title: 'id'},
    {id: 'styleId', title: 'styleId'},
    {id: 'url', title: 'url'},
    {id: 'thumbnail_url', title: 'thumbnail_url'}
  ]
});

// combine stream
const combinedStream = CombinedStream.create();
for (var i = 1; i <= 114; i++) {
  combinedStream.append(
    fs.createReadStream(`clean_data/splitcsv/photos-${i}.csv`)
  );
}

// define writer
const writeStream = fs.createWriteStream(
  'clean_data/photos_test.csv'
);
// write header
writeStream.write(csvStringifier.getHeaderString());


const transformer = (row) => {
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
};


combinedStream
.pipe(csv())
.on('data', (row) => {
  transformer(row);
})
.on('end', () => {
  writeStream.write(csvStringifier.stringifyRecords(results));
  console.log('done');
})



// fs.createReadStream('clean_data/splitcsv/photos-1.csv')
// .pipe(csv())
// .on('headers', (headers) => {
//     console.log('header?', headers);
// })
// .on('data', (row) => {
//   // let id = parseInt(row.id);
//   if (row.thumbnail_url.split('\n').length > 1) {
//     results.push({
//       id: row.id,
//       styleId: row.styleId,
//       url: row.url,
//       thumbnail_url: row.thumbnail_url.split('\n').slice(0, 1)[0]
//     });
//   } else {
//     results.push({
//       id: row.id,
//       styleId: row.styleId,
//       url: row.url,
//       thumbnail_url: row.thumbnail_url
//     });
//   }
// })
// .on('end', () => {
//   // console.log('result?', results);
//   writeStream.write(csvStringifier.stringifyRecords(results));
//   console.log('done');
// });