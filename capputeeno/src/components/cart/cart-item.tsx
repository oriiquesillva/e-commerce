"use client"

import { ProductInCart } from "@/types/product"
import { formatPrice } from "@/utils/format-price"
import { ChangeEvent } from "react"
import styled from "styled-components"
import { DeleteIcon } from "../icons/delete-icon"

interface CartItemProps{    
    product: ProductInCart
    handleUpdateQuantity(id: string, quantity: number) : void
    handleDelete(id: string) : void
}

const Item = styled.li`
    height: 210px;
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 8px;
    background-color: white;
    position: relative;

    img{
        max-height: 100%;
        width: 256px;
        border-radius: 8px 0 0 8px;
    }

    button{
        position: absolute;
        top: 16px;
        right: 24px;
        background: transparent;
        border: none;
        cursor: pointer;


    }

    > div{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-direction: column;
        padding: 16px 24px;
        line-height: 150%;
        color: var(--text-dark-2);

        h4{
            font-weight: 300;
            font-size: 20px;

        }

        p{
            font-weight: 400;
            font-size: 12px;
            max-height: 50%;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        div {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

                span{
                    font-weight: 600;
                    font-size: 16px;
                    color: var(--shapes-dark);
                }

        }
    }
`

const SelectQuantity = styled.select`
    padding: 8px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background-color: var(--bg-secondary);
    
    font-size: 16px;
    font-weight: 400;
    color: var(--text-dark);

`

export function CartItem({ product, handleUpdateQuantity, handleDelete }: CartItemProps) {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) =>{
        handleUpdateQuantity(product.id, Number(e.target.value))
    }
    return(
        <Item>
            <button onClick={() => handleDelete(product.id)} aria-label="Deletar">
                <DeleteIcon />
            </button>
            <img src={product.image_url} alt="" />
            <div>
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <div>
                    <SelectQuantity value={product.quantity} onChange={handleChange}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </SelectQuantity>
                    <span>{formatPrice(product.price_in_cents)}</span>
                </div>
            </div>
        </Item>
    )
}