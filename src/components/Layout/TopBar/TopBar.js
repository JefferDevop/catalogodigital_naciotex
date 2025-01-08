import styles from "./TopBar.module.scss";
import { CardImg } from "reactstrap";
import Link from "next/link";

export function TopBar() {
  return (
    <div className={styles.topbar_component}>
      <div className={styles.topBar}>
       
        <h1>Catálogo 2025</h1>
      </div>
     
    </div>
  );
}
