import cors from 'cors';
import config from './config';
import express from 'express';
import passport from 'passport';
import store from 'connect-mongo';
import session from 'express-session';
import passportManager from './utils/passport';
import mongooseConnect from './utils/mongoose';
import authRouter from './routes/auth';
import dashboardRouter from './routes/dashboard';
const app = express();

app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    name: 'discord',
    store: store.create({
      mongoUrl: config.mongoURL
    })
}));

// Cors
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credientials: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

/// Passport
app.use(passport.session());
app.use(passport.initialize());
passportManager();

/// Routes
app.use('/api/auth', authRouter);
app.use("/api/dashboard", dashboardRouter);

/// Listen
app.listen(config.port, () => {
    console.log('Server is running on port: ' + config.port);
});

/// MongoDB
mongooseConnect();