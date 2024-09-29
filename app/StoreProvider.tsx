"use client"
import store from '@/Redux/store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

// Double-check this import path

interface IProps{
    children:ReactNode;
}
export default function StoreProvider({children}:IProps) {
  return <Provider store={store}>{children}</Provider>;
}