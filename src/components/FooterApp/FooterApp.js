import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { BASE_API } from "@/config/constants";
import { BsSearch } from "react-icons/bs";

import { BsWhatsapp } from "react-icons/bs";
import { CiHome } from "react-icons/ci";
import { GrFavorite } from "react-icons/gr";
import { CiUser } from "react-icons/ci";
import Link from "next/link";

import styles from "./FooterApp.module.scss";

import { BtnLink } from "../Common";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  CardImg,
} from "reactstrap";

export function FooterApp() {
  const { total } = useCart();
  const { generateWhatsAppLink, items, seller, selectedItem, handleItemClick } =
    useWhatsApp();

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const addData = () => {
    const whatsappLink = generateWhatsAppLink(
      selectedItem,
      "Hola, me gustaría obtener más información sobre sus productos."
    );

    window.location.href = whatsappLink;

    toggleModal();
  };

  return (
    <div className={styles.btnWhatsapp}>
      <div className={styles.paneluser}>
        <Link href={`/`}>
        <CiHome color="white" size={30} />
      
        </Link>

        <Link href={`/featured`}>
        <BsSearch color="white" size={30} />
     
        </Link>
{/* 
        <Button
          className={styles.whatsapp}
          color="succefull"
          onClick={() => toggleModal()}
        >
          <BsWhatsapp size={35} color="green" />
        </Button> */}

        <div className={styles.cart}>
          {total > 0 && <p>{total}</p>}
          <Link href={`/cart`}>
           <GrFavorite color="white" size={30} />
          </Link>
        </div>

        {/* <Link
          href={`${BASE_API}/admin-dashboard/login/?next=/admin-dashboard/`}
        >
          <CiUser size={30} />
        </Link> */}
      </div>

      <Modal centered isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Seleccione una Linea</ModalHeader>

        <ModalBody>
          <FormGroup>
            {items.map((item, index) => (
              <Button
                key={index}
                color="success"
                outline
                size="sm"
                className={index === selectedItem ? "selected" : ""}
                onClick={() => handleItemClick(item)}
              >
                <BsWhatsapp size={20} /> Linea {index + 1}
                <p>{seller[index]}</p>
              </Button>
            ))}
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button outline size="sm" color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
          <Button size="sm" color="success" onClick={addData}>
            Aceptar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
