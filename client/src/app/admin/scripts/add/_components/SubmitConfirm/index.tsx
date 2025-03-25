import { FunnelContext, FunnelContextType } from '@/hooks/useFunnel';

import Button from '@/components/Button';
import { ScriptAddBodyType } from '../../page';
import { ScriptAddStepType } from '../../_constants/step';
import uploadScriptAction from '@/app/@actions/admin/uploadScript';
import { useContext } from 'react';

export default function SubmitConfirm() {
  const { data } = useContext(FunnelContext) as FunnelContextType<
    ScriptAddStepType,
    ScriptAddBodyType
  >;

  const handleAddScriptSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await uploadScriptAction(data);

      if (response) {
        console.log('WoW');
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
