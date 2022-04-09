import styles from "../styles/Footer.module.css";

import Image from "next/image";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src="/images/banner-img-2.jpg"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className={styles.mission}>finger licking good...</div>
      <div className={styles.restaurants}>
        <h2>Check out our restaurants</h2>
        <ul>
          <li>
            (402) 373-2687 89129 544th Ave Bloomfield, Nebraska(NE), 68718
          </li>
          <li>
            (419) 533-7755 9655 County Rd W #T Liberty Center, Ohio(OH), 43532
          </li>
          <li>
            (419) 533-7755 9655 County Rd W #T Liberty Center, Ohio(OH), 43532
          </li>
          <li>(309) 582-7362 801 NW 3rd St Aledo, Illinois(IL), 61231</li>
        </ul>
      </div>
      <div className={styles.workingHrs}>
        <h1>Opening Hours</h1>
        <div className={styles.workday}>
          <span>Monday-Friday:</span> <span>8:00 AM - 9:00PM</span>
        </div>
        <div className={styles.workday}>
          <span>Monday-Friday:</span> <span>8:00 AM - 9:00PM</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
