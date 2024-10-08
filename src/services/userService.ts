import User from '../db-files/models/User';
import dns from 'dns';

const checkIfEmailExists = async(email: string): Promise<boolean> => {
  const existingUser = await User.findOne({ where: { email } });
  return existingUser !== null;
};

const checkIfUserExists = async(
  options: {
    email?: string,
    id?: string,
    resetToken?: string,
  },
): Promise<User | null> => {

  const { email, id, resetToken } = options;
  const query: { [key: string]: any } = {};

  // if any of the options are provided, add them to the query.
  resetToken ? query.resetToken = resetToken : null;
  email ? query.email = email : null;
  id ? query.id = id: null;
  const user = await User.findOne({ where: query });
  return user;
};

const userResponseFormatter = (user: User): object => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    dateOfBirth: user.dateOfBirth,
    mobileNumber: user.mobileNumber,
    role: user.role,
  };
};

const getEmailDomain = (email: string): string => {
  return email.split('@')[1];
};

const checkIfDomainSupportsEmail = (domain: string): Promise<boolean> => {
  let dnsPromise = new Promise((resolve, reject) => {
    dns.resolveMx(domain, (err, addresses) => {
      if (err) {
        reject(false);
      }
      if (addresses && addresses.length > 0) {
        resolve(true);
      }
      reject(false);
    });
  });
  return dnsPromise
  .then(res => true)
  .catch(rej => false);
};

export { 
  checkIfEmailExists,
  checkIfUserExists,
  userResponseFormatter,
  getEmailDomain,
  checkIfDomainSupportsEmail,
 };
