import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Card, Descriptions, DescriptionsProps, Space, Steps, Tooltip } from "antd";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { formatDate, formatDatumKreiranjaDate, pretvoriVaznostUIkonicuTekst } from "../../utils/HelperFunctions";
import SpaceComponent from "../../Components/SpaceComponent";
import { Subtask, Task, markSubtaskCompleted } from "../../redux/ZadaciSlice";

interface Props {
    closeDetailsZadatak: () => void;
    selectedTaskId: number | null;
}

const DetaljiZadatka = ({ selectedTaskId, closeDetailsZadatak }: Props) => {

    const dispatch = useDispatch();

    const zadaci = useSelector((state: RootState) => state.tasks.tasks);
    const zadatak = zadaci.find((zadatak) => zadatak.id === selectedTaskId);

    const handleMarkCompleted = (taskId: number, subtaskId: number) => {
        dispatch(markSubtaskCompleted({ taskId, subtaskId }));
    }

    // U vašem helper/util fajlu

    const mozeOznacitiDovrsen = (trenutniPodzadatak: Subtask, sviPodzadaci?: Subtask[]) => {
        if(!sviPodzadaci) return;
        const indeksTrenutnogPodzadatka = sviPodzadaci.findIndex(podzadatak => podzadatak.id === trenutniPodzadatak.id);

        if (indeksTrenutnogPodzadatka === 0) {
            return true;
        }

        const prethodniPodzadatak = sviPodzadaci[indeksTrenutnogPodzadatka - 1];

        return prethodniPodzadatak.dovrseno;
    };

    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Naslov zadatka',
            children: zadatak?.naslov,
        },
        {
            key: '2',
            label: 'Opis zadatka',
            children: zadatak?.opis,
        },
        {
            key: '3',
            label: 'Kreiran datuma',
            children: formatDatumKreiranjaDate(zadatak?.datumKreiranja),
        },
        {
            key: '4',
            label: 'Važnost zadatka',
            children: pretvoriVaznostUIkonicuTekst(zadatak?.vaznostZadatka),
        },
        {
            key: '5',
            label: 'Rok izvršenja zadatka',
            children: formatDate(moment(zadatak?.rokIzvrsenja))
        },
    ];

    console.log(zadatak?.podzadatak);

    const detailsItems: React.ReactNode[] = [
        zadatak?.podzadatak && Array.isArray(zadatak.podzadatak) && (
            <div key="6">
                <h3>Podzadaci:</h3>
                <Steps current={zadatak?.podzadatak.findIndex(podzadatak => !podzadatak.dovrseno)} style={{ width: '70%' }}>
                    {zadatak?.podzadatak.map((podzadatak, index) => (
                        <Steps.Step key={index} title={podzadatak.opis} description={!podzadatak.dovrseno && <Button disabled={!mozeOznacitiDovrsen(podzadatak, zadatak.podzadatak)} style={{ border: 'none' }} onClick={() => handleMarkCompleted(zadatak.id, podzadatak.id)}>Dovrši</Button>} />
                    ))}
                </Steps>
            </div>
        ),
    ]

    return (
        <Card style={{ width: "80%", marginBottom: "10px", height: '50%' }}>
            <Descriptions title={
                <SpaceComponent>
                    <p>Detalji zadatka</p>
                    <CloseCircleOutlined style={{ fontSize: '20px' }} onClick={closeDetailsZadatak} />
                </SpaceComponent>
            } items={items} />
            {detailsItems}
        </Card>
    );
}

export default DetaljiZadatka;