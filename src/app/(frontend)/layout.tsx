import Footer from './components/Footer';
import Header from './components/Header';

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#061626]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
