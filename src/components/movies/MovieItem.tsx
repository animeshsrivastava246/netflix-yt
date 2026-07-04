import { useState } from "react";
import { createImageUrl } from "../../services/movieServices";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { UserAuth } from "../../context/AuthContext";
import { Movie } from "./Hero";

interface MovieItemProps {
	movie: Movie;
}

const MovieItem = ({ movie }: MovieItemProps) => {
	const [like, setLike] = useState(false);
	const { title, backdrop_path, poster_path } = movie;
	const { user } = UserAuth();

	const markFavShow = async () => {
		const userEmail = user?.email;
		if (userEmail) {
			const userDoc = doc(db, "users", userEmail);
			setLike(!like);
			await updateDoc(userDoc, {
				favShows: arrayUnion({ ...movie }),
			});
		} else {
			alert("Login to mark this as favorite");
		}
	};

	return (
		<div className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2 transition-transform duration-300 ease-out hover:scale-105 shadow-md hover:shadow-xl">
			<img
				className="w-full h-28 sm:h-36 md:h-40 block object-cover object-top"
				src={createImageUrl(backdrop_path ?? poster_path, "w500")}
				alt={title}
			/>

			<div className="absolute inset-0 bg-black/75 opacity-0 hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3">
				<div onClick={markFavShow} className="self-start cursor-pointer">
					{like ? (
						<FaHeart
							size={18}
							className="text-red-600 drop-shadow-md hover:scale-110 transition-transform"
						/>
					) : (
						<FaRegHeart
							size={18}
							className="text-gray-300 drop-shadow-md hover:scale-110 transition-transform"
						/>
					)}
				</div>
				<p className="whitespace-normal text-xs md:text-sm font-nsans-bold text-white text-center leading-tight">
					{title}
				</p>
				<div className="h-[18px]" /> {/* Spacer for symmetry */}
			</div>
		</div>
	);
};

export default MovieItem;
