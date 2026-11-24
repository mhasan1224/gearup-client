
export type NavigationItem = {
  label: string;
  href: string;
};

export const publicNavigation: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "All Equipment",
    href: "/equipment",
  },
];
