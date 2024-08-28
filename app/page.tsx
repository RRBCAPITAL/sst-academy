import Image from "next/image";
import Inicio from "./pages/Inicio";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Inicio />
    </main>
  );
}
