import React, { ReactNode } from "react";

interface DivComponentProps {
    children: ReactNode;
}

const DivComponent: React.FC<DivComponentProps> = ({ children }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', overflowY: 'auto' }}>
            {children}
        </div>
    );
}

export default DivComponent;