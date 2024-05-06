import { ArrowLeftOutlined, CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Divider, Space, Tooltip, Typography } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DivComponent from '../../Components/DivComponent';
import { RootState } from '../../redux/store';
import { cardStyle } from '../../styles/ComponentStyles';
import { oznaciNotifikacijeProcitanima, resetNotifikacije } from '../../redux/NotifikacijeSlice';
import SpaceComponent from '../../Components/SpaceComponent';

const Notifikacije = () => {
    const notifikacije = useSelector((state: RootState) => state.notifikacije.notifikacija);
    const dispatch = useDispatch();
    const { Title } = Typography;

    const sortedNotifications = notifikacije.slice().sort((a, b) => {
      const dateA = a.datumKreiranja ? new Date(a.datumKreiranja) : null;
      const dateB = b.datumKreiranja ? new Date(b.datumKreiranja) : null;
  
      if (dateA && dateB) {
        return dateB.getTime() - dateA.getTime();
      } else if (!dateA && !dateB) {
        return 0;
      } else if (!dateA) {
        return 1;
      } else {
        return -1;
      }
    });

    return (
        <DivComponent>
            <Card style={cardStyle}>
                <Space>
                    <Title level={2}>
                        <Space>
                            {
                                <Link to="/zadaciPage">
                                    <ArrowLeftOutlined />
                                </Link>
                            }
                            Obavijesti
                        </Space>
                    </Title>
                </Space>
                <Divider />
                <Space>
                    <Tooltip title="Obriši sve obavijesti"><Button onClick={() => dispatch(resetNotifikacije())}><DeleteOutlined style={{ color: "#cf1322", fontSize: "20px" }} /></Button></Tooltip>
                    <Tooltip title="Označi sve kao pročitano"><Button onClick={() => dispatch(oznaciNotifikacijeProcitanima())}><CheckCircleOutlined style={{ color: "#7cb305", fontSize: "20px" }} /></Button></Tooltip>
                </Space>
                <div style={{ marginTop: "20px" }}>
                    {
                        sortedNotifications.map(notifikacija => {
                            return (
                                <>
                                    <strong>
                                        <Space>
                                            {
                                                !notifikacija.procitano &&
                                                <Badge dot />
                                            }
                                            {notifikacija.naslov}
                                        </Space>
                                    </strong>
                                    <p>{notifikacija.opis}</p>
                                    <Divider />
                                </>
                            )
                        })
                    }
                </div>

            </Card>
        </DivComponent>
    )
}

export default Notifikacije;
