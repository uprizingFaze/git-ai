import Hero from "@/components/hero/hero";
import { Info } from "@/components/info/info";
import Technologies from "@/components/technologies/technologies";
import Nav from "@/components/ui/navbar";

export default function Home() {
  return (
    <main>
      <section>
        <Nav />
        <Hero />
        <Technologies />
        <Info />
      </section>
    </main>
  );
}
