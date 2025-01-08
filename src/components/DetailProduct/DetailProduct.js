import React, { useEffect, useState } from "react";
import { size } from "lodash";
import { BASE_NAME } from "@/config/constants";
import { useWhatsApp, useGallery, useCart } from "@/hooks";
import { toast } from "react-toastify";

import { ImageCarousel } from "../ImageCarousel";

import {
  CardImg,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
} from "reactstrap";

import { BsWhatsapp } from "react-icons/bs";
import styles from "./DetailProduct.module.scss";

export function DetailProduct(props) {
  const { product, relate } = props;
  const { addCart } = useCart();
  const { getGalleryByCode, gallery } = useGallery();
  const { generateWhatsAppLink, seller, items, selectedItem, handleItemClick } =
    useWhatsApp();
  const { ...productDetall } = product ?? {};

  const [productData, setProductData] = useState(productDetall[0]);
  const [idProduct, setIdPropduct] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [propductWhatsApp, setPropductWhatsApp] = useState("");
  const [propductAlternaWhatsApp, setPropductAlternaWhatsApp] = useState("");
  const [quantity, setQuantity] = useState(1);

  const format = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    getGalleryByCode(productData);
  }, []);

  const changeDetail = (data) => {
    setProductData(data);
    getGalleryByCode(data);
    window.scrollTo(0, 0);
  };

  //-----------------------------------------------

  const openCloseModal = () => setShowModal((prev) => !prev);

  const addProductId = (id) => {
    setIdPropduct(id);
    openCloseModal();
  };

  const addData = () => {
    addCart(idProduct, quantity);
    toast.success("¡Se agrego con exito!");
    openCloseModal();
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    setQuantity(value);
  };

  //-------------------------------------

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const addProductToWhatsApp = (data) => {
    setPropductWhatsApp(data);
    toggleModal();
  };

  const addProductAlternaToWhatsApp = (data) => {
    setPropductAlternaWhatsApp(data);
    toggleModal();
  };

  const addDataToWhatsApp = () => {
    if (propductWhatsApp != "") {
      const whatsappLink = generateWhatsAppLink(
        selectedItem,
        BASE_NAME + propductWhatsApp
      );

      window.location.href = whatsappLink;
      toggleModal();
    } else {
      const whatsappLink = generateWhatsAppLink(
        selectedItem,
        propductAlternaWhatsApp
      );

      window.location.href = whatsappLink;
      toggleModal();
    }
  };

  if (product) {
    return (
      <>
        <div className={styles.detailProduct}>
          <div className={styles.product} id="seccion-1">
            {size(gallery) > 1 ? (
              <ImageCarousel gallery={gallery} />
            ) : productData?.images ? (
              <CardImg
                alt="Card image cap"
                src={BASE_NAME + productData?.images}
              />
            ) : (
              <CardImg alt="Card image cap" src={productData?.image_alterna} />
            )}

            <div className={styles.description}>
              <CardTitle className={styles.title}>
                <h5 className={styles.name_extend}>
                  {productData?.name_extend}
                </h5>
               
              </CardTitle>

              
              <Button onClick={() => addProductId(productData?.codigo)}>
                Agregar a Favoritos
              </Button>
              <p>{productData?.description}</p>
            </div>
          </div>

         

          <Modal centered isOpen={showModal} toggle={openCloseModal}>
            <ModalHeader toggle={openCloseModal}>Ingrese Cantidad</ModalHeader>

            <ModalBody>
              Cantidad
              <FormGroup>
                <Input
                  value={quantity}
                  type="number"
                  name="cantidad"
                  id="cantidad"
                  placeholder="Cantidad"
                  onChange={handleQuantityChange}
                />
              </FormGroup>
            </ModalBody>

            <ModalFooter>
              <Button color="primary" onClick={addData}>
                Aceptar
              </Button>{" "}
              <Button color="secondary" onClick={openCloseModal}>
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>

          
        </div>
      </>
    );
  } else {
    return <h5> La pagina no existe</h5>;
  }
}
