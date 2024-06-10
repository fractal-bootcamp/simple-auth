import { User, UserWithoutPassword, SessionToken } from'~/types';

const DEFAULT_TIMEOUT = 3600000;  // One hour

const users: User[] = [
  {
    id: 1,
    email: 'firkraag@dragons.rawr',
    password: 'rawrx3'
  }
];
const sessionTokens: SessionToken[] = [];

let currentUserId = 2;
function generateUserId(): number {
  return currentUserId++;
}

let currentToken = 0;
function generateToken(): number {
  return currentToken++;
}

function createUser(pEmail: string, pPassword: string): UserWithoutPassword | undefined {
  if (doesEmailExist(pEmail)) return undefined;
  const newUser: User = {
    id: generateUserId(),
    email: pEmail.toLowerCase(),
    password: pPassword
  };
  users.push(newUser);
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

function createToken(userId: number): SessionToken | undefined {
  if (!userId) return undefined;
  const token: SessionToken = {
    token: generateToken(),
    userId,
    expires: new Date().getTime() + DEFAULT_TIMEOUT,
    isInvalid: false
  };
  sessionTokens.push(token);
  return token;
}

function doesEmailExist(email: string): boolean {
  return Boolean(users.find(user => user.email.toLowerCase() === email.toLowerCase()));
}

// Unsafe to export; exposes password
function getUserByToken(token: number): User | undefined {
  if (!validateSessionToken(token)) return undefined;
  return getUserById(sessionTokens.find(sessionToken => sessionToken.token === token)?.userId);
}

function getUserWithoutPasswordByToken(token: number): UserWithoutPassword | undefined {
  const user = getUserByToken(token);
  if (!user) return undefined;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

function getUserById(id: number): User | undefined {
  return users.find(user => user.id === id);
}

function invalidateSessionToken(token: number): void {
  const tokenToInvalidate = validateSessionToken(token);
  if (tokenToInvalidate) tokenToInvalidate.isInvalid = true;
}

function validateSessionToken(token: number): SessionToken | undefined {
  const timeNow = new Date().getTime();
  return sessionTokens.find(sessionToken => sessionToken.token === token && sessionToken.expires >= timeNow && !sessionToken.isInvalid);
}

function validateUser(email: string, password: string): User | undefined {
  return users.find(user => user.email === email && user.password === password);
}

const serverState = {
  createToken,
  createUser,
  doesEmailExist,
  getUserWithoutPasswordByToken,
  invalidateSessionToken,
  validateSessionToken,
  validateUser
};

export default serverState;