import Button from '@/components/Button';
import StepIndicator from '../StepIndicator';

type StepFormContainer = {
  onNext: () => void;
  disabled?: boolean;
} & React.PropsWithChildren &
  React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

export default function StepFormContainer({
  children,
  onNext,
  disabled = false,
  onSubmit,
  ...props
}: StepFormContainer) {
  const handleClickSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      onSubmit?.(e);
      onNext();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <StepIndicator />
      <form className="flex flex-col gap-4" onSubmit={handleClickSubmit} {...props}>
        <div className="flex flex-col gap-3">{children}</div>
        <Button type="submit" disabled={disabled}>
          Save and Next
        </Button>
      </form>
    </div>
  );
}
