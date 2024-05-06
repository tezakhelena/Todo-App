import { useForm } from "antd/es/form/Form";
import React from "react";
import { useDispatch } from "react-redux";
// import urediZadatakModal from "../Modal/urediZadatakModal";
import { deleteTask, editTask } from "../../redux/ZadaciSlice";
import UrediZadatakModal from "../Modal/UrediZadatakModal";
import ObrisiZadatakModal from "../Modal/ObrisiZadatakModal";

interface Props {
    openModal: boolean;
    selectedTask: number | null;
    onClose: () => void;
}

const ObrisiZadatakContainer = (props: Props) => {
    const dispatch = useDispatch();

    const obrisiZadatak = async () => {
        try {
            dispatch(deleteTask(props.selectedTask));
            props.onClose();
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };

    return (
        <ObrisiZadatakModal
            handleCancel={props.onClose}
            obrisiZadatak={obrisiZadatak}
            open={props.openModal}
        />
    );
}

export default ObrisiZadatakContainer;