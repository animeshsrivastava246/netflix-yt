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
		<div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-all duration-300">
			<div className="w-full max-w-md bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 text-center shadow-2xl relative overflow-hidden">
				{/* Glowing top line */}
				<div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-600 via-red-500 to-red-600" />
				
				<h2 className="text-2xl md:text-3xl font-nsans-bold text-red-600 mb-4 tracking-wide uppercase">
					Educational Clone
				</h2>
				
				<p className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed">
					This application is a <strong>non-commercial educational clone</strong> built for portfolio demonstration purposes. All rights and assets belong to the respective copyright owners.
				</p>

				<button
					onClick={handleDismiss}
					className="w-full py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-nsans-medium rounded-lg uppercase tracking-wider transition-colors duration-200 shadow-md focus:outline-none"
				>
					Acknowledge & Proceed
				</button>
			</div>
		</div>
	);
};

export default CloneWarningModal;
