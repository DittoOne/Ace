import 'dotenv/config';
import { sendVerificationEmail } from './server/email.js';

const result = await sendVerificationEmail(
    'diptobhuiyan1999@gmail.com',
    'test-token-123'
);

console.log('Email sent:', result);

process.exit();