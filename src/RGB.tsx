import { useEffect, useState } from "react"
import { getBatteryInfo } from "tauri-plugin-device-info-api";

export default function RGB() {
  const [state, setState] = useState('default');

  useEffect(() => {
    // Battery
    async function updateBatteryInfo() {
      try {
        const batteryInfo = await getBatteryInfo();
        const isCharging = !!batteryInfo?.isCharging;
        const level = batteryInfo?.level ?? 100;
        const isLowPower = level < 20;

        if (isCharging) {
          setState('charging');
          console.log('Battery state: charging');
        } else if (isLowPower) {
          setState('low-power');
          console.log('Battery state: low-power');
        } else {
          setState('default');
          console.log('Battery state: default');
        }
      } catch (error) {
        console.error("Failed to get battery info:", error);
      }
    }
    updateBatteryInfo();


    // Headphones

    // Statements


  }, [])

  return (
    <>
      <div className="container">
        <div className="rgb"
          style={{
            backgroundColor: `var(--${state})`
          }}
        ></div>
      </div>
    </>
  )
}
