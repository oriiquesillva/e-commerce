"use client"

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CartIcon } from "./icons/cart-icon";
import styled from "styled-components";
import { useRouter } from "next/navigation";



const Container = styled.button`
    position: relative;
    border: none;
    background: transparent;
    cursor: pointer;
`

const CartCount = styled.span`
    width: 17px;
    height: 17px;
    border-radius: 100%;
    padding: 0 5px;
    font-size: 10px;
    position: absolute;
    top: 15px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--delete-color);
    color: white;

    margin-left: 15px;
`


export function CartControl () {
    const router = useRouter()
    const { value } =  useLocalStorage("cart-items", [])

    const handleNavigate = () => {
        router.push("/cart")
    }
    return (
        <Container onClick={handleNavigate}>
            <CartIcon/>
            {value.length > 0 && <CartCount>{value.length}</CartCount>}
        </Container>
    )
}