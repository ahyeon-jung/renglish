import { FunnelContext, FunnelContextType } from '@/hooks/useFunnel';

import Button from '@/components/Button';
import { ScriptAddBodyType } from '../../page';
import { ScriptAddStepType } from '../../_constants/step';
import { useContext } from 'react';

export default function SubmitConfirm() {
  const { data } = useContext(FunnelContext) as FunnelContextType<
    ScriptAddStepType,
    ScriptAddBodyType
  >;

  const handleAddScriptSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(data);
  };
  return (
    <form onSubmit={handleAddScriptSubmit}>
      Almost Done!
      <Button>Add Script</Button>
    </form>
  );
}
