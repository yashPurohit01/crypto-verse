"use client"
import { AppDispatch } from "@/Redux/store";
import { fetchCoins } from "@/Redux/thunks/CryptoThunks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export function Home() {
  const dispatch:AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCoins());
}, [dispatch]);

  return (
    <></>
  );
}

