import { Button } from "@/components/ui";
import { Link } from "react-router";
import { assets } from "@/config";

export const Header = () => (
  <div className="w-full flex items-center justify-center">
    <header className="w-10/12 z-50 flex items-center justify-between px-6 py-4">
      <Link to="/" className="flex items-center gap-2">
        <img
          src={assets.logo_01}
          alt="DMs"
          className="h-8 w-8 rounded-lg object-contain"
        />
        <span className="text-xl font-bold text-[#1e3a5f]">DMs</span>
      </Link>
      <nav className="flex items-center gap-4">
        <Link to="/signin">
          <Button variant="ghost" size="sm" className="text-[#1e3a5f]">
            Sign in
          </Button>
        </Link>
        <Link to="/signup">
          <Button
            size="sm"
            className="bg-[#1e3a5f] text-white hover:bg-[#2a4a75]"
          >
            Get started
          </Button>
        </Link>
      </nav>
    </header>
  </div>
);
