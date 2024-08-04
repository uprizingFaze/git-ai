import Hero from "@/components/hero/hero";
import { Info } from "@/components/info/info";
import Technologies from "@/components/technologies/technologies";

export default function Home() {
  return (
    <main>
      <section>
        <Hero />
        <Technologies />
        <Info />
      </section>
    </main>
  );
}
