import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();


export const genToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}