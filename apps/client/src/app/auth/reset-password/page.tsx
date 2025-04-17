'use client';

import Button from '@/components/Button';
import AuthContainer from '../_components/AuthContainer';
import Field from '@/components/Field';
import { useState } from 'react';
import resetPasswordAction from '@/app/_actions/auth/reset-password';
import { MESSAGE } from '@/constants/toast';
import { toast } from 'react-toastify';
import { PATHS } from '@/constants/path';
import { useRouter } from 'next/navigation';

export default function PasswordResetPage() {
  const router = useRouter();

  const [isClickedSendEmailVerifyClicked, setIsClickedSendEmailVerifyClicked] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [passwordResetBody, setPasswordResetBody] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handlePasswordResetSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { success } = await resetPasswordAction(passwordResetBody);
      if (!success) {
        toast.error(MESSAGE.AUTH.ERROR.UNMATCHED);
        return;
      }
      router.push(PATHS.AUTH.LOGIN);
    } catch {
      toast.error(MESSAGE.COMMON.ERROR.SERVER);
    }
  };

  const handlePasswordResetBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordResetBody({ ...passwordResetBody, [e.target.name]: e.target.value });
  };

  const handleSendEmailVerifyClick = () => {
    setIsClickedSendEmailVerifyClicked(true);
  };

  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  const handleVerifyCodeClick = () => {
    setIsCodeVerified(true);
  };

  const isAllRequiredRegisterDataExists =
    passwordResetBody.email && passwordResetBody.password && passwordResetBody.passwordConfirm;
  const isVerifyEmail = isCodeVerified && isClickedSendEmailVerifyClicked;
  const isMatchedPasswordConfirm = passwordResetBody.password === passwordResetBody.passwordConfirm;
  const isAvailablePasswordResetButton =
    isAllRequiredRegisterDataExists && isVerifyEmail && isMatchedPasswordConfirm;

  return (
    <AuthContainer title="Password Reset">
      <form className="flex flex-col gap-3" onSubmit={handlePasswordResetSubmit}>
        <div className="flex flex-col gap-2">
          <Field>
            <Field.Label>Email</Field.Label>
            <Field.InputWithButton
              inputProps={{
                name: 'email',
                placeholder: 'ex. renglish@gmail.com',
                value: passwordResetBody.email,
                onChange: handlePasswordResetBodyChange,
              }}
              buttonProps={{
                onClick: handleSendEmailVerifyClick,
                disabled: isClickedSendEmailVerifyClicked,
              }}
            />
          </Field>
          <Field>
            <Field.Label>Email Verification Code</Field.Label>
            <Field.InputWithButton
              inputProps={{
                readOnly: !isClickedSendEmailVerifyClicked,
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
          <Field>
            <Field.Label>Password</Field.Label>
            <Field.Input
              type="password"
              name="password"
              placeholder="ex. 123456"
              value={passwordResetBody.password}
              onChange={handlePasswordResetBodyChange}
            />
          </Field>
          <Field>
            <Field.Label>PasswordConfirm</Field.Label>
            <Field.Input
              type="password"
              name="passwordConfirm"
              placeholder="ex. 123456"
              value={passwordResetBody.passwordConfirm}
              onChange={handlePasswordResetBodyChange}
            />
          </Field>
        </div>
        <Button disabled={!!isAvailablePasswordResetButton}>Password Reset</Button>
      </form>
    </AuthContainer>
  );
}
