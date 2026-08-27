import { registerUser } from './server/auth/register.js';
import { createVerificationToken, hashVerificationToken } from './server/auth/verification-token.js';

const user = await registerUser(
  'zarintas95@gmail.com',
  'TestPassword123!'
);

const token = await createVerificationToken(user.id);
const tokenHash = hashVerificationToken(token);

console.log('User:', user);
console.log('Raw token:', token);
console.log('Token hash:', tokenHash);

process.exit();