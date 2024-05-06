import { BellOutlined } from "@ant-design/icons";
import { Badge, Dropdown } from "antd";
import React from "react";
import { Notifikacija } from "../redux/NotifikacijeSlice";

interface Props{
    dropdownOverlay: any;
    handleVisibleChange: (flag: boolean) => void;
    neprocitaneNotifikacije: Notifikacija[];
}

const BellNotifications = (props: Props) => {

    return (
        <Dropdown overlay={props.dropdownOverlay} trigger={['click']} onOpenChange={props.handleVisibleChange}>
            <div style={{ position: 'relative' }}>
                <Badge count={props.neprocitaneNotifikacije.length}>
                    <BellOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
                </Badge>
            </div>
        </Dropdown>
    );
}

export default BellNotifications;