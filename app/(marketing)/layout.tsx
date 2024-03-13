import Navbar from "./_components/Navbar";

const MarketingLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
    </>
  );
};

export default MarketingLayout;