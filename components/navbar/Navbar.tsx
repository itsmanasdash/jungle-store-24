import Logo from "./Logo";
import LinksDropdown from "./LinksDropdown";
import DarkMode from "./DarkMode";
import CartButton from "./CartButton";
import NavSearch from "./NavSearch";
import Container from "../global/Container";
import { Suspense } from "react";
import CustomScanBarCodeIcon from "../barCode/CustomScanBarCodeIcon";

function Navbar() {
  return (
    <nav className="border-b border-white/10 bg-gradient-to-b from-green-900/30 to-transparent backdrop-blur-sm dark:border-slate-700/20">
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4 py-8">
        <Logo />
        <Suspense>
          <NavSearch />
          <CustomScanBarCodeIcon />
        </Suspense>
        <div className="flex gap-4 items-center">
          <CartButton />
          <DarkMode />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
