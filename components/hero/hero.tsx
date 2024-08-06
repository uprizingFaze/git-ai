import { Link } from "next-view-transitions";
import { Button } from "../ui/button";
import Image from "next/image";

function Hero() {
  return (
    <section className="">
      <div className="hero  border px-10 pt-40 m-6 rounded-xl">
        <div className="">
          <p className="text-9xl font-semibold bg-gradient-to-b from-white to-neutral-700 text-transparent bg-clip-text">
            Git-Ai
          </p>
          <h1 className="pt-6 text-7xl bg-gradient-to-b from-white to-neutral-700 text-transparent bg-clip-text">
            Visualiza explora y pregunta
          </h1>
        </div>
        <div className="text-white pt-8 flex flex-row">
          <div className="flex-1 max-w-lg">
            <p className="text-muted-foreground text-xl">
              Visualiza de forma interactiva el{" "}
              <span className="text-white font-semibold">flujo</span> de tu
              repositorio y obtén respuestas instantáneas con{" "}
              <span className="text-white font-bolt">
                inteligencia artificial.{" "}
              </span>
              Simplifica el seguimiento de commits, ramas, pull requests y mucho
              mas mientras mantienes el control total de tu proyecto.
            </p>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <Image
              src="/earth.svg"
              alt="Hero"
              width={500}
              height={500}
              className=""
            />
          </div>
        </div>
        <div className="py-8">
          <Link href="/chat">
            <Button className="text-base" size="xl">
              Comenzar!!
            </Button>
          </Link>
          <Link href="/about" className="pl-4">
            <Button className="text-base" size="xl" variant="outline">
              Saber más
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
