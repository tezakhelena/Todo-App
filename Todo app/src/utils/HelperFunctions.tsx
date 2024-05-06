import React from "react";
import { CloseCircleOutlined, ExclamationCircleOutlined, InfoCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Moment } from "moment";
import { ReactNode } from "react";
import { Tooltip } from "antd";

export const formatDate = (date: Moment): string => {
    return date.format('YYYY-MM-DD');
};

export const formatDatumKreiranjaDate = (value: string | number | Date | undefined): string => {
    if (value) {
        const date = value instanceof Date ? value : new Date(value);
        return date.toLocaleDateString();
    }
    return '';
};

export const pretvoriVaznostUIkonicu = (vaznost: string): ReactNode => {
    if (vaznost) {
        switch (vaznost.toLowerCase()) {
            case 'niska':
                return <Tooltip title="Niska važnost"><MinusCircleOutlined style={{ color: '#7cb305', fontSize: '20px' }}/></Tooltip>;
            case 'srednja':
                return <Tooltip title="Srednja važnost"><InfoCircleOutlined style={{ color: '#0958d9', fontSize: '20px' }}/></Tooltip>;
            case 'visoka':
                return <Tooltip title="Visoka važnost"><ExclamationCircleOutlined style={{ color: '#faad14', fontSize: '20px' }}/></Tooltip>;
            case 'kritična':
                return <Tooltip title="Kritična važnost"><CloseCircleOutlined style={{ color: '#d4380d', fontSize: '20px' }} /></Tooltip>;
            default:
                return null;
        }
    }
}

export const pretvoriVaznostUIkonicuTekst = (vaznost?: string): ReactNode => {
    if(vaznost){
        switch (vaznost.toLowerCase()) {
            case 'niska':
                return <span>Niska <MinusCircleOutlined style={{ color: '#7cb305', fontSize: '20px' }}/></span>;
            case 'srednja':
                return <span>Srenja <InfoCircleOutlined style={{ color: '#0958d9', fontSize: '20px' }}/></span>;
            case 'visoka':
                return <span>Visoka <ExclamationCircleOutlined style={{ color: '#faad14', fontSize: '20px' }}/></span>;
            case 'kritična':
                return <span>Kritična <CloseCircleOutlined style={{ color: '#d4380d', fontSize: '20px' }} /></span>;
            default:
                return null;
        }
    }
}

export const dohvatiVaznostOptions = [
    { value: 'niska', label: <span><MinusCircleOutlined style={{ color: '#7cb305', fontSize: '16px' }} /> Niska</span> },
    { value: 'srednja', label: <span><InfoCircleOutlined style={{ color: '#0958d9', fontSize: '16px' }} /> Srednja</span> },
    { value: 'visoka', label: <span><ExclamationCircleOutlined style={{ color: '#faad14', fontSize: '16px' }} /> Visoka</span> },
    { value: 'kritična', label: <span><CloseCircleOutlined style={{ color: '#d4380d', fontSize: '16px' }} /> Kritična</span> }
]