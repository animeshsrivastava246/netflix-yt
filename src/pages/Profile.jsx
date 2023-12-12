import { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { createImageUrl } from "../services/movieServices";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";

const Profile = () => {
	const [movies, setMovies] = useState([]);
	const { user } = UserAuth();
	useEffect(() => {
		if (user) {
			onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
				if (doc.data()) setMovies(doc.data().favShows);
			});
		}
	}, [user?.email]);
	const slide = (offset) => {
		const slider = document.getElementById("slider");
		slider.scrollLeft = slider.scrollLeft + offset;
	};

	const handleUnlikeShow = async (movie) => {
		const userDoc = doc(db, "users", user.email);

		await updateDoc(userDoc, {
			favShows: arrayRemove(movie),
		});
	};

	if (!user) {
		return (
			<>
				<p>Fetching your shows...</p>
			</>
		);
	}

	return (
		<>
			<div>
				<div>
					<img
						className="block w-full h-[500px] object-cover"
						src="https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/5b22968d-b94f-44ec-bea3-45dcf457f29e/IN-en-20231204-popsignuptwoweeks-perspective_alpha_website_large.jpg"
						alt="Netflix"
					/>
					<div className="bg-black/60 fixed top-0 left-0 w-full h-[500px]" />
					<div className="absolut top-[20%] p-4 md:p-8">
						<h1 className="text-3xl md:text-5xl font-nsans-bold my-2">
							My Shows
						</h1>
						<p className="font-nsans-light text-gray-400 text-lg">
							{user.email}
						</p>
					</div>
				</div>
				{/* movie row */}
				<h2 className="font-nsans-bold md:text-xl p-4 capitalize">
					My Favorite Shows
				</h2>

				<div className="relative flex items-center group">
					<MdChevronLeft
						onClick={() => slide(-500)}
						className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
						size={40}
					/>
					<div
						id={`slider`}
						className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
					>
						{movies.map((movie) => (
							<div
								key={movie.id}
								className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2"
							>
								<img
									className="w-full h-40 block object-cover object-top"
									src={createImageUrl(
										movie.backdrop_path ?? movie.poster_path,
										"w500"
									)}
									alt={movie.title}
								/>

								<div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
									<p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
										{movie.title}
									</p>
									<AiOutlineClose
										size={30}
										onClick={() => handleUnlikeShow(movie)}
										className="absolute top-2 right-2"
									/>
								</div>
							</div>
						))}
					</div>
					<MdChevronRight
						onClick={() => slide(500)}
						className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
						size={40}
					/>
				</div>
			</div>
		</>
	);
};

export default Profile;
