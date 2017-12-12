/**
 * Validate an email
 */

export const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

/**
 * Validate an email
 */

export const validatePhone = phone => {
  const re = /^([0|+[0-9]{1,5})?([0-9]{10})$/g;

  return re.test(phone);
};

/**
 * Password Check Security
 */

export const pwdSecurityLevel = password => {
  const strongRegex = new RegExp(
    '^((?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z]).{6,}|.{15,})$',
    'g',
  );
  const mediumRegex = new RegExp('^((?=.*[a-z])(?=.*[A-Z]).{6,}|.{12,})$', 'g');

  if (password.length < 6) {
    return 'small';
  } else if (strongRegex.test(password)) {
    return 'strong';
  } else if (mediumRegex.test(password)) {
    return 'medium';
  }
  return 'weak';
};
