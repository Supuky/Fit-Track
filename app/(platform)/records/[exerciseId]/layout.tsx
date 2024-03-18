const RecordLayout = ({
  children
}: {
  children: React.ReactNode
}) => {

  return (
    <>
      <div className="h-svh">
        {children}
      </div>
    </>
  );
};

export default RecordLayout;