import React, { ReactNode } from 'react';

interface IProps {
    active: boolean;
    onClick: () => void;
    children: ReactNode;
}

const Link: React.SFC<IProps> = ({ active, children, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        disabled={active}
        style={{
            marginLeft: '4px',
        }}
    >
        {children}
    </button>
)

export default Link;