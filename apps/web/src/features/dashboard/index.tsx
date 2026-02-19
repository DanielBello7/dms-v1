import { SidebarProvider } from "@/components/ui";
import { Header } from "./header";
import { AppSidebar } from "./sidebar";
import { Socket } from "../socket";
import { ConnectionContextProvider } from "../socket/context/connection";
import { Listeners } from "../socket/listeners";
import { useEffect } from "react";
import { get_user_settings } from "@/lib";

type Props = {
  children: React.ReactNode;
};

export const Dashboard = (props: Props) => {
  const { children } = props;
  const { dark_mode } = get_user_settings();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark_mode);
  }, [dark_mode]);

  return (
    <div className="w-full h-svh overflow-hidden flex bg-[#fef9f0] dark:bg-background">
      <div className="flex grow font-grotesque overflow-hidden rounded-sm items-center justify-center p-3 xl:p-0">
        <div className="relative flex border border-gray-400/30 dark:border-border size-[100%] xl:w-300 xl:h-200 overflow-hidden rounded-sm">
          <SidebarProvider className="flex grow overflow-hidden bg-white dark:bg-card">
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
