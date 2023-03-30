import React, { type PropsWithChildren } from "react";

function Layout(props: PropsWithChildren) {
  return (
    <main className="flex h-screen w-full justify-center">
      <div className="h-full w-full overflow-y-scroll border-x  border-slate-400 md:max-w-2xl">
        {props.children}
      </div>
    </main>
  );
}

export default Layout;
