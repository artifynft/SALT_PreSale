import React from "react";
import moment from "moment";
import { useTimer } from "react-timer-hook";
import "./countdown.css";

function TimerApp({ expiryTimestamp }) {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div style={{ textAlign: "center", color: "white", marginTop: "1.5rem" }}>
      <div className="counterTitle">
        Don't Miss The Golder Chance <br /> Own the `AI KITT` in pre-sales
        {/* {moment.utc(expiryTimestamp).toString("MMMM Do, yyyy hh:mm:ss")} */}
      </div>
      <div className="countdown">
        <div className="card">
          <div className="countdown-value">{days}</div>
          <div className="countdown-unit">Days</div>
        </div>
        <div className="card">
          <div className="countdown-value">{hours}</div>
          <div className="countdown-unit">Hours</div>
        </div>
        <div className="card">
          <div className="countdown-value">{minutes}</div>
          <div className="countdown-unit">Mins</div>
        </div>
        <div className="card">
          <div className="countdown-value">{seconds}</div>
          <div className="countdown-unit">Secs</div>
        </div>
      </div>
    </div>
  );
}

export default TimerApp;
//function App() {
//   const time = new Date("06-01-2023 03:00 pm");
//   time.setSeconds(time.getSeconds() + 0); // 10 minutes timer
//   return (
//     <div>
//       <TimerApp expiryTimestamp={time} />
//     </div>
//   );
// }
