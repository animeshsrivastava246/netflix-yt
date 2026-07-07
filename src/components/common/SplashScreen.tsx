import { useEffect } from "react";
import "./SplashScreen.css";

interface SplashScreenProps {
	onDone: () => void;
}

const fur = Array.from({ length: 31 }, (_, i) => 31 - i);
const lamps = Array.from({ length: 28 }, (_, i) => i + 1);

function Brush() {
	return (
		<div className="effect-brush">
			{fur.map((i) => (
				<span key={i} className={`fur-${i}`} />
			))}
		</div>
	);
}

function Lumieres() {
	return (
		<div className="effect-lumieres">
			{lamps.map((i) => (
				<span key={i} className={`lamp-${i}`} />
			))}
		</div>
	);
}

export default function SplashScreen({ onDone }: SplashScreenProps) {
	useEffect(() => {
		// Prevent scroll bar display and user scrolling during splash animation
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		// Match the total duration of the CSS animation.
		const timer = setTimeout(onDone, 4000);

		return () => {
			clearTimeout(timer);
			// Restore original scroll state
			document.body.style.overflow = originalOverflow;
		};
	}, [onDone]);

	return (
		<div
			id="container"
			className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden bg-black"
		>
			<div
				className="netflixintro letter-N"
				data-letter="N"
			>
				<div className="helper-1">
					<Brush />
					<Lumieres />
				</div>

				<div className="helper-2">
					<Brush />
				</div>

				<div className="helper-3">
					<Brush />
				</div>

				<div className="helper-4">
					<Brush />
				</div>
			</div>
		</div>
	);
}