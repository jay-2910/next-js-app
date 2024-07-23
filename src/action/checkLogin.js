import { getUserByEmail } from '@/lib/prisma';
var bcrypt = require('bcryptjs');

async function checkLogin(email, password) {
  const user = await getUserByEmail(email);
  if (user) {
    const match = await bcrypt.compare(password, user?.password);
    if (match) {
      return user;
    }
    return null;
  }
  return null;
}

export default checkLogin;