'use client';

import Button from '@/components/Button';
import Field from '@/components/Field';
import { MESSAGE } from '@/constants/toast';
import { UserType } from '@/types/user';
import { toast } from 'react-toastify';
import updateNicknameAction from '@/app/actions/my/updateNickname';
import { useState } from 'react';

type NicknameProps = Pick<UserType, 'id' | 'nickname'>;

export default function Nickname({ nickname }: NicknameProps) {
  const [nicknameValue, setNicknameValue] = useState(nickname);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameValue(e.target.value);
  };
  const handleNicknameChangeClick = async () => {
    try {
      const { success } = await updateNicknameAction({ nickname: nicknameValue });
      if (!success) {
        toast.error(MESSAGE.COMMON.ERROR.FAIL);
      }

      toast(MESSAGE.COMMON.SUCCESS.SAVE);
    } catch {
      toast.error(MESSAGE.COMMON.ERROR.SERVER);
    }
  };
  return (
    <Field>
      <Field.Label>Nickname</Field.Label>
      <Field.Input value={nicknameValue} onChange={handleNicknameChange} />
      {nicknameValue && <Button onClick={handleNicknameChangeClick}>Save</Button>}
    </Field>
  );
}
