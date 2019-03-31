var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('.data/db.json');
var db = low(adapter);
// default avatar upgrades
db.defaults({ avatar_upgrades: [
      {"id":"Chip", 
       "url":"https://cdn.glitch.com/7001d18b-ab06-4934-84ee-f9bc0645e42c%2Fchip_eyes_pack.glb?1553596528401",
        "position":"0 4 0"},
       {"id":"Liz", 
       "url":"https://cdn.glitch.com/7001d18b-ab06-4934-84ee-f9bc0645e42c%2Fchippewa.glb?1553596541620",
        "position":"0 4 10"}
    ]
  }).write();
let express = require('express');
var app = express();
var http = require('http').Server(app);
app.use(express.static('public'));
app.get("/", function (request, response) {
  response.sendFile('./public/index.html',{root:'.'});
}); 
// removes entries from avatar_upgrades and populates it with defaults
app.get("/reset", function (request, response) {
  // removes all entries from the collection
  db.get('avatar_upgrades')
  .remove()
  .write()
  console.log("Database cleared of avatar_upgrades");
  
  // default avatar_upgrades inserted in the database
  var avatar_upgrades= [
       {"id":"Chip", 
       "url":"https://cdn.glitch.com/7001d18b-ab06-4934-84ee-f9bc0645e42c%2Fchip_eyes_pack.glb?1553596528401",
        "position":"0 4 0"},
       {"id":"Liz", 
       "url":"https://cdn.glitch.com/7001d18b-ab06-4934-84ee-f9bc0645e42c%2Fchippewa.glb?1553596541620",
        "position":"0 4 10"}
  ];
  
  avatar_upgrades.forEach(function(au){
    db.get('avatar_upgrades')
      .push({ id: au.id, url: au.url, position: au.position })
      .write()
  });
  console.log("Default avatar_upgrades added");
  response.redirect("/");
});

// removes all entries from the collection
app.get("/clear", function (request, response) {
  // removes all entries from the collection
  db.get('avatar_upgrades')
  .remove()
  .write()
  console.log("Database avatar_upgrades collection cleared");
  response.redirect("/");
});

// gets and sends all entries from the collection
app.get("/avatar_upgrades", function (request, response) {
  var aus = db.get('avatar_upgrades').value() // Find all avatar_upgrades in the collection
  response.send(aus); 
});

app.set('port', (process.env.PORT || 5000));
http.listen(app.get('port'), function(){
  console.log('listening on port',app.get('port'));
});      
      