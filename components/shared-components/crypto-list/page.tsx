"use client"
import { CoinDetail } from '@/Redux/interface';
import { AppDispatch } from '@/Redux/store';
import { fetchCoins } from '@/Redux/thunks/CryptoThunks';
import { Flex, Group, Image, Menu, Text, Title, UnstyledButton } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import classes from './CryptoList.module.css';

function CryptoList() {
    const [opened, setOpened] = useState(false);
    const [dateOpened, setDateOpened] = useState(false);
    const { coins } = useSelector((state: any) => state.coins);
    const dispatch: AppDispatch = useDispatch();
    const [selected, setSelected] = useState<CoinDetail>();

    useEffect(() => {
        dispatch(fetchCoins());
    }, []);

    useEffect(() => {
        if (coins.length > 0) {
            setSelected(coins[0]);
        }
    }, [coins]);

    const items = coins?.map((coin: CoinDetail) => (
        <Menu.Item
            leftSection={<Image src={coin.item.small} width={18} height={18} />}
            onClick={() => {
                setSelected(coin);

            }}
            key={coin.item.id}
        >
            {coin.item.symbol}
        </Menu.Item>
    ));

    return (
        <Flex direction={'column'} gap={6}>
            <Flex justify={'space-between'}>
                <Menu
                    onOpen={() => setOpened(true)}
                    onClose={() => setOpened(false)}
                    radius="md"
                    width="target"
                    withinPortal
                >
                    <Menu.Target>
                        <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
                            <Group gap="xs">
                                <Image src={selected?.item?.small} width={32} height={32} style={{ borderRadius: '8px', background: 'white' }} />
                                <span style={{ color: 'var(--mantine-color-secondary-1)' }} className={classes.label}>
                                    {selected?.item?.symbol}
                                </span>
                            </Group>

                        </UnstyledButton>
                    </Menu.Target>
                    <Menu.Dropdown style={{ border: 'none' }}>{items}</Menu.Dropdown>
                </Menu>
                <Title style={{ fontSize: '48px', fontWeight: 'lighter', marginLeft: '4px' }} className={classes.price}>
                    ${selected?.item?.data?.price?.toFixed(6)}
                </Title>
            </Flex>
            <Flex>
                <Text fz="xs" tt="uppercase" fw={300} c="dimmed" style={{ color: 'var(--mantine-color-secondary-4)' }} className={classes.label}>
                    {selected?.item?.name}
                </Text>
            </Flex>
        </Flex>
    )
}

export default CryptoList