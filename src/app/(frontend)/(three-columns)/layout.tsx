import Footer from '../components/Footer';
import Header from '../components/Header';
import SelectedPointTable from '../components/SelectedPointTable';
import SkewCard from '../components/SkewCard';
// import TabHeader from '../components/TabHeader';
import TopLeaguesList from '../components/TopLeaguesList';

export default function ThreeColumnsLayout({
  children,
} // datePicker,
: {
  children: React.ReactNode;
  // datePicker: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#061626]">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-[1200px]">
          {/* <TabHeader datePicker={datePicker} /> */}
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
