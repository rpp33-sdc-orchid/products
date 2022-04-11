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

const transformer = (row) => {
  if (row.id === 'id') {
    return;
  } else {
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
  }
};

// 1-10
// define writer
const writeStream = fs.createWriteStream(
  'clean_data/clean_photo/data1.csv'
);
// write header
writeStream.write(csvStringifier.getHeaderString());

// combine stream
const combinedStream_1 = CombinedStream.create();
for (var i = 1; i < 10; i++) {
  combinedStream_1.append(
    fs.createReadStream(`clean_data/splitcsv2/photos-${i}.csv`)
  );
}

combinedStream_1
.pipe(csv())
.on('headers', (headers) => {
    console.log('header?', headers);
})
.on('data', (row) => {
  transformer(row);
})
.on('end', () => {
  writeStream.write(csvStringifier.stringifyRecords(results));
  console.log('done');
});

// 11-20
// define writer
const writeStream = fs.createWriteStream(
  'clean_data/clean_photo/data2.csv'
);
// write header
writeStream.write(csvStringifier.getHeaderString());

// combine stream
const combinedStream_2 = CombinedStream.create();
for (var i = 11; i < 20; i++) {
  combinedStream_2.append(
    fs.createReadStream(`clean_data/splitcsv2/photos-${i}.csv`)
  );
}

combinedStream_2
.pipe(csv())
.on('headers', (headers) => {
    console.log('header?', headers);
})
.on('data', (row) => {
  transformer(row);
})
.on('end', () => {
  writeStream.write(csvStringifier.stringifyRecords(results));
  console.log('done');
});

// 21-29
// define writer
const writeStream = fs.createWriteStream(
  'clean_data/clean_photo/data3.csv'
);
// write header
writeStream.write(csvStringifier.getHeaderString());

// combine stream
const combinedStream_3 = CombinedStream.create();
for (var i = 21; i < 30; i++) {
  combinedStream_3.append(
    fs.createReadStream(`clean_data/splitcsv2/photos-${i}.csv`)
  );
}

combinedStream_3
.pipe(csv())
.on('headers', (headers) => {
    console.log('header?', headers);
})
.on('data', (row) => {
  transformer(row);
})
.on('end', () => {
  writeStream.write(csvStringifier.stringifyRecords(results));
  console.log('done');
});