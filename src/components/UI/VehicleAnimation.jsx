export default function VehicleAnimation() {
  return (
    <div className="mt-6 pt-4 border-t border-gray-600">
      <div className="flex items-center justify-center h-28 relative overflow-hidden">
        {/* Animated car container */}
        <div className="car-container">
          <svg
            className="car-svg"
            viewBox="0 0 100 70"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Car body (red) */}
            <rect x="10" y="32" width="55" height="20" rx="2" fill="#dc2626" />
            
            {/* Car top/roof (darker red) */}
            <rect x="20" y="22" width="35" height="12" rx="2" fill="#b91c1c" />
            
            {/* Front windshield */}
            <rect x="48" y="25" width="10" height="10" rx="1" fill="#87ceeb" opacity="0.7" />
            
            {/* Rear window */}
            <rect x="22" y="25" width="9" height="10" rx="1" fill="#87ceeb" opacity="0.7" />
            
            {/* Front bumper (minimal hood) */}
            <rect x="57" y="32" width="2" height="20" fill="#1f2937" />
            
            {/* Rear bumper */}
            <rect x="8" y="32" width="2" height="20" fill="#1f2937" />
            
            {/* Front wheel - closer to center */}
            <circle cx="50" cy="54" r="5" fill="#1f2937" />
            <circle cx="50" cy="54" r="2.5" fill="#666" />
            
            {/* Rear wheel */}
            <circle cx="22" cy="54" r="5" fill="#1f2937" />
            <circle cx="22" cy="54" r="2.5" fill="#666" />
            
            {/* Front headlights (yellow) - always on at edge */}
            <circle className="front-light" cx="64" cy="36" r="2" fill="#fbbf24" />
            <circle className="front-light" cx="64" cy="44" r="2" fill="#fbbf24" />
            
            {/* Light beam glow (yellow triangles) */}
            <polygon points="64,36 72,32 72,40" fill="#fbbf24" opacity="0.3" />
            <polygon points="64,44 72,40 72,48" fill="#fbbf24" opacity="0.3" />
            
            {/* Brake lights (red) at rear */}
            <circle className="brake-light" cx="8" cy="36" r="2" fill="#ef4444" />
            <circle className="brake-light" cx="8" cy="44" r="2" fill="#ef4444" />
            
            {/* Reverse lights (white) at rear */}
            <circle className="reverse-light" cx="8" cy="36" r="2" fill="#ffffff" />
            <circle className="reverse-light" cx="8" cy="44" r="2" fill="#ffffff" />
          </svg>
        </div>
      </div>
      
      <style>{`
        .car-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .car-svg {
          width: 150px;
          height: 87px;
          animation: driveCar 8s ease-in-out infinite;
        }

        @keyframes driveCar {
          /* Start at LEFT edge - expanded range by 1/3 more */
          0% {
            transform: translateX(-107px);
          }
          /* Moving RIGHT (forward) */
          25% {
            transform: translateX(150px);
          }
          /* Brake at RIGHT edge */
          30% {
            transform: translateX(150px);
          }
          /* Moving LEFT (backward) */
          55% {
            transform: translateX(-107px);
          }
          /* Brake at LEFT edge - back to start */
          60% {
            transform: translateX(-107px);
          }
          /* Seamless loop - same position as start */
          100% {
            transform: translateX(-107px);
          }
        }

        /* Front lights (yellow): ALWAYS ON */
        .front-light {
          opacity: 0.9;
          animation: none;
        }

        /* Brake lights (red): on when stopped */
        .brake-light {
          opacity: 0;
          animation: brakeLights 10s linear infinite;
        }

        @keyframes brakeLights {
          /* Forward movement - lights off */
          0%, 19% {
            opacity: 0;
          }
          /* First stop - lights on earlier */
          20%, 29% {
            opacity: 0.9;
          }
          /* Moving backward - lights off */
          30%, 54% {
            opacity: 0;
          }
          /* Second stop - lights on */
          55%, 59% {
            opacity: 0.9;
          }
          /* Back to start */
          60%, 100% {
            opacity: 0;
          }
        }

        /* Reverse lights (white): on ONLY when moving backward */
        .reverse-light {
          opacity: 0;
          animation: reverseLights 10s linear infinite;
        }

        @keyframes reverseLights {
          /* Forward and first stop - lights off */
          0%, 29% {
            opacity: 0;
          }
          /* Moving backward - lights on */
          30%, 54% {
            opacity: 0.95;
          }
          /* Second stop and rest - lights off */
          55%, 100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
