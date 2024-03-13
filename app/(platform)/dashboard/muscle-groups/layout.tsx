const WorkoutLayout = ({
  children
}: {
  children: React.ReactNode
}) => {

  return (
    <>
      <div className="flex justify-center items-center min-h-svh">
        {children}
      </div>
    </>
  );
};

export default WorkoutLayout;