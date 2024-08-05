import Nav from "./components/navbar";

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="">{children}</main>
    </>
  );
}
