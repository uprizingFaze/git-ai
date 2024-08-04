import  Hero  from "@/components/hero/hero";
import { Nav } from "@/components/navbar";

export default function Home() {
  return (
    <main>
      <Nav />
      <section>
        <Hero />
      </section>
    </main>
  );
}
