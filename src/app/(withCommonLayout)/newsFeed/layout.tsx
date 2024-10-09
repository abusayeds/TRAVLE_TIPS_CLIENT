export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="">
      <section className="flex flex-col items-center justify-center gap-4 ">
        <div className="inline-block max-w-lg text-center justify-center">
          {children}
        </div>
      </section>
    </main>
  );
}
