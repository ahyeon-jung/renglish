'use server';

import { Dialogue } from '@/types/dialogue';
import { ENV } from '@/constants/env';
import { cookies } from 'next/headers';
import { fetchAPI } from '@/libs/api';

type UpdateDialogueActionBody = {
  english_script?: string;
  korean_script?: string;
  order?: number;
};

export default async function updateDialogueAction(
  dialogueId: string,
  updateDialogueActionBody: UpdateDialogueActionBody,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;

  const response = await fetchAPI<Dialogue>(`/dialogues/${dialogueId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateDialogueActionBody),
  });

  return {
    status: 200,
    success: true,
    message: 'Upload Dialogue successfully',
    data: response.data,
  };
}
