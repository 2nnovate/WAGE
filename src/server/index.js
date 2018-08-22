import express from 'express';
import morgan from 'morgan'; // HTTP REQUEST LOGGER
import bodyParser from 'body-parser'; // PARSE HTML BODY
import mongoose from 'mongoose';
import session from 'express-session';
import path from 'path';

import api from './routes';

const app = express();

/* mongodb connection */
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://localhost:27017/WAGE', { useNewUrlParser: true });
// npm run dev 를 통해 서버 실행시 오류 발생 -> 포트번호를 명시해주지 않아서 인듯.

app.use(session({
    secret: 'whatAreYouGonnaEat?$1$234',
    resave: false,
    saveUninitialized: true
}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api', api);

app.use(express.static("dist"));
app.get('*', function (req, res){
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});
//리액트라우터 돔이 동작하기 위한 설정

const port = 8080;

app.listen(port, () => console.log(`Listening on port ${port}!`));
