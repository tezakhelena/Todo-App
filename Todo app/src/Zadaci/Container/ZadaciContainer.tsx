import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Zadaci from '../pages/Zadatak';
import { RootState } from '../../redux/store';

interface Props {
    handleCheckBoxChange: (taskId: number) => void;
    checkedTasks: number[];
    openDetailsZadatak: (taskId: number) => void;
}

const ZadaciContainer = ({ handleCheckBoxChange, checkedTasks, openDetailsZadatak }: Props) => {
    const zadaci = useSelector((state: RootState) => state.tasks.tasks);

    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState<'edit' | 'delete' | null>(null);

    const openModal = (taskId: number | null, type: 'edit' | 'delete') => {
        setSelectedTaskId(taskId);
        setIsModalVisible(true);
        setModalType(type);
    };

    const closeModal = () => {
        setSelectedTaskId(null);
        setIsModalVisible(false);
        setModalType(null);
    };

    const urediModal = isModalVisible && selectedTaskId !== null && modalType === 'edit';
    const obrisiModal = isModalVisible && selectedTaskId !== null && modalType === 'delete';

    return (
        <Zadaci
            zadaci={zadaci}
            handleCheckBoxChange={handleCheckBoxChange}
            checkedTasks={checkedTasks}
            openModal={openModal}
            closeModal={closeModal}
            openDetailsZadatak={openDetailsZadatak}
            urediModal={urediModal}
            obrisiModal={obrisiModal}
            selectedTaskId={selectedTaskId}
            isModalVisible={isModalVisible}
        />
    );
}

export default ZadaciContainer;
