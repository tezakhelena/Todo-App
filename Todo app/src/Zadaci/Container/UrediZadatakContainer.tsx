import { useForm } from "antd/es/form/Form";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { editTask } from "../../redux/ZadaciSlice";
import { RootState } from "../../redux/store";
import UrediZadatakModal from "../Modal/UrediZadatakModal";

interface Props {
    openModal: boolean;
    selectedTask: number;
    onClose: () => void;
}

const UrediZadatakContainer = (props: Props) => {
    const [form] = useForm();
    const dispatch = useDispatch();
    const zadaci = useSelector((state: RootState) => state.tasks.tasks);

    const taskToEdit = zadaci.find((zadatak) => zadatak.id === props.selectedTask);

    useEffect(() => {
        if (taskToEdit) {
            form.setFieldsValue({
                naslov: taskToEdit.naslov,
                opis: taskToEdit.opis,
                rokIzvrsenja: moment(taskToEdit.rokIzvrsenja),
                vaznostZadatka: taskToEdit.vaznostZadatka
            });
        }
    }, []);

    const urediZadatak = async () => {
        try {
            const formData = form.getFieldsValue();

            dispatch(
                editTask({
                    id: props.selectedTask,
                    naslov: formData.naslov,
                    opis: formData.opis,
                    rokIzvrsenja: formData.rokIzvrsenja ? formData.rokIzvrsenja.format() : null,
                    vaznostZadatka: formData.vaznostZadatka
                })
            );

            props.onClose();
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };

    return (
        <UrediZadatakModal
            handleCancel={props.onClose}
            urediZadatak={urediZadatak}
            open={props.openModal}
            form={form}
            vaznost={taskToEdit?.vaznostZadatka}
        />
    );
}

export default UrediZadatakContainer;