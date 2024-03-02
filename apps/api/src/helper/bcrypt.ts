import bcrypt from 'bcrypt';
export const hashPaswword = async (password: string): Promise<string> => {
  const saltRoundes = 10;
  return await bcrypt.hash(password, saltRoundes);
};

export const comparePasswords = async (
  candidatePassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};