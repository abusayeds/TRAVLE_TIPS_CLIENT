import React, { ReactNode } from "react";

const layout = ({
  children,
  recentPost,
}: {
  children: ReactNode;
  recentPost: ReactNode;
}) => {
  return (
    <div>
      {children}
      {recentPost}
    </div>
  );
};

export default layout;
