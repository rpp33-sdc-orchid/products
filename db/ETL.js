const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const results = [];
// const current = 1;

fs.createReadStream('clean_data/photo_small.csv')
.pipe(csv({escape: ':'}))
.on('headers', (headers) => {
    // const csvWriter = createCsvWriter(
    //   {path: 'clean_data/photo_small_clean.csv',
    //   header: [headers[0], headers[1], headers[2], headers[3]]
    // });
    console.log('header?', headers);
  })
  .on('data', (row) => {
    let id = parseInt(row.id);
    if(id >= 263) {
    //   console.log('row', row);
      // console.log(row.id, row.styleId, row.url, row.thumbnail_url);
      // console.log(row.id, 'problem?', row.thumbnail_url);
      // console.log('how long', row.thumbnail_url.split('\n').length);
      // console.log('after', row.thumbnail_url.split('\n').slice(0, 1)[0]);
      // if (row.thumbnail_url.split('\n').length > 1) {
      //   results.push({
      //     row.thumbnail_url
      //   })
      // }
    // }
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
    // results.push(data)
  })
  .on('end', () => {
    console.log('done');
    console.log('results', results);
  })