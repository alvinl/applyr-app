import { Router } from 'express';
import login from './login';
import register from './register';
import logout from './logout';
import username from './username';

const router = Router();

router.post('/api/user/login', login);
router.post('/api/user/register', register);
router.post('/api/user/logout', logout);
router.post('/api/user/username', username);

export default router;