import React from "react";
import Link from "next/link";
import {
  Home,
  ShoppingCart,
  Package,
  Users2,
  LineChart,
  Package2,
} from "lucide-react";

const Sidebar = () => {
  return (
    <nav className="grid gap-6 text-lg font-medium">
      <Link
        href="#"
        className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
      >
        <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <Link
        href="#"
        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
      >
        <Home className="h-5 w-5" />
        Dashboard
      </Link>
      <Link
        href="#"
        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
      >
        <ShoppingCart className="h-5 w-5" />
        Orders
      </Link>
      <Link href="#" className="flex items-center gap-4 px-2.5 text-foreground">
        <Package className="h-5 w-5" />
        Products
      </Link>
      <Link
        href="#"
        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
      >
        <Users2 className="h-5 w-5" />
        Customers
      </Link>
      <Link
        href="#"
        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
      >
        <LineChart className="h-5 w-5" />
        Settings
      </Link>
    </nav>
  );
};

export default Sidebar;
