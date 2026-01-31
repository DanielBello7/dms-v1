import { assets } from "@/config";
import { Link } from "react-router";
import classnames from "classnames";

type Props = {
  type?: "1" | "2";
  size?: string;
  textsize?: string;
  showText?: boolean;
  className?: string;
  linkActive?: boolean;
};

export const Logo = (props: Props) => {
  const { size = "w-8", linkActive = false, className } = props;
  const container = classnames(
    "w-fit flex items-center gap-2",
    {
      "cursor-pointer": linkActive,
    },
    className,
  );
  const sizing = classnames("rounded-full border", size);

  return (
    <Link className={container} to="/">
      <img src={assets.logo_01} alt="app-logo" className={sizing} />
    </Link>
  );
};
