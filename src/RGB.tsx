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
        const isMidPower = level < 50;
        const isHighPower = level < 100;

        if (isCharging) {
          setState('charging');
          console.log('Charging');
        } else if (isLowPower) {
          setState('low-power');
          console.log('Low power');
        } else if (isMidPower) {
          setState('mid-power');
          console.log('Mid power');
        } else if (isHighPower) {
          setState('high-power');
          console.log('High power');
        } else {
          setState('high-power');
          console.log('High power (Full)');
        }
      } catch (error) {
        console.error("Failed to get battery info:", error);
      }
    }

    updateBatteryInfo();
    setInterval(updateBatteryInfo, 1000);

  }, []);

  return (
    <>
      <div className="container">
        <div className="rgb"
          style={{
            background: `var(--${state}, #1a1a1a)`
          }}
        ></div>
      </div>
    </>
  )
}
