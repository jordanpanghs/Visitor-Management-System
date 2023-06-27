import Header from "./(components)/header";

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
      <Header />
      <nav></nav>

      {children}
    </section>
  );
}
