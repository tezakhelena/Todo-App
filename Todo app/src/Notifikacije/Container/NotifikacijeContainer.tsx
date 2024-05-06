import { Button, Card, Divider } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BellNotifications from '../../Components/BellNotifications';
import SpaceComponent from '../../Components/SpaceComponent';
import { dodajNotifikaciju, oznaciNotifikacijeProcitanima } from '../../redux/NotifikacijeSlice';
import { RootState } from '../../redux/store';
import { NASLOV_ROK_ISTEKA, ROK_ISTJECE_DANAS, ROK_ISTJECE_SUTRA } from '../../utils/NotifikacijePoruke';

const NotifikacijeContainer = () => {
    const dispatch = useDispatch();
    const zadaci = useSelector((state: RootState) => state.tasks);
    const notifikacije = useSelector((state: RootState) => state.notifikacije.notifikacija);
    const neprocitaneNotifikacije = notifikacije.filter(notifikacija => !notifikacija.procitano);
    const navigate = useNavigate();


    const handlePrikaziSveNotifikacije = () => {
        navigate('/notifikacije');
    };

    const dropdownOverlay = (
        <Card title={
        <SpaceComponent>
            <p>Obavijesti</p>
            <Button type='primary' onClick={handlePrikaziSveNotifikacije}>Prikaži sve</Button>
        </SpaceComponent>} style={{ width: 300, zIndex: 1000 }}>
            {notifikacije.map((notifikacija) => (
                !notifikacija.procitano &&
                <>
                    <p key={notifikacija.id}>{notifikacija.opis}</p>
                    <Divider/>
                </>
            ))}
        </Card>
    );

    const [visible, setVisible] = useState(false);

    const handleVisibleChange = (flag: boolean) => {
        setVisible(flag);
        if (!flag) {
            dispatch(oznaciNotifikacijeProcitanima());
        }
    };

    const isRokIzvrsenja = (dan: number) => {
        const sutrasnjiDatum = moment().add(dan, 'day').startOf('day').utc();

        zadaci.tasks.forEach((zadatak) => {
            const novaNotifikacija = {
                opis: dan === 1 ? ROK_ISTJECE_SUTRA(zadatak.naslov) : ROK_ISTJECE_DANAS(zadatak.naslov),
                naslov: NASLOV_ROK_ISTEKA()
            };

            const rokIzvrsenja = moment.utc(zadatak.rokIzvrsenja);

            if (rokIzvrsenja.isSame(sutrasnjiDatum, 'day')) {

                const postojiVecIstaNotifikacija = notifikacije.some(
                    (notifikacija) => notifikacija.opis === novaNotifikacija.opis.toString()
                );

                if(!postojiVecIstaNotifikacija) dispatch(dodajNotifikaciju(novaNotifikacija));
            }
        });
    };

    useEffect(() => {
        isRokIzvrsenja(0);
        isRokIzvrsenja(1);
    }, [dispatch]);

    return (
        <BellNotifications 
            dropdownOverlay={dropdownOverlay}
            handleVisibleChange={handleVisibleChange}
            neprocitaneNotifikacije={neprocitaneNotifikacije}
        />
    )
}

export default NotifikacijeContainer;
