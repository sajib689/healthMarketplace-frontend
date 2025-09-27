import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

const PaymentConfirmation = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setShowAnimation(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col justify-center items-center p-6 text-center relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at center, rgba(34, 197, 94, 0.05) 0%, transparent 70%)",
        }}
      ></div>

      {/* Success particles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-60"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animation: `floatParticle ${
                3 + Math.random() * 2
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-xl w-full">
        {/* Success icon with enhanced animation */}
        <div className="relative mb-8">
          <div
            className="transform transition-all duration-1000 ease-out"
            style={{
              transform: showAnimation ? "scale(1)" : "scale(0.5)",
              opacity: showAnimation ? 1 : 0,
            }}
          >
            <div className="relative">
              {/* Pulsing rings */}
              <div className="absolute inset-0 w-24 h-24 mx-auto">
                <div
                  className="absolute inset-0 border-2 border-purple-400 rounded-full opacity-30"
                  style={{
                    animation: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
                  }}
                ></div>
                <div
                  className="absolute inset-2 border-2 border-purple-400 rounded-full opacity-20"
                  style={{
                    animation: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
                    animationDelay: "300ms",
                  }}
                ></div>
              </div>

              {/* Main icon */}
              <div className="relative bg-purple-500 bg-opacity-20 backdrop-blur rounded-full p-6 mx-auto w-fit">
                <CheckCircle
                  size={60}
                  className="text-purple-400 mx-auto"
                  style={{
                    animation: "gentleBounce 2s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Success messages with staggered animation */}
        <div className="space-y-4">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 text-white transform transition-all duration-1000 ease-out"
            style={{
              transform: showAnimation ? "translateY(0)" : "translateY(32px)",
              opacity: showAnimation ? 1 : 0,
              transitionDelay: "300ms",
              background:
                "linear-gradient(to right, #ffffff, #dcfce7, #ffffff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Payment Successful! 🎉
          </h1>

          <p
            className="text-xl md:text-2xl text-gray-300 font-light transform transition-all duration-1000 ease-out"
            style={{
              transform: showAnimation ? "translateY(0)" : "translateY(32px)",
              opacity: showAnimation ? 1 : 0,
              transitionDelay: "600ms",
            }}
          >
            Thank you for your enrollment
          </p>
        </div>

        {/* Subtle success indicator */}
        <div
          className="mt-12 inline-flex items-center gap-2 px-4 py-2 bg-purple-500 bg-opacity-10 border border-purple-500 border-opacity-20 rounded-full text-sm text-purple-400 transform transition-all duration-1000 ease-out"
          style={{
            transform: showAnimation ? "translateY(0)" : "translateY(32px)",
            opacity: showAnimation ? 1 : 0,
            transitionDelay: "900ms",
          }}
        >
          <div
            className="w-2 h-2 bg-purple-400 rounded-full"
            style={{
              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          ></div>
          Transaction completed successfully
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes floatParticle {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0; 
            }
            10% { 
              opacity: 1; 
            }
            50% { 
              transform: translateY(-20px) rotate(180deg); 
              opacity: 1; 
            }
            90% { 
              opacity: 1; 
            }
          }
          
          @keyframes gentleBounce {
            0%, 100% { 
              transform: translateY(0); 
            }
            50% { 
              transform: translateY(-10px); 
            }
          }
          
          @keyframes ping {
            75%, 100% {
              transform: scale(2);
              opacity: 0;
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: .5;
            }
          }
          
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `,
        }}
      />
    </div>
  );
};

export default PaymentConfirmation;
