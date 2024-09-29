// components/CustomCard.tsx
import { Card, Text } from '@mantine/core';

interface CustomCardProps {
  title: string;
  value: string | number;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, value }) => {
  return (
    <Card radius="20px" padding="20px" style={{ backgroundColor: '#1d2129' }}>
      <Text
        style={{
          fontSize: "36px",
          fontWeight: 'lighter',
          color: 'white'
        }}>
        {value}
      </Text>
      <Text
        style={{
          fontSize: "12px",
          fontWeight: 'lighter',
        }}>
        {title}
      </Text>
    </Card>
  );
};

export default CustomCard;
