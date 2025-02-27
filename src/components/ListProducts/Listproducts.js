import { map } from "lodash";
import styles from "./ListProduts.module.scss";
import { Available } from "./Available";
import { SoldOut } from "./SoldOut";
import { Stokend } from "./Stokend";

export function Listproducts(props) {
  const { products, title } = props;

  console.log("products", products);

  return (
    <div className={styles.listProduct}>
      <h4>{title}</h4>
      <div className={styles.product}>
        
        {products && map(products, (product, index) => (
          <div key={index}>
            {product.productData.active &&
              (!product.productData.soldout ? (               
                  <Available key={index} product={product} />               
              ) : (
                <SoldOut kay={index} product={product} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
