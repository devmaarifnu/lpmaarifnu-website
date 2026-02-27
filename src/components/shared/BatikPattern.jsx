/**
 * Batik Pattern Component
 * Elegant SVG pattern terinspirasi dari motif batik Indonesia
 * Pattern yang lebih simple, professional, dan tidak terlalu ramai
 */
export default function BatikPattern({ opacity = 0.12 }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ opacity }}
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="batik-pattern"
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            {/* Main circular motif - center */}
            <circle cx="100" cy="100" r="40" fill="none" stroke="white" strokeWidth="2" opacity="0.5"/>
            <circle cx="100" cy="100" r="30" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4"/>
            <circle cx="100" cy="100" r="20" fill="none" stroke="white" strokeWidth="1" opacity="0.35"/>
            <circle cx="100" cy="100" r="10" fill="white" opacity="0.2"/>

            {/* Corner decorative circles */}
            <circle cx="0" cy="0" r="20" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4"/>
            <circle cx="200" cy="0" r="20" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4"/>
            <circle cx="0" cy="200" r="20" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4"/>
            <circle cx="200" cy="200" r="20" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4"/>

            {/* Garis belok-belok menghubungkan corner kiri atas ke center */}
            <path
              d="M 20,20 L 30,30 L 25,40 L 35,50 L 30,60 L 40,70 L 35,80 L 60,100"
              fill="none"
              stroke="white"
              strokeWidth="1"
              opacity="0.3"
            />

            {/* Garis belok-belok menghubungkan corner kanan atas ke center */}
            <path
              d="M 180,20 L 170,30 L 175,40 L 165,50 L 170,60 L 160,70 L 165,80 L 140,100"
              fill="none"
              stroke="white"
              strokeWidth="1"
              opacity="0.3"
            />

            {/* Garis belok-belok menghubungkan corner kiri bawah ke center */}
            <path
              d="M 20,180 L 30,170 L 25,160 L 35,150 L 30,140 L 40,130 L 35,120 L 60,100"
              fill="none"
              stroke="white"
              strokeWidth="1"
              opacity="0.3"
            />

            {/* Garis belok-belok menghubungkan corner kanan bawah ke center */}
            <path
              d="M 180,180 L 170,170 L 175,160 L 165,150 L 170,140 L 160,130 L 165,120 L 140,100"
              fill="none"
              stroke="white"
              strokeWidth="1"
              opacity="0.3"
            />

            {/* Garis belok-belok horizontal - kiri ke center */}
            <path
              d="M 0,100 L 10,105 L 20,95 L 30,105 L 40,95 L 50,105 L 60,100"
              fill="none"
              stroke="white"
              strokeWidth="0.8"
              opacity="0.3"
            />

            {/* Garis belok-belok horizontal - kanan ke center */}
            <path
              d="M 200,100 L 190,105 L 180,95 L 170,105 L 160,95 L 150,105 L 140,100"
              fill="none"
              stroke="white"
              strokeWidth="0.8"
              opacity="0.3"
            />

            {/* Garis belok-belok vertikal - atas ke center */}
            <path
              d="M 100,0 L 105,10 L 95,20 L 105,30 L 95,40 L 105,50 L 100,60"
              fill="none"
              stroke="white"
              strokeWidth="0.8"
              opacity="0.3"
            />

            {/* Garis belok-belok vertikal - bawah ke center */}
            <path
              d="M 100,200 L 105,190 L 95,180 L 105,170 L 95,160 L 105,150 L 100,140"
              fill="none"
              stroke="white"
              strokeWidth="0.8"
              opacity="0.3"
            />

            {/* Garis meander di sekitar center circle - atas */}
            <path
              d="M 60,60 L 65,65 L 60,70 L 70,75 L 65,80 L 75,85 L 85,85 L 90,80 L 95,85 L 100,80 L 105,85 L 110,80 L 115,85 L 125,85 L 130,80 L 135,85 L 130,75 L 140,70 L 135,65 L 140,60"
              fill="none"
              stroke="white"
              strokeWidth="0.7"
              opacity="0.25"
            />

            {/* Garis meander di sekitar center circle - bawah */}
            <path
              d="M 60,140 L 65,135 L 60,130 L 70,125 L 65,120 L 75,115 L 85,115 L 90,120 L 95,115 L 100,120 L 105,115 L 110,120 L 115,115 L 125,115 L 130,120 L 135,115 L 130,125 L 140,130 L 135,135 L 140,140"
              fill="none"
              stroke="white"
              strokeWidth="0.7"
              opacity="0.25"
            />

            {/* Garis zig-zag melingkar di antara circles */}
            <path
              d="M 50,50 L 55,55 L 50,60 L 55,65 L 50,70 L 52,75 L 50,80 L 52,85 L 50,90 L 52,95 L 50,100"
              fill="none"
              stroke="white"
              strokeWidth="0.6"
              opacity="0.2"
            />
            <path
              d="M 150,50 L 145,55 L 150,60 L 145,65 L 150,70 L 148,75 L 150,80 L 148,85 L 150,90 L 148,95 L 150,100"
              fill="none"
              stroke="white"
              strokeWidth="0.6"
              opacity="0.2"
            />
            <path
              d="M 50,150 L 55,145 L 50,140 L 55,135 L 50,130 L 52,125 L 50,120 L 52,115 L 50,110 L 52,105 L 50,100"
              fill="none"
              stroke="white"
              strokeWidth="0.6"
              opacity="0.2"
            />
            <path
              d="M 150,150 L 145,145 L 150,140 L 145,135 L 150,130 L 148,125 L 150,120 L 148,115 L 150,110 L 148,105 L 150,100"
              fill="none"
              stroke="white"
              strokeWidth="0.6"
              opacity="0.2"
            />

            {/* Small accent circles */}
            <circle cx="50" cy="100" r="5" fill="white" opacity="0.25"/>
            <circle cx="150" cy="100" r="5" fill="white" opacity="0.25"/>
            <circle cx="100" cy="50" r="5" fill="white" opacity="0.25"/>
            <circle cx="100" cy="150" r="5" fill="white" opacity="0.25"/>

            {/* Diagonal accent circles */}
            <circle cx="70" cy="70" r="4" fill="white" opacity="0.2"/>
            <circle cx="130" cy="70" r="4" fill="white" opacity="0.2"/>
            <circle cx="70" cy="130" r="4" fill="white" opacity="0.2"/>
            <circle cx="130" cy="130" r="4" fill="white" opacity="0.2"/>

            {/* Subtle connecting lines */}
            <line x1="60" y1="100" x2="80" y2="100" stroke="white" strokeWidth="0.5" opacity="0.2"/>
            <line x1="120" y1="100" x2="140" y2="100" stroke="white" strokeWidth="0.5" opacity="0.2"/>
            <line x1="100" y1="60" x2="100" y2="80" stroke="white" strokeWidth="0.5" opacity="0.2"/>
            <line x1="100" y1="120" x2="100" y2="140" stroke="white" strokeWidth="0.5" opacity="0.2"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#batik-pattern)"/>
      </svg>
    </div>
  );
}
