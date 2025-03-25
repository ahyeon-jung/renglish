import Button from '@/components/Button';
import StepHeader from '../StepHeader';

type StepFormContainer = {
  header: string;
  onNext: () => void;
} & React.PropsWithChildren &
  React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

export default function StepFormContainer({
  header,
  children,
  onNext,
  ...props
}: StepFormContainer) {
  const handleClickSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div>
      <StepHeader>{header}</StepHeader>
      <form onSubmit={handleClickSubmit} {...props}>
        <div>{children}</div>
        <Button type="submit">Next</Button>
      </form>
    </div>
  );
}
