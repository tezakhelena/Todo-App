import { Card, Col, Row, Statistic } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";

const ZadaciStatistics = () => {

    const zadaci = useSelector((state: RootState) => state.tasks);

    return (
        <Row gutter={16} style={{marginTop: "20px"}}>
            <Col span={12}>
                <Card bordered={false} style={{width: "200px"}}>

                    <Statistic title="Nedovršeni zadaci"  value={zadaci.tasks.filter(zadatak => zadatak.status === 'aktivno').length} valueStyle={{ color: '#cf1322' }}
                        prefix={<ClockCircleOutlined />} />
                </Card>
            </Col>
            <Col span={12}>
                <Card bordered={false} style={{width: "200px"}}>
                    <Statistic title="Dovršeni zadaci" value={zadaci.tasks.filter(zadatak => zadatak.status === 'dovrseno').length} valueStyle={{ color: '#3f8600' }} prefix={<CheckCircleOutlined />}/>
                </Card>
            </Col>
        </Row>
    );
}

export default ZadaciStatistics;