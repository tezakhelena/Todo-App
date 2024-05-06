import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, FormInstance, Input, Modal } from "antd";
import React from "react";

interface Props {
    open: boolean;
    obrisiZadatak: () => void;
    handleCancel: () => void;
}

const ObrisiZadatakModal = (props: Props) => {
    return (
        <>
            <Modal
                title="Brisanje zadatka"
                open={props.open}
                onOk={props.obrisiZadatak}
                onCancel={props.handleCancel}
            >
                Jeste li sigurni da želite obrisati zadatak?
            </Modal>
        </>
    );
}

export default ObrisiZadatakModal;