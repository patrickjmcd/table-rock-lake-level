import { cn } from "@/lib/utils";

type LogoMarkProps = {
	className?: string;
	title?: string;
};

const LogoMark = ({
	className,
	title = "Table Rock Lake Level",
}: LogoMarkProps) => {
	return (
		<svg
			viewBox="0 0 120 120"
			role="img"
			aria-label={title}
			className={cn("h-9 w-9", className)}
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>{title}</title>
			<defs>
				<linearGradient id="trllBg" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#7DD3FC" />
					<stop offset="100%" stopColor="#0369A1" />
				</linearGradient>
				<linearGradient id="trllLake" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stopColor="#BAE6FD" />
					<stop offset="100%" stopColor="#E0F2FE" />
				</linearGradient>
				<clipPath id="trllCircleClip">
					<circle cx="60" cy="60" r="55" />
				</clipPath>
			</defs>

			<circle
				cx="60"
				cy="60"
				r="56"
				fill="url(#trllBg)"
				stroke="#F0F9FF"
				strokeOpacity="0.42"
				strokeWidth="2"
			/>

			<g clipPath="url(#trllCircleClip)">
				<path
					d="M2 54 L118 54"
					fill="none"
					stroke="#F8FAFC"
					strokeWidth="2.6"
					strokeLinecap="round"
					strokeOpacity="0.85"
				/>
				<rect
					x="8"
					y="54.5"
					width="2.2"
					height="12"
					rx="1"
					fill="#E2E8F0"
					fillOpacity="0.72"
				/>
				<rect
					x="20"
					y="54.5"
					width="2.2"
					height="10"
					rx="1"
					fill="#E2E8F0"
					fillOpacity="0.72"
				/>
				<rect
					x="32"
					y="54.5"
					width="2.2"
					height="9"
					rx="1"
					fill="#E2E8F0"
					fillOpacity="0.72"
				/>
				<rect
					x="44"
					y="54.5"
					width="2.2"
					height="8"
					rx="1"
					fill="#E2E8F0"
					fillOpacity="0.72"
				/>
				<rect
					x="56"
					y="54.5"
					width="2.2"
					height="8"
					rx="1"
					fill="#E2E8F0"
					fillOpacity="0.72"
				/>
				<rect
					x="68"
					y="54.5"
					width="2.2"
					height="9"
					rx="1"
					fill="#E2E8F0"
					fillOpacity="0.72"
				/>
				<rect
					x="80"
					y="54.5"
					width="2.2"
					height="10"
					rx="1"
					fill="#E2E8F0"
					fillOpacity="0.72"
				/>
				<rect
					x="92"
					y="54.5"
					width="2.2"
					height="11"
					rx="1"
					fill="#E2E8F0"
					fillOpacity="0.72"
				/>
				<rect
					x="104"
					y="54.5"
					width="2.2"
					height="12"
					rx="1"
					fill="#E2E8F0"
					fillOpacity="0.72"
				/>
				<path
					d="M2 54 C10 42, 22 42, 30 54 C38 45, 50 45, 58 54 C66 45, 78 45, 86 54 C94 42, 106 42, 118 54"
					fill="none"
					stroke="#E0F2FE"
					strokeWidth="1.9"
					strokeLinecap="round"
					strokeOpacity="0.7"
				/>

				<path
					d="M6 78 C20 71, 34 71, 48 78 C61 85, 75 85, 88 78 C100 72, 109 72, 114 74"
					fill="none"
					stroke="url(#trllLake)"
					strokeWidth="5"
					strokeLinecap="round"
					strokeOpacity="0.95"
				/>
				<path
					d="M6 90 C20 84, 34 84, 48 90 C61 96, 75 96, 88 90 C99 86, 108 86, 114 88"
					fill="none"
					stroke="#E0F2FE"
					strokeWidth="3.2"
					strokeLinecap="round"
					strokeOpacity="0.85"
				/>

				<path
					d="M40 66 L85 66 L76 73 L49 73 Z"
					fill="#082F49"
					fillOpacity="0.92"
					stroke="#E0F2FE"
					strokeWidth="1.4"
					strokeLinejoin="round"
				/>
				<rect x="58" y="48" width="2.8" height="18" rx="1.2" fill="#F8FAFC" />
				<path
					d="M54 65 C56 59, 59 55, 64 52"
					fill="none"
					stroke="#E0F2FE"
					strokeWidth="1.6"
					strokeLinecap="round"
					strokeOpacity="0.8"
				/>
			</g>
		</svg>
	);
};

export default LogoMark;
