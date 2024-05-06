import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Subtask, addTask } from "../../redux/ZadaciSlice";
import DodajZadatakModal from "../Modal/DodajZadatakModal";
import moment from "moment";

const DodajZadatakContainer = () => {
    const [form] = useForm();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const showModal = () => {
        setOpen(true);
    };

    const dodajZadatak = async () => {
        try {
            const values = await form.validateFields();

            const noviZadatakPodaci = {
                naslov: values.naslov,
                opis: values.opis,
                rokIzvrsenja: moment(values.rokIzvrsenja.format()),
                vaznostZadatka: values.vaznostZadatka,
                podzadatak: values.podzadatak || []            
            };

            setOpen(false);

            dispatch(addTask(noviZadatakPodaci));

            form.resetFields();
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <DodajZadatakModal
            showModal={showModal}
            handleCancel={handleCancel}
            dodajZadatak={dodajZadatak}
            open={open}
            form={form}
        />
    );
}

export default DodajZadatakContainer;