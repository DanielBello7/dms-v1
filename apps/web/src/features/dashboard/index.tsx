import { SidebarProvider } from "@/components/ui";
import { Header } from "./header";
import { AppSidebar } from "./sidebar";
import { Socket } from "../socket";
import { ConnectionContextProvider } from "../socket/context/connection";
import { Listeners } from "../socket/listeners";

type Props = {
  children: React.ReactNode;
};

export const Dashboard = (props: Props) => {
  const { children } = props;

  return (
    <div className="w-full h-svh overflow-hidden flex bg-[#fef9f0]">
      <div className="flex grow font-grotesque overflow-hidden rounded-sm items-center justify-center">
        <div className="relative flex border border-gray-400/30 w-300 h-200 overflow-hidden rounded-sm">
          <SidebarProvider className="flex grow overflow-hidden bg-white">
            <AppSidebar />
            <main className="size-full overflow-hidden flex flex-col">
              <Header />
              <div className="w-full grow-1 overflow-hidden">
                <Socket>
                  <Listeners>
                    <ConnectionContextProvider>
                      {children}
                    </ConnectionContextProvider>
                  </Listeners>
                </Socket>
              </div>
            </main>
          </SidebarProvider>
        </div>
      </div>
    </div>
  );
};
