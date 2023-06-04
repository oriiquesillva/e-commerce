"use client"

import { BackButton } from "@/components/back-button";
import { CartItem } from "@/components/cart/cart-item";
import { DefaultPageLayout } from "@/components/default-page-layout";
import { Divider } from "@/components/divider";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ProductInCart } from "@/types/product";
import { formatPrice } from "@/utils/format-price";
import styled from "styled-components";


const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 32px;

    @media(min-width: ${props => props.theme.desktopBreakpoint}){
        flex-direction: row;
    }
`

const CartListContainer = styled.div`
    margin-top: 24px;

    h3{
        font-size: 24px;
        font-weight: 500;
        text-transform: uppercase;
        line-height: 150%;
        color: var(--text-dark-2);
    }

    p{
        font-size: 16px;
        font-weight: 300;
        line-height: 150%;
        color: var(--text-dark-2);
        


        span{
            font-weight: 600;
            margin-left: 5px;
        }
    }
    
`

const CartList = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 24px;
    gap: 16px;
`

const CartResumeContainer = styled.div`
    min-width: 352px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 16px 24px;
    background: white;

    h3{
        font-size: 20px;
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 30px;
        color: var(--text-dark-2);
    }
`

const TotalContainer = styled.div<{isBold: boolean}>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    font-size: 16px;
    font-weight: ${props => props.isBold ? "600" : "400"};
    line-height: 150%;
`

const ShopButton = styled.button`
    width: 100%;
    border: none;
    margin-top: 40px;
    border-radius: 4px;
    padding: 12px 12px;
    cursor: pointer;

    color: white;
    background: var(--success-color);
`


export default function CartPage(){
    const { value, updateLocalStorage } = useLocalStorage<ProductInCart[]>("cart-items", [])

    const calculateTotal = (value: ProductInCart[])=> {
        return value.reduce((sum, item) => sum += (item.price_in_cents * item.quantity), 0)
    }

    const cartTotal = formatPrice(calculateTotal(value)) 
    const deliveryFee = 4000
    const cartTotalWDelivery =  formatPrice(calculateTotal(value) + deliveryFee) 

    const handleUpdateQuantity = (id: string, quantity: number) => {
        const newValue = value.map(item => {
            if(item.id !== id) return item
            return {...item, quantity: quantity}
        })

        updateLocalStorage(newValue)
    }

    const handleDelete = (id: string) => {
        const newValue = value.filter(item => {
            if(item.id !== id) return item
        })

        updateLocalStorage(newValue)
    }

    return(
        <DefaultPageLayout>
            <BackButton navigate="/"/>
                <Container>
                    <CartListContainer>
                        <h3>Seu carrinho</h3>
                        <p>
                            Total {value.length} produto(s).
                            <span>{cartTotal}</span>
                        </p>
                        <CartList>
                            {value.map(item => 
                            <CartItem
                                key={item.id}
                                 product={item} 
                                 handleUpdateQuantity={handleUpdateQuantity}
                                 handleDelete={handleDelete}
                                 />)}
                        </CartList>
                    </CartListContainer>
                    <CartResumeContainer>
                        <h3>Resumo do pedido</h3>
                        <TotalContainer isBold={false}>
                            <p>Subtotal de produtos</p>
                            <span>{cartTotal}</span>
                        </TotalContainer>
                        <TotalContainer isBold={false}>
                            <p>Entrega</p>
                            <span>{formatPrice(deliveryFee)}</span>
                        </TotalContainer>
                        <Divider/>
                        <TotalContainer isBold>
                            <p>Total</p>
                            <span>{cartTotalWDelivery}</span>
                        </TotalContainer>
                        <ShopButton>FINALIZAR COMPRA</ShopButton>
                    </CartResumeContainer>
                </Container>
        </DefaultPageLayout>
    )
}