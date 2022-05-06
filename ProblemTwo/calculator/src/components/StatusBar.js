import { useEffect, useState } from "react";

import NetworkBars from "../svg/NetworkBars";
import Battery from "../svg/Battery";
import Bluetooth from "../svg/Bluetooth";

import "../styles/statusbar.css";

function StatusBar() {

    const today = new Date();
    const defaultTime = {
        hour: (today.getHours() % 12) ? (today.getHours() % 12) : 12,
        minute: today.getMinutes(),
        meridiem: today.getHours() >= 12 ? "PM" : "AM"
    }

    const [time, setTime] = useState(defaultTime);

    useEffect(() => {
        const timer = setInterval(() => {
            const date = new Date();
            var hours = date.getHours();
            var meridiem = hours >= 12 ? "PM" : "AM";

            hours = hours % 12;
            hours = hours ? hours : 12  // "0" is supposed to be "12" am

            setTime({
                hour: hours,
                minute: date.getMinutes(),
                meridiem: meridiem,
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    }, []);


    return(
        <div className="status-bar">
            <div className="status-bar-left">
                <span className="status-bar-network"><NetworkBars /></span>
                <span className="status-bar-carrier">TELUS</span>
            </div>
            <div className="status-bar-clock">
                <span className="status-bar-clock-hour">{time.hour}</span>
                <span className="status-bar-clock-colon">:</span>
                <span className="status-bar-clock-minute">{time.minute < 10 ? `0${time.minute}` : `${time.minute}`}</span>
                <span className="status-bar-clock-meridiem">{` ${time.meridiem}`}</span>
            </div>
            <div className="status-bar-right">
                <span className="status-bar-bt"><Bluetooth/></span>
                <span className="status-bar-battery-percent">100%</span>
                <span className="status-bar-battery"><Battery/></span>
            </div>
        </div>
    )
}

export default StatusBar;