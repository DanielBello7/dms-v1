import { SidebarTrigger, useSidebar } from "@/components/ui";
import { useHeader } from "./use-header-store";

export const Header = () => {
  const sidebar = useSidebar();
  const header = useHeader((state) => state.data);
  return (
    <div className="w-full h-12 bg-white dark:bg-card border-b border-gray-200 dark:border-border flex items-center p-3">
      {sidebar.isMobile && <SidebarTrigger />}
      <p>{header.title}</p>
    </div>
  );
};
