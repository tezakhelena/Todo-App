import { Button } from "antd";
import React from "react";
import { Link } from 'react-router-dom';
import ZadaciStatistics from "../Zadaci/pages/ZadaciStatistics";

const Pocetna = () => {
    return (
        <div className="home-container">
            <div className="center-content">
                <Link to="/zadaciPage">
                    <Button type="primary">Upravljaj Zadacima</Button>
                </Link>

                <ZadaciStatistics />
            </div>
        </div>
    )
}

export default Pocetna;