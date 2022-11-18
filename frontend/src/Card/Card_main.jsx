import React from "react";
import "./Card.css";
import Card from "./Card";
import { isEmpty } from "../assets/empty"
import { useEffect } from "react";

const Cards = (props) => {

    useEffect(() => {
    }, [props.dashboardData])
    return (
        <div className="main_card">
            {!isEmpty(props.dashboardData) ?
                            <Card chart={props.dashboardData.attribution.chart} setFilter_data={props.setFilter_data} data={props.dashboardData.attribution.card} />
                 : <div> No Data</div> 
             } 
        </div>
    );
};

export default Cards;