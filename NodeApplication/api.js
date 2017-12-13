const express = require('express');
const EventEmitter = require('events');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const toDoDb = require('./config/toDoDB');
const testDb = require('./config/testDB');
const routes = require('./routes');

const app = express();
const port = 3000;

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json(), (req, res, next) => {
  next();
});

app.use(methodOverride());

MongoClient.connect(testDb.url, (error, database) => {
  if (error) return console.log(error);
  routes(app, database);

  app.listen(port, () => {
    console.log(`We are live on ${port}`);
  });

  app.use((err, req, res, next) => {
    const isNotFound = err.message.indexOf('not found');
    const isCastError = err.message.indexOf('Cast to ObjectId failed');
    const isIncorrectDataError = err.message.indexOf('incorrect data');
    if (Object.is(isIncorrectDataError, 0)) {
      res.send(400);
    } else if (err.message && (isNotFound || isCastError)) {
      return next();
    }
    res.status(500).json({ error: err.stack });
  });
  app.use((req, res) => {
    res.send(404);
  });
});

const poem = ['У лукоморья дуб зелёный;',
  'Златая цепь на дубе том:',
  'И днём и ночью кот учёный',
  'Всё ходит по цепи кругом,',
  'Идёт направо  песнь заводит;',
  'Налево - сказку говорит.',
  'Там чудеса: там леший бродит,',
  'Русалка на ветвях сидит;',
  'Там на неведомых дорожках',
  'Следы невиданных зверей;',
  'Избушка там на курьих ножках',
  'Стоит без окон, без дверей;',
  'Там лес и дол видений полны;',
  'Там о заре прихлынут волны',
  'На брег песчаный и пустой,',
  'И тридцать витязей прекрасных',
  'Чредой из вод выходят ясных,',
  'И с ними дядька их морской;',
  'Там королевич мимоходом',
  'Пленяет грозного царя;',
  'Там в облаках перед народом',
  'Через леса, через моря',
  'Колдун несёт богатыря;',
  'В темнице там царевна тужит,',
  'А бурый волк ей верно служит;',
  'Там ступа с Бабою Ягой',
  'Идёт, бредёт сама собой,',
  'Там царь Кащей над златом чахнет;',
  'Там русский дух... там Русью пахнет!',
  'И там я был, и мёд я пил;',
  'У моря видел дуб зелёный;',
  'Под ним сидел, и кот учёный',
  'Свои мне сказки говорил.'];

function getRandom(min, max, num) {
  return Math.floor(Math.floor(Math.random() * (max - min + 1) + min) / num) * num;
}
app.get('/poem', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
  });

  const counter = 0;

  function Timer(count) {
    const temp = getRandom(1000, 5000, 1000);

    setTimeout(() => {
      res.write(`<p style="margin-left: 40%">${poem[count]}</p>`);
      if (count < poem.length - 1) {
        Timer(++count);
      } else {
        res.end();
      }
    }, temp);
  }

  Timer(counter);
});

module.exports = app;
