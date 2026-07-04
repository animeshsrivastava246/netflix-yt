import { useEffect, useState } from "react";

type SplashPhase = "idle" | "impact" | "glow" | "fadeout";

const useSplashPhase = (onDone: () => void): SplashPhase => {
	const [phase, setPhase] = useState<SplashPhase>("idle");

	useEffect(() => {
		const t1 = setTimeout(() => setPhase("impact"), 300);
		const t2 = setTimeout(() => setPhase("glow"), 600);
		const t3 = setTimeout(() => setPhase("fadeout"), 2000);
		const t4 = setTimeout(() => onDone(), 2700);
		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
			clearTimeout(t3);
			clearTimeout(t4);
		};
	}, [onDone]);

	return phase;
};

const TudumRipples = () => (
	<>
		<div className="absolute rounded-full border border-red-600/30 animate-tudum-ripple-1" />
		<div className="absolute rounded-full border border-red-600/20 animate-tudum-ripple-2" />
		<div className="absolute rounded-full border border-red-600/10 animate-tudum-ripple-3" />
	</>
);

const SoundWaveBars = () => (
	<div className="flex items-end gap-1 mt-6 h-8">
		{[1, 2, 3, 4, 5, 6, 7].map((i) => (
			<div
				key={i}
				className="w-1 bg-red-600 rounded-full animate-tudum-bar"
				style={{
					animationDelay: `${i * 60}ms`,
					height: `${Math.sin((i / 7) * Math.PI) * 28 + 8}px`,
				}}
			/>
		))}
	</div>
);

interface TudumLogoProps {
	phase: SplashPhase;
}

const LOGO_CLASS: Record<SplashPhase, string> = {
	idle: "scale-150 opacity-0",
	impact: "scale-100 opacity-100 duration-300",
	glow: "scale-100 opacity-100 duration-500",
	fadeout: "scale-95 opacity-0 duration-700",
};

// fallow-ignore-next-line complexity
const TudumLogo = ({ phase }: TudumLogoProps) => (
	<div className={`relative flex flex-col items-center select-none transition-all ease-out ${LOGO_CLASS[phase]}`}>
		<span
			className={`font-nsans-bold text-6xl sm:text-8xl md:text-9xl tracking-tighter select-none transition-all duration-500 ${
				phase === "glow"
					? "text-red-600 drop-shadow-[0_0_40px_rgba(229,9,20,0.9)]"
					: "text-red-600"
			}`}
			style={{ letterSpacing: "-0.04em" }}
		>
			NETFLIX
		</span>
		<span
			className={`font-nsans-bold tracking-[0.6em] text-xs sm:text-sm uppercase text-neutral-400 mt-2 transition-all duration-700 ${
				phase === "glow" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
			}`}
		>
			tudum
		</span>
		{(phase === "impact" || phase === "glow") && <SoundWaveBars />}
	</div>
);

interface SplashScreenProps {
	onDone: () => void;
}

const SplashScreen = ({ onDone }: SplashScreenProps) => {
	const phase = useSplashPhase(onDone);
	const isActive = phase === "impact" || phase === "glow";

	return (
		<div
			className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-700 ease-in-out ${
				phase === "fadeout" ? "opacity-0" : "opacity-100"
			}`}
		>
			{isActive && <TudumRipples />}
			<TudumLogo phase={phase} />
		</div>
	);
};

export default SplashScreen;
