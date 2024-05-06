import { ArrowLeftOutlined } from "@ant-design/icons";
import { Card, Space, Tabs, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import DivComponent from "../../Components/DivComponent";
import DovrsiButton from "../../Components/DovrsiButton";
import SpaceComponent from "../../Components/SpaceComponent";
import NotifikacijeContainer from "../../Notifikacije/Container/NotifikacijeContainer";
import { cardStyle } from "../../styles/ComponentStyles";
import DodajZadatakContainer from "../Container/DodajZadatakContainer";
import DovrseniZadaciContainer from "../Container/DovrseniZadaciContainer";
import ZadaciContainer from "../Container/ZadaciContainer";
import DetaljiZadatka from "./DetaljiZadatka";

interface Props {
    openDetailsZadatak: (taskId: number) => void;
    handleCheckBoxChange: (taskId: number) => void;
    details: boolean;
    checkedTasks: number[];
    provjeraButton: boolean;
    handleDovrsiZadatke: () => void;
    selectedTaskId: number;
    closeDetailsZadatak: () => void;
}

const ZadaciPage = ({ openDetailsZadatak, handleCheckBoxChange, details, checkedTasks, provjeraButton, handleDovrsiZadatke, selectedTaskId, closeDetailsZadatak }: Props) => {
    const { Title } = Typography;
    const { TabPane } = Tabs;

    return (
        <>
            <DivComponent>
                <Card style={cardStyle}>
                    <SpaceComponent>
                        <Title level={2}>
                            <Space>
                                {
                                    <Link to="/">
                                        <ArrowLeftOutlined />
                                    </Link>
                                }
                                Upravljanje Zadacima
                            </Space>
                        </Title>
                        <Space>
                            <DodajZadatakContainer />
                            <DovrsiButton checked={provjeraButton} handleDovrsiZadatke={() => handleDovrsiZadatke()} />
                            <NotifikacijeContainer />
                        </Space>
                    </SpaceComponent>

                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Aktivni zadaci" key="1">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <ZadaciContainer checkedTasks={checkedTasks} handleCheckBoxChange={handleCheckBoxChange} openDetailsZadatak={openDetailsZadatak} />
                                {details &&
                                    <DetaljiZadatka selectedTaskId={selectedTaskId} closeDetailsZadatak={closeDetailsZadatak} />
                                }
                            </div>
                        </TabPane>
                        <TabPane tab="Stari zadaci" key="2">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <DovrseniZadaciContainer openDetailsZadatak={openDetailsZadatak} />
                                {details &&
                                    <DetaljiZadatka selectedTaskId={selectedTaskId} closeDetailsZadatak={closeDetailsZadatak} />
                                }
                            </div>
                        </TabPane>
                    </Tabs>
                </Card>
            </DivComponent>
        </>
    );
}

export default ZadaciPage;