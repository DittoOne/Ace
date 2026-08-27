import { verifyEmailToken } from './server/auth/verification-token.js';

const token = 'c28f0bbdf8ad976c8d54c95d4e90cadaafe6c0914108d1eb56322d55c9999148';

const userId = await verifyEmailToken(token);

console.log('Email verified for user:', userId);

process.exit();