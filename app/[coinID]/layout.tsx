// app/coins/[coinId]/layout.tsx
import DashboardElements from '@/components/shared-components/element/DashboardElements';
import React, { ReactNode } from 'react';

interface CoinLayoutProps {
    children: ReactNode; // Defines the type of children
}

const CoinLayout: React.FC<CoinLayoutProps> = ({ children }) => {
    return (
        <DashboardElements>
            {children}
        </DashboardElements>
    );
};

export default CoinLayout;
