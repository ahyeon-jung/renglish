'use client';

import Button from '@/components/Button';
import Field from '@/components/Field';
import { MESSAGE } from '@/constants/toast';
import { PATHS } from '@/constants/path';
import Text from '@/components/Text';
import clsx from 'clsx';
import registerAction from '@/app/_actions/auth/register';
import sendEmail from '@/app/_actions/email-verification/sendEmail';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import verifyCode from '@/app/_actions/email-verification/verifyCode';

const INITIAL_REGISTER_BODY = { email: '', password: '' };

export default function Register() {
  const router = useRouter();

  const [registerBody, setRegisterBody] = useState(INITIAL_REGISTER_BODY);
  const [verificationCode, setVerifyCationCode] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isClickedSendEmailVerifyClicked, setIsClickedSendEmailVerifyClicked] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerifyCationCode(e.target.value);
  };
  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  const handleRegisterBodyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegisterBody((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendEmailVerifyClick = async () => {
    try {
      const { success } = await sendEmail({ email: registerBody.email });

      if (!success) {
        toast.error(MESSAGE.AUTH.ERROR.ALREADY_EXISTS);
        return;
      }

      setIsClickedSendEmailVerifyClicked(true);
      toast(MESSAGE.VERIFICATION.SUCCESS.SENT_EMAIL);
    } catch {
      toast.error(MESSAGE.COMMON.ERROR.SERVER);
    }
  };

  const handleVerifyCodeClick = async () => {
    try {
      const { success } = await verifyCode({ email: registerBody.email, code: verificationCode });
      if (!success) {
        toast.error(MESSAGE.VERIFICATION.ERROR.UNMATCHED_CODE);
        return;
      }

      setIsCodeVerified(true);
      toast(MESSAGE.VERIFICATION.SUCCESS.VERIFY_CODE);
    } catch {
      toast.error(MESSAGE.COMMON.ERROR.SERVER);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { success } = await registerAction(registerBody);
      if (!success) {
        toast.error(MESSAGE.AUTH.ERROR.UNMATCHED);
        return;
      }
      router.push(PATHS.AUTH.LOGIN);
    } catch {
      toast.error(MESSAGE.COMMON.ERROR.SERVER);
    } finally {
      setRegisterBody(INITIAL_REGISTER_BODY);
      setIsClickedSendEmailVerifyClicked(false);
      setIsCodeVerified(false);
      setVerifyCationCode('');
      setPasswordConfirm('');
    }
  };

  const isAllRequiredRegisterDataExists = registerBody.email && registerBody.password;
  const isVerifyEmail = isCodeVerified && isClickedSendEmailVerifyClicked;
  const isMatchedPasswordConfirm = registerBody.password === passwordConfirm;
  const isAvailableRegisterButton =
    isAllRequiredRegisterDataExists && isVerifyEmail && isMatchedPasswordConfirm;

  return (
    <main
      className={clsx(
        'mt-[var(--header-height)] p-3 pt-[100px]',
        'flex flex-col justify-center gap-4',
      )}
    >
      <Text as="h2" typography="display-lg">
        Register
      </Text>
      <form className="flex flex-col gap-3" onSubmit={handleRegisterSubmit}>
        <div className="flex flex-col gap-2">
          <Field>
            <Field.Label>Email</Field.Label>
            <Field.InputWithButton
              inputProps={{
                name: 'email',
                placeholder: 'ex. renglish@gmail.com',
                value: registerBody.email,
                onChange: handleRegisterBodyChange,
              }}
              buttonProps={{
                onClick: handleSendEmailVerifyClick,
                disabled: isClickedSendEmailVerifyClicked,
              }}
            />
          </Field>
          {isClickedSendEmailVerifyClicked && (
            <Field>
              <Field.Label>Email Verification Code</Field.Label>
              <Field.InputWithButton
                inputProps={{
                  placeholder: 'ex. ABCDEF',
                  value: verificationCode,
                  onChange: handleVerificationCodeChange,
                }}
                buttonProps={{
                  onClick: handleVerifyCodeClick,
                  disabled: !verificationCode,
                }}
              />
            </Field>
          )}
          <Field>
            <Field.Label>Password</Field.Label>
            <Field.Input
              name="password"
              placeholder="ex. 123456"
              value={registerBody.password}
              onChange={handleRegisterBodyChange}
            />
          </Field>
          <Field>
            <Field.Label>PasswordConfirm</Field.Label>
            <Field.Input
              placeholder="ex. 123456"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
            />
          </Field>
          <Field>
            <Field.Label>How did you find out about this page? (optional)</Field.Label>
            <Field.Input placeholder="e.g. reglish study, search engine, social media" />
          </Field>
        </div>
        <Button disabled={!isAvailableRegisterButton}>Register</Button>
      </form>
    </main>
  );
}
