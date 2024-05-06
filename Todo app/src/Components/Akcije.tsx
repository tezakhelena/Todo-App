import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space } from "antd";
import React from "react";

interface Props{
    onEdit: () => void;
    onDelete?: () => void;
}

const Akcije = ({onEdit, onDelete}: Props) => {
    return(
        <Space>
            <EditOutlined style={{color: "#7cb305", fontSize: "20px"}} onClick={onEdit}/>
            <DeleteOutlined style={{color: "#cf1322", fontSize: "20px"}} onClick={onDelete} />
        </Space>
    );
}

export default Akcije;