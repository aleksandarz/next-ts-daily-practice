
export type CountType = {
  count: number;
  step: number;
  increment: () => void;
  decrement: () => void;
  changeStep: (newStep: number) => void;
}