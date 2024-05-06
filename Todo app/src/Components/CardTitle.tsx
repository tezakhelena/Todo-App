import { Checkbox, Space } from "antd";
import React from "react";
import Akcije from "./Akcije";
import { Task } from "../redux/ZadaciSlice";
import { formatDatumKreiranjaDate, pretvoriVaznostUIkonicu } from "../utils/HelperFunctions";
import { RightSquareOutlined } from "@ant-design/icons";
import SpaceComponent from "./SpaceComponent";

interface Props {
    onCheckBox?: () => void;
    checked?: boolean;
    openModal: (taskId: number | null, type: 'edit' | 'delete') => void;
    task: Task;
    openDetailsZadatak: () => void;
}

const CardTitle = ({ onCheckBox, checked, openModal, task, openDetailsZadatak }: Props) => {
    return (
        <>
            <SpaceComponent>
                <div>
                    <p><Checkbox checked={checked} onChange={onCheckBox} style={{ marginRight: 8 }} />{task.naslov}</p>
                    <p style={{ fontSize: "13px", color: "#8c8c8c" }}>Kreirano: {formatDatumKreiranjaDate(task.datumKreiranja)}</p>
                </div>
                <Akcije onEdit={() => openModal(task.id, 'edit')} onDelete={() => openModal(task.id, 'delete')} />
            </SpaceComponent>
            <SpaceComponent>
                {pretvoriVaznostUIkonicu(task.vaznostZadatka)}
                <RightSquareOutlined style={{ fontSize: '20px' }} onClick={openDetailsZadatak}/>
            </SpaceComponent>
        </>
    )
}

export default CardTitle;