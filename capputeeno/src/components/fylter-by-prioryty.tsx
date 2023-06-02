import styled from "styled-components"
import { ArrowIcon } from "./icons/arrow-icon"
import { useState } from "react"
import { useFilter } from "@/hooks/useFilter"
import { PriorityTypes } from "@/types/priority-types"

interface FilterByPriorityProps{

}

const Container = styled.div`
    display: flex;
    align-items: center;
    position: relative;

    button{
        border: none;
        background: transparent;
        font-family: inherit;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;

        display: flex;
        align-items: center;
        justify-content: center;
        
        color: var(--text-dark);
        cursor: pointer;

        svg{
            margin-left: 10px;
        }
    }
`

const Filters = styled.ul`
    width: 200px;
    background: #FFFFFF;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 12px 16px;
    list-style: none;
    z-index: 999;

    position: absolute;
    top: 100%;

    li{
        color: var(--text-dark);
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        cursor: pointer;
    }

    li + li {
        margin-top: 4px;
    }

`

export function FilterByPriority(pros: FilterByPriorityProps) {
    const [openFilters, setOpenFilters] = useState(false)
    const { setPriority } = useFilter()

    const handleOpen = () => setOpenFilters(prev => !prev)

    const handlePriority = (value: PriorityTypes) => {
        setPriority(value)
        setOpenFilters(false)
    }
    

    return(
        <Container>
            <button onClick={handleOpen}>
                Organizar por
                <ArrowIcon/>
            </button>
            {openFilters && 
            <Filters>
                <li onClick={() => handlePriority(PriorityTypes.NEWS)}>Novidade</li>
                <li onClick={() => handlePriority(PriorityTypes.BIGGEST_PRICE)}>Preço: Maior - menor</li>
                <li onClick={() => handlePriority(PriorityTypes.MINOR_PRICE)}>Preço: Menor - maior</li>
                <li onClick={() => handlePriority(PriorityTypes.POPULARITY)}>Mais vendidos</li>
            </Filters>
            }

        </Container>
    )
}