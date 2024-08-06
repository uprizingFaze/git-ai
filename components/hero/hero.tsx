import { Link } from "next-view-transitions";
import { Button } from "../ui/button";
import Image from "next/image";

function Hero() {
  return (
    <main className="">
      <div className="hero border px-10 pt-40 m-6 rounded-xl">
        <div className="">
          <p className="text-9xl font-semibold bg-gradient-to-b from-white to-neutral-700 text-transparent bg-clip-text">
            Git-Ai
          </p>
          <h1 className="pt-6 text-7xl bg-gradient-to-b from-white to-neutral-700 text-transparent bg-clip-text">
            Explora y pregunta
          </h1>
        </div>
        <div className="text-white pt-8 flex flex-row">
          <div className="flex-1 max-w-lg">
            <p className="text-muted-foreground text-xl">
              Simplifica el seguimiento de commits, ramas, pull requests y mucho
              mas mientras mantienes el control total de tu proyecto con {" "} 
              <span className="text-white font-bolt">
                inteligencia artificial.{" "}
              </span>
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
        </div>
      </div>
    </main>
  );
}

export default Hero;
