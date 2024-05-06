// U vašem kontejneru (npr. ZadaciContainer.js)
import { Card, Space } from 'antd';
import React from 'react';
import { Task } from '../../redux/ZadaciSlice';
import CardTitle from '../../Components/CardTitle';
import UrediZadatakContainer from '../Container/UrediZadatakContainer';
import ObrisiZadatakContainer from '../Container/ObrisiZadatakContainer';

interface Props {
    handleCheckBoxChange: (taskId: number) => void;
    checkedTasks: number[];
    zadaci: Task[];
    selectedTaskId: number | null;
    isModalVisible: boolean;
    openModal: (taskId: number | null, type: 'edit' | 'delete') => void;
    closeModal: () => void;
    openDetailsZadatak: (taskId: number) => void;
    urediModal: boolean;
    obrisiModal: boolean;
}

const Zadaci = ({ handleCheckBoxChange, checkedTasks, zadaci, selectedTaskId, isModalVisible, openModal, closeModal, openDetailsZadatak, urediModal, obrisiModal }: Props) => {
    const taskId: number = selectedTaskId as number;

    return (
        <div>
            {zadaci.map(zadatak => (
                zadatak.status === 'aktivno' &&
                <Card
                    style={{ width: 300, marginBottom: "10px" }}
                    key={zadatak.id}
                >
                    <CardTitle
                        onCheckBox={() => handleCheckBoxChange(zadatak.id)}
                        checked={checkedTasks.includes(zadatak.id)}
                        openModal={openModal}
                        task={zadatak}
                        openDetailsZadatak={() => openDetailsZadatak(zadatak.id)}
                    />
                </Card>
            ))}

            {
                urediModal &&
                <UrediZadatakContainer
                    openModal={isModalVisible}
                    selectedTask={taskId}
                    onClose={closeModal}
                />
            }

            {
                obrisiModal &&
                <ObrisiZadatakContainer
                    openModal={isModalVisible}
                    selectedTask={selectedTaskId}
                    onClose={closeModal}
                />
            }
        </div>
    );
}

export default Zadaci;
