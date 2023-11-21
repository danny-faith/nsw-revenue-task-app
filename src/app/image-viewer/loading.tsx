import { Spinner } from "../components/Spinner";

export default function Loading() {
  return (
    <div className="h-screen w-screen flex justify-center align-middle">
      <Spinner />
    </div>
  );
}
