import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui";
import classnames from "classnames";
import { Fragment } from "react";
import { Link, useLocation } from "react-router";
import { dashbaord_items, static_items } from "./data";
import { NavUser } from "./user";
import { Logo } from "@/components/logo";

export const AppSidebar = () => {
  const sidebar = useSidebar();
  const location = useLocation();
  const active = location.pathname.split("/")[2] ?? "conversations";

  const tabs = [
    {
      title: "Dashboard",
      items: dashbaord_items,
    },
    {
      title: "",
      items: static_items,
    },
  ];

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="h-full!">
      <SidebarContent>
        <Fragment>
          <SidebarHeader className="h-12 border-b border-gray-200 dark:border-border flex flex-col justify-center p-3">
            <div className="flex items-center gap-2">
              <Logo showText={false} size="size-8" />
              {sidebar.open && (
                <div className="w-fit flex flex-col">
                  <span className="text-sm font-bold leading-none">DMs</span>
                  <span className="text-xs text-gray-500 dark:text-muted-foreground leading-none">
                    Dashboard
                  </span>
                </div>
              )}
            </div>
          </SidebarHeader>

          {tabs.map((i, index) => (
            <SidebarGroup
              key={index}
              className={classnames({
                "border-t border-gray-200 dark:border-border": index > 0,
              })}
            >
              {i.title.trim() && (
                <SidebarGroupLabel>{i.title}</SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu>
                  {i.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={classnames({
                          "text-green-800 font-bold hover:text-green-800 bg-green-800/10":
                            item.active.includes(active),
                        })}
                      >
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}

          <SidebarFooter className="mt-auto border-t border-gray-200 dark:border-border">
            <NavUser />
          </SidebarFooter>
        </Fragment>
      </SidebarContent>
    </Sidebar>
  );
};
