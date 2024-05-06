import { Space } from "antd";
import React, { ReactNode } from "react";

interface SpaceComponentProps {
    children: ReactNode;
}

const SpaceComponent: React.FC<SpaceComponentProps> = ({ children }) => {
    return (
        <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
            {children}
        </Space>
    );
}

export default SpaceComponent;