import { useEffect, useRef, useState } from "react";
import axios from "axios";
import MovieItem from "./MovieItem";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Movie } from "../../services/movieServices";

interface MovieRowProps {
	title: string;
	url: string;
}

const useSlider = () => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	const updateScrollState = () => {
		const el = sliderRef.current;
		if (!el) return;
		setCanScrollLeft(el.scrollLeft > 10);
		setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
	};

	const slide = (offset: number) => {
		sliderRef.current?.scrollBy({ left: offset, behavior: "smooth" });
		setTimeout(updateScrollState, 400);
	};

	return { sliderRef, canScrollLeft, canScrollRight, slide, updateScrollState };
};

const useMovieRowData = (url: string) => {
	const [movies, setMovies] = useState<Movie[]>([]);
	useEffect(() => {
		axios.get(url).then((res) => {
			if (res.data?.results) setMovies(res.data.results as Movie[]);
		});
	}, [url]);
	return movies;
};

const RowSkeleton = () => (
	<div className="my-6">
		<div className="h-6 w-40 bg-neutral-800/60 rounded mx-4 sm:mx-8 mb-3 animate-pulse" />
		<div className="flex gap-2 px-4 sm:px-8 overflow-hidden">
			{Array.from({ length: 6 }).map((_, i) => (
				<div
					key={i}
					className="w-[140px] sm:w-[180px] md:w-[220px] flex-shrink-0 h-24 sm:h-32 md:h-36 bg-neutral-800/60 rounded-lg animate-pulse"
					style={{ animationDelay: `${i * 80}ms` }}
				/>
			))}
		</div>
	</div>
);

// fallow-ignore-next-line complexity
const ChevronBtn = ({
	direction,
	visible,
	onClick,
}: {
	direction: "left" | "right";
	visible: boolean;
	onClick: () => void;
}) => (
	<button
		onClick={onClick}
		aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
		className={`absolute ${direction === "left" ? "left-0 bg-gradient-to-r" : "right-0 bg-gradient-to-l"} top-0 h-full z-10 w-10 sm:w-14 flex items-center justify-center from-black/80 to-transparent transition-all duration-300 ease-butter cursor-pointer ${
			visible ? "opacity-0 group-hover:opacity-100" : "opacity-0 pointer-events-none"
		}`}
	>
		{direction === "left" ? (
			<MdChevronLeft size={36} className="text-white drop-shadow-lg transition-transform duration-200 hover:scale-125" />
		) : (
			<MdChevronRight size={36} className="text-white drop-shadow-lg transition-transform duration-200 hover:scale-125" />
		)}
	</button>
);

const MovieRow = ({ title, url }: MovieRowProps) => {
	const movies = useMovieRowData(url);
	const { sliderRef, canScrollLeft, canScrollRight, slide, updateScrollState } = useSlider();

	if (movies.length === 0) return <RowSkeleton />;

	return (
		<div className="my-4 sm:my-6 animate-fade-in">
			<h2 className="font-nsans-bold text-base sm:text-lg md:text-2xl px-4 sm:px-8 mb-2 sm:mb-3 capitalize text-white tracking-wide">
				{title}
			</h2>
			<div className="relative group">
				<ChevronBtn direction="left" visible={canScrollLeft} onClick={() => slide(-600)} />
				<div
					ref={sliderRef}
					onScroll={updateScrollState}
					className="w-full overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide py-2 px-4 sm:px-8"
				>
					{movies.map((movie, idx) => (
						<div
							key={movie.id}
							className="inline-block opacity-0 animate-fade-in-scale"
							style={{ animationDelay: `${idx * 40}ms`, animationFillMode: "forwards" }}
						>
							<MovieItem movie={movie} />
						</div>
					))}
				</div>
				<ChevronBtn direction="right" visible={canScrollRight} onClick={() => slide(600)} />
			</div>
		</div>
	);
};

export default MovieRow;
