import { Home, User, Lock, Plus, Settings } from "lucide-react";

export const dashbaord_items = [
  {
    title: "Conversations",
    url: "/dashboard/conversations",
    icon: Home,
    active: ["conversations", ""],
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
    active: ["profile"],
  },
  {
    title: "Security",
    url: "/dashboard/security",
    icon: Lock,
    active: ["security"],
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
    active: ["settings"],
  },
];

export const static_items = [
  {
    title: "New Chat",
    url: "/dashboard/conversations/create",
    icon: Plus,
    active: ["chat", "chat"],
  },
];
