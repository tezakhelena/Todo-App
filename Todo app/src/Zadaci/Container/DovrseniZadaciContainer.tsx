import { Card } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { formatDatumKreiranjaDate, pretvoriVaznostUIkonicu } from '../../utils/HelperFunctions';
import SpaceComponent from '../../Components/SpaceComponent';
import { RightSquareOutlined } from '@ant-design/icons';

interface Props{
    openDetailsZadatak: (taskId: number) => void;
}

const DovrseniZadaciContainer = ({openDetailsZadatak}: Props) => {
    const zadaci = useSelector((state: RootState) => state.tasks.tasks);

    return (
        <div>
            {zadaci.map(zadatak => (
                zadatak.status === 'dovrseno' &&
                <Card
                    style={{ width: 300, marginBottom: "10px" }}
                    key={zadatak.id}
                >
                    <div>
                        <p>{zadatak.naslov}</p>
                        <p style={{ fontSize: "13px", color: "#8c8c8c" }}>{formatDatumKreiranjaDate(zadatak.datumKreiranja)}</p>
                    </div>
                    <SpaceComponent>
                        {pretvoriVaznostUIkonicu(zadatak.vaznostZadatka)}
                        <RightSquareOutlined style={{ fontSize: '20px' }} onClick={() => openDetailsZadatak(zadatak.id)} />
                    </SpaceComponent>
                </Card>
            ))}
        </div>
    );
}

export default DovrseniZadaciContainer;
