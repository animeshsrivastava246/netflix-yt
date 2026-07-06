import { useEffect, useState } from "react";

const CloneWarningModal = () => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const isDismissed = sessionStorage.getItem("netflix_clone_warning_dismissed");
		if (!isDismissed) {
			setIsOpen(true);
		}
	}, []);

	const handleDismiss = () => {
		sessionStorage.setItem("netflix_clone_warning_dismissed", "true");
		setIsOpen(false);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/40 backdrop-blur-2xl transition-all duration-300">
			<div className="w-full max-w-md bg-white/4 backdrop-blur-[50px] border border-white/15 rounded-[24px] p-6 md:p-8 text-center shadow-[0_32px_64px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] relative overflow-hidden">
				{/* Liquid glass light reflect highlight */}
				<div className="absolute top-0 left-0 right-0 h-[45%] bg-linear-to-b from-white/8 to-transparent pointer-events-none" />
				
				<h2 className="text-2xl md:text-3xl font-nsans-bold text-red-500 mb-4 tracking-wide uppercase drop-shadow-[0_2px_10px_rgba(239,68,68,0.2)]">
					Educational Clone
				</h2>
				
				<p className="text-neutral-200 text-sm md:text-base mb-6 leading-relaxed relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
					This application is a <strong>non-commercial educational clone</strong> built for portfolio demonstration purposes. All rights and assets belong to the respective copyright owners.
				</p>

				<button
					onClick={handleDismiss}
					className="w-full py-3 px-6 bg-white/8 hover:bg-white/15 active:bg-white/5 border border-white/10 text-white font-nsans-medium rounded-xl uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none relative z-10"
				>
					Acknowledge & Proceed
				</button>
			</div>
		</div>
	);
};

export default CloneWarningModal;
