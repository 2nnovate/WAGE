import express from 'express';
import account from './account';
import store from './store';

const router = express.Router();
router.use('/account', account);

export default router;
