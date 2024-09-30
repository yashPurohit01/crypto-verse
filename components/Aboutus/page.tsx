import React from 'react';
import { Title, Text, Flex, Box, List } from '@mantine/core';

const AboutUsMain: React.FC = () => {
    return (
        <Box  mr={'lg'}  ml={'lg'} style={{  borderRadius: '8px'  , padding:'60px', margin:'xl'}}>
            <Title order={1} style={{ marginBottom: '4rem' }}>
                About Crypto Verse
            </Title>
            <Text size="md" fw={'lighter'} c={'white'} style={{ marginBottom: '16px' }}>
                Welcome to Crypto Verse, your ultimate destination for exploring the world of cryptocurrencies! Our mission is to provide users with an intuitive and comprehensive platform for tracking, analyzing, and investing in digital assets.
            </Text>
            <Text size="sM" fw={'lighter'} c={'white'} style={{ marginBottom: '16px' }}>
                At Crypto Verse, we believe that everyone should have access to accurate and timely information about cryptocurrencies. Our platform offers a wide array of features designed to empower users to make informed decisions:
            </Text>
            {/* <List spacing="sM" size="sM" style={{ marginBottom: '16px' }}>
                <List.Item>🔍 **Comprehensive Market Data**: Real-time prices, market capitalization, volume, and price changes for all major cryptocurrencies.</List.Item>
                <List.Item>📈 **Advanced Charting Tools**: Access to powerful charts that allow you to analyze historical data and trends.</List.Item>
                <List.Item>📰 **Latest News & Insights**: Stay updated with the latest news and developments in the crypto world.</List.Item>
                <List.Item>📊 **Portfolio Tracking**: Easily track your cryptocurrency investments and monitor your portfolio's performance.</List.Item>
                <List.Item>👥 **Community Engagement**: Join discussions, share insights, and connect with fellow crypto enthusiasts through our community forums.</List.Item>
                <List.Item>🔔 **Alerts & Notifications**: Set price alerts and get notified of significant market movements.</List.Item>
            </List> */}
            <Text size="sM" fw={'lighter'} c={'white'} style={{ marginBottom: '16px' }}>
                Whether you're a seasoned trader or just starting your cryptocurrency journey, Crypto Verse is designed to cater to all levels of expertise. We aim to create an inclusive and supportive environment for all users.
            </Text>
            <Text size="sM" fw={'lighter'} c={'white'} style={{ marginBottom: '16px' }}>
                **Our Vision**: We envision a future where everyone has the knowledge and tools necessary to navigate the world of digital currencies confidently. We strive to be a leading source of information and innovation in the cryptocurrency space, continually adapting to the evolving landscape.
            </Text>
            <Text size="sM" fw={'lighter'} c={'white'} style={{ marginBottom: '16px' }}>
                **Our Commitment**: We are committed to continuous improvement and innovation, ensuring that our users have the best tools at their fingertips. Our dedicated team works tirelessly to enhance the platform based on user feedback and the latest trends in the market.
            </Text>
            <Text size="sM" fw={'lighter'} c={'white'} style={{ marginBottom: '16px' }}>
                Thank you for choosing Crypto Verse, where your cryptocurrency journey begins! We invite you to explore, learn, and grow with us as we embark on this exciting adventure together.
            </Text>
            <Flex justify="center" style={{ margin: '2rem' }}>
                <Text size="md" w={700} c="dimmed">
                    Connect with us on social media for the latest updates and community discussions!
                </Text>
            </Flex>
        </Box>
    );
};

export default AboutUsMain;
