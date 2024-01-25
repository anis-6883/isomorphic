import Footer from '@/app/(frontend)/components/Footer';
import Header from '@/app/(frontend)/components/Header';
import SelectedPointTable from '@/app/(frontend)/components/SelectedPointTable';
import SkewCard from '@/app/(frontend)/components/SkewCard';
import TabHeader from '@/app/(frontend)/components/TabHeader';
import TopLeaguesList from '@/app/(frontend)/components/TopLeaguesList';

export default function ThreeColumnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#061626]">
      <Header />
      <main className="mb-0 flex-1 md:mb-8">
        <div className="mx-auto max-w-[1200px]">
          <TabHeader />
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3 hidden w-full lg:col-span-3 lg:block">
              <SkewCard title="POPULAR LEAGUES">
                <TopLeaguesList />
              </SkewCard>
            </div>
            <div className="col-span-12 w-full lg:col-span-6">{children}</div>
            <div className="col-span-3 hidden w-full lg:col-span-3 lg:block">
              <SelectedPointTable />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
