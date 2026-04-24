interface LogoProps {
  className?: string;
  width?: string;
  height?: string;
}

interface LogoWithTextProps {
  className?: string;
  logoSize?: string;
}

interface NavbarLogoProps {
  className?: string;
}

/**
 * Logo component for Vikash Maskhare Portfolio
 * Features: VM monogram with modern design
 */
const Logo = ({ className = "", width = "50", height = "50" }: LogoProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Circle */}
      <circle cx="50" cy="50" r="48" fill="url(#gradient)" stroke="currentColor" strokeWidth="2" />
      
      {/* Gradient Definition */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#6366F1', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* VM Monogram */}
      <text
        x="50"
        y="50"
        fontFamily="Arial, sans-serif"
        fontSize="36"
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        VM
      </text>
      
      {/* Code Brackets Decoration */}
      <path
        d="M 25 35 L 20 40 L 25 45"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M 75 35 L 80 40 L 75 45"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
};

/**
 * Logo with text component
 */
export const LogoWithText = ({ className = "", logoSize = "40" }: LogoWithTextProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Logo width={logoSize} height={logoSize} />
      <div className="ml-3">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Vikash Maskhare
        </h1>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Software Engineer
        </p>
      </div>
    </div>
  );
};

/**
 * Compact Logo for Navbar
 */
export const NavbarLogo = ({ className = "" }: NavbarLogoProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Logo width="40" height="40" />
      <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">
        VM Portfolio
      </span>
    </div>
  );
};

export default Logo;

