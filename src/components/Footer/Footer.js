import React, { useEffect, useState } from "react";
import { map } from "lodash";
import { Categories } from "@/api/category";
import Link from "next/link";

import styles from "./Footer.module.scss";

const categoriesCtrl = new Categories();

export function Footer() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await categoriesCtrl.getAll();
        setCategories(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className={styles.footer}>
      <div>
        <div className={styles.content}>
        </div>
        <h6>CATEGORÍAS</h6>
        <div className={styles.link}>
          {map(categories, (category) => (
            <p key={category.id}>
              <Link href={`/products/${category.slug}`}> {category.name} </Link>
            </p>
          ))}
        </div>
      </div>
      <div>
        <p className={styles.copyright}>
        MB Copyright © 2023. Todos los derechos
          reservados <br />
          Desarrollado por: Jeffer Quiñones <br />
          Cel: 300 530 9990
          Versión 6.1.0
        </p>
      </div>
    </div>
  );
}
