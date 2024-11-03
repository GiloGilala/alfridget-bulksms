import React from "react";

const Container = ({ children }) => {
  return (
    <div className="p-4 md:p-6 lg:p-8 items-center justify-center rounded w-full  h-screen overflow-y-auto">
      {children}
    </div>
  );
};

export default Container;
