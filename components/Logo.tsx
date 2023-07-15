import Image from "next/image";
import Link from "next/link";
import React from "react";
// import BrandW from "../public/builderz-black.svg";
// import Brand from "../public/builderz-white.svg";
import Packdog from "../public/packdog.png";

import { useTheme } from "@mui/material";

export const Logo = () => {
  const theme = useTheme();

  return (
    <Link href="/" passHref>
      <Image
        // src={theme.palette.mode === "light" ? Brand : BrandW}
        src={Packdog}
        alt=""
        className="min-w-[30px] w-32 max-w-[50px] cursor-pointer"
      />
    </Link>
  );
};
