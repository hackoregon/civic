import React from 'react'
import { StickyContainer } from 'react-sticky'
import Budget101 from '../Budget101'
import StackedArea from '../StackedAreaChart'
import './CardCollection.css'

const CardCollection = () => (
    <div className="budget-card-collection">
        <StickyContainer className="budget-card-collection__sticky-container">
            <div className="budget-card-collection__intro-hero">
                <h1 className="budget-heading Rubik">Run the Numbers</h1>
                <p className="budget_card_collection__intro-hero-text">
                    Portland's city budget is arguably the city's most important
                    policy document. The budget contains the plan for spending
                    our collective resources across city programs and services.
                    Yet, annual budget decisions often receive far less
                    attention than other questions considered at City Hall.
                    Explore 10 years worth of budget data, learn where Portland
                    spends its money, and get involved in the decision-making!
                </p>
            </div>
            <div className="ten-year__wrapper">
                <div className="ten-year__stacked-area-wrapper">
                    <StackedArea />
                </div>
            </div>
        </StickyContainer>
        <Budget101 />
    </div>
)

export default CardCollection
