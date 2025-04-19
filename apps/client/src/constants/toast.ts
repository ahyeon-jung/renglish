export const MESSAGE = {
  COMMON: {
    ERROR: { SERVER: 'Server error. Please try again later.', FAIL: 'Sorry, try later' },
    SUCCESS: { SAVE: 'Saved successfully' },
  },
  AUTH: {
    ERROR: {
      ALREADY_EXISTS: 'This email is already registered.',
      UNMATCHED: 'Incorrect email or password.',
      NOT_FOUND: 'This email does not exist.',
    },
  },
  VERIFICATION: {
    SUCCESS: {
      SENT_EMAIL: 'Check your inbox to confirm your email.',
      VERIFY_CODE: 'The verification code is correct.',
    },
    ERROR: {
      UNSENT_EMAIL: 'Failed to send the email. Please try again later.',
      UNMATCHED_CODE: 'The verification code is incorrect.',
    },
  },
};
