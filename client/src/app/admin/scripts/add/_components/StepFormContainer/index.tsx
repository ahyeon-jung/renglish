import Button from '@/components/Button';
import StepHeader from '../StepHeader';

type StepFormContainer = {
  header: string;
  onNext: () => void;
  disabled?: boolean;
} & React.PropsWithChildren &
  React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

export default function StepFormContainer({
  header,
  children,
  onNext,
  disabled = false,
  ...props
}: StepFormContainer) {
  const handleClickSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="flex flex-col gap-4">
      <StepHeader>{header}</StepHeader>
      <form className="flex flex-col gap-4" onSubmit={handleClickSubmit} {...props}>
        <div className="flex flex-col gap-3">{children}</div>
        <Button type="submit" disabled={disabled}>
          Next
        </Button>
      </form>
    </div>
  );
}
