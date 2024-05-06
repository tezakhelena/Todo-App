import React from "react";
import { Button, Modal } from "antd";

interface Props {
    checked: boolean;
    handleDovrsiZadatke: () => void;
}

const DovrsiButton = ({ checked, handleDovrsiZadatke }: Props) => {

    return (
        <>
            {
                checked &&
                <Button type="primary" onClick={handleDovrsiZadatke}>Dovrši zadatak</Button>
            }
        </>
    );
}

export default DovrsiButton;