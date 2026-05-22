//libs
import React from "react";
import Link from "next/link";

//styles
import styles from "./styles.module.scss";

//assets
import CallIcon from "@p/assets/icons/call.svg";
import LogoIcon from "@p/assets/icons/logo.svg";
import LocationIcon from "@p/assets/icons/location.svg";

//components
import Typography from "@/core/components/ui/shared/Typography/Typography";

const MobileHeader = () => {
  return (
    <div className={styles.mobileHeader}>
      <Link className={styles.logoLink} href="/">
        <LogoIcon className={styles.logoIcon} />
      </Link>
      <div className={styles.buttonsMobileWrap}>
        <Typography className={styles.phone} variant="text4" as="a" href="tel:88122235059">
          <CallIcon className={styles.callIcon} />8 (812) 223-50-59
        </Typography>
        <button className={styles.locationBtnMobile}>
          <LocationIcon className={styles.locationIcon} />
        </button>
      </div>
    </div>
  );
};

export default MobileHeader;
