import { FunnelContext, FunnelContextType } from '@/hooks/useFunnel';

import Button from '@/components/Button';
import { PATHS } from '@/constants/path';
import { ScriptAddBodyType } from '../../page';
import { ScriptAddStepType } from '../../_constants/step';
import uploadScriptAction from '@/app/_actions/admin/uploadScript';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';

export default function SubmitConfirm() {
  const router = useRouter();
  const { data } = useContext(FunnelContext) as FunnelContextType<
    ScriptAddStepType,
    ScriptAddBodyType
  >;

  const handleAddScriptSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await uploadScriptAction(data);

      if (response.success) {
        router.push(PATHS.ADMIN.HOME);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleAddScriptSubmit}>
      Almost Done!
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <Button>Add Script</Button>
    </form>
  );
}
