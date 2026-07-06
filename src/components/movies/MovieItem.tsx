import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createImageUrl, Movie, getMovieMetadata } from "../../services/movieServices";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { UserAuth } from "../../context/AuthContext";
import MovieDetailModal from "./MovieDetailModal";

interface MovieItemCardProps {
	backdropPath: string | null;
	posterPath: string | null;
	displayName: string;
	like: boolean;
	onLike: (e: React.MouseEvent) => void;
	onClick: () => void;
	releaseYear?: string;
}

// fallow-ignore-next-line complexity
const MovieItemCard = ({ backdropPath, posterPath, displayName, like, onLike, onClick, releaseYear }: MovieItemCardProps) => (
	<div
		onClick={onClick}
		className="relative w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px] rounded-lg overflow-hidden cursor-pointer m-1.5 sm:m-2 group/card"
		style={{ transition: "transform 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
	>
		{/* Card image */}
		<div className="relative overflow-hidden rounded-lg shadow-md group-hover/card:shadow-2xl" style={{ transition: "box-shadow 350ms ease" }}>
			<img
				className="w-full h-24 sm:h-32 md:h-36 lg:h-40 block object-cover object-top"
				style={{ transition: "transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
				onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
				onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
				src={
					createImageUrl(backdropPath ?? posterPath, "w500") ||
					"https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=500"
				}
				alt={displayName}
			/>

			{/* Overlay on hover */}
			<div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 ease-snappy flex flex-col justify-between p-2 sm:p-3">
				{/* Like button */}
				<div
					onClick={onLike}
					className="self-start cursor-pointer p-1 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/70 transition-all duration-200"
				>
					{like ? (
						<FaHeart size={14} className="text-red-500 drop-shadow" />
					) : (
						<FaRegHeart size={14} className="text-gray-300 drop-shadow hover:text-red-400 transition-colors duration-200" />
					)}
				</div>

				{/* Title and Release Year */}
				<div className="text-center">
					<p className="whitespace-normal text-[10px] sm:text-xs font-nsans-bold text-white leading-tight drop-shadow-lg">
						{displayName}
					</p>
					{releaseYear && (
						<p className="text-[8px] sm:text-[9px] text-neutral-300 mt-1 font-nsans-medium drop-shadow-md">
							{releaseYear}
						</p>
					)}
				</div>

				{/* Spacer */}
				<div className="h-1" />
			</div>
		</div>
	</div>
);

const MovieItem = ({ movie }: { movie: Movie }) => {
	const [like, setLike] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const { backdrop_path, poster_path } = movie;
	const { user } = UserAuth();
	const { isTv, displayName, release } = getMovieMetadata(movie);
	const navigate = useNavigate();
	const releaseYear = release ? release.split("-")[0] : "";

	const markFavShow = async (e: React.MouseEvent) => {
		e.stopPropagation();
		const userEmail = user?.email;
		if (!userEmail) {
			navigate("/login");
			return;
		}
		const userDoc = doc(db, "users", userEmail);
		setLike(!like);
		await updateDoc(userDoc, {
			favShows: arrayUnion({ ...movie }),
		});
	};

	return (
		<>
			<MovieItemCard
				backdropPath={backdrop_path}
				posterPath={poster_path}
				displayName={displayName}
				like={like}
				onLike={markFavShow}
				onClick={() => setShowModal(true)}
				releaseYear={releaseYear}
			/>
			{showModal && (
				<MovieDetailModal id={movie.id} isTv={isTv} onClose={() => setShowModal(false)} />
			)}
		</>
	);
};

export default MovieItem;
