import React from "react";
import styles from "../app/page.module.css";

export default function BgFiller({ onBgClick }: { onBgClick: () => void }) {
  return <div className={styles["bg-filler"]} onClick={onBgClick}></div>;
}
