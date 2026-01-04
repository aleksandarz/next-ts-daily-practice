import CounterDisplay from "@/app/components/CounterDisplay";
import CounterControls from "@/app/components/CounterControls";
import ResetButton from "@/app/components/ResetButton";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center h-full m-10">
        <CounterDisplay />
        <CounterControls />
        <ResetButton />
      </main>
    </>
  );
}
