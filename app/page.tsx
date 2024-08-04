import Hero from "@/components/hero/hero";
import { Info } from "@/components/info/info";
import Technologies from "@/components/technologies/technologies";
import Nav from "@/components/ui/navbar";
import TeamSwitcher from "./(app)/chat/components/team-switcher";


export default function Home() {
  return (
    <main>
      <section>
        <Nav />
        <Hero />
        <Technologies />
        <TeamSwitcher />
        <Info />
      </section>
    </main>
  );
}
