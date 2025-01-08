import React, { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { Products } from "@/api/products";
import {
  Footer,
  FooterCart,
  ListCart,
  NotFound,
  Redes,
  Separator,
} from "@/components";
import { BasicLayout } from "@/layouts";
import { size } from "lodash";
import { BASE_NAME } from "@/config/constants";

const productCtrl = new Products();

export default function CartPage() {

  const { cart } = useCart();
  const [product, setProduct] = useState("");
  const [load, setLoad] = useState(true);
  const hasProduct = size(product) > 0;

  // const [newProduct, setNewProduct] = useState("");
  // const [follow, setFollow] = useState("");
 

  // const identificadorUnico = generarIdentificadorUnico();
  
 
  useEffect(() => {
    (async () => {
      try {
        const data = [];
        for await (const item of cart) {
          const response = await productCtrl.getProductById(item.id);
          data.push({ ...response, quantity: item.quantity });
        }
        setProduct(data);
        setLoad(false);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    })();
  }, [cart]);

 
  

  return (
    <BasicLayout>
         {load ? (
        <h1>Cargando ...</h1>
      ) : (
        <>
          {hasProduct ? (
            <ListCart product={product}  />
          ) : (
            <NotFound
              title={"Uppss... en este momento no hay productos en mis favoritos"}
            />
          )}
        </>
      )}
      <FooterCart products={product} />
    </BasicLayout>
  );
}
