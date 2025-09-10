import { LINKS } from "@/lib/content-registry";
import { ExternalLink } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface ActivityDashboardProps {
  pastAchievements: any[];
  currentAchievementIndex: number;
  setCurrentAchievementIndex: (idx: number) => void;
}

export function ActivityDashboard({ pastAchievements, currentAchievementIndex, setCurrentAchievementIndex }: ActivityDashboardProps) {
    const [stravaStats, setStravaStats] = useState<any>(null);
    const [hevyStats, setHevyStats] = useState<any>(null);
    const exerciseScrollRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const workoutScrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    // Carousel state for workout exercises
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const exerciseCount = hevyStats?.workouts?.[0]?.exercises?.length || 0;

    // Cycle through exercises every 3 seconds, pause on hover/focus
    useEffect(() => {
      if (!exerciseCount || isHovered) return;
      const interval = setInterval(() => {
        setCurrentExerciseIndex((prev) => (prev + 1) % exerciseCount);
      }, 5000);
      return () => clearInterval(interval);
    }, [exerciseCount, isHovered]);

    // Handlers for pausing/resuming carousel
    const handleExerciseMouseEnter = () => setIsHovered(true);
    const handleExerciseMouseLeave = () => setIsHovered(false);
    const handleExerciseFocus = () => setIsHovered(true);
    const handleExerciseBlur = () => setIsHovered(false);

    useEffect(() => {
        const fetchStravaData = async () => {
            try {
                const response = await fetch('/api/strava/stats/get-recent');
                const stravaData = await response.json();
                setStravaStats(stravaData);
                const hevyResponse = await fetch('/api/hevy/get-recent');
                const hevyData = await hevyResponse.json();
                setHevyStats(hevyData);
            }
            catch (error) {
                console.error('Error fetching Strava data:', error);
            }
        }
        fetchStravaData();
    }, []);

    useEffect(() => {
      if (!exerciseScrollRef.current) return;
      if (!hevyStats?.workouts?.[0]?.exercises?.length) return;
      if (isHovered) return;
      const scrollContainer = exerciseScrollRef.current;
      let scrollAmount = 1.2; // px per frame
      let req: number;
      function step() {
        if (!scrollContainer) return;
        if (scrollContainer.scrollLeft + scrollContainer.offsetWidth >= scrollContainer.scrollWidth - 2) {
          scrollContainer.scrollTo({ left: 0, behavior: 'auto' });
        } else {
          scrollContainer.scrollLeft += scrollAmount;
        }
        req = requestAnimationFrame(step);
      }
      req = requestAnimationFrame(step);
      return () => cancelAnimationFrame(req);
    }, [hevyStats, isHovered]);

    useEffect(() => {
      const scrollContainer = workoutScrollRef.current;
      if (!scrollContainer) return;
      let animationFrame: number;
      let scrollAmount = 0.5; // px per frame

      const step = () => {
        if (!isPaused && scrollContainer.scrollWidth > scrollContainer.clientWidth) {
          if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 1) {
            scrollContainer.scrollLeft = 0; // Loop back
          } else {
            scrollContainer.scrollLeft += scrollAmount;
          }
        }
        animationFrame = requestAnimationFrame(step);
      };
      step();
      return () => cancelAnimationFrame(animationFrame);
    }, [hevyStats, isPaused]);

    useEffect(() => {
      const scrollContainer = workoutScrollRef.current;
      if (!scrollContainer) return;
      const handleMouseEnter = () => setIsPaused(true);
      const handleMouseLeave = () => setIsPaused(false);
      scrollContainer.addEventListener('mouseenter', handleMouseEnter);
      scrollContainer.addEventListener('mouseleave', handleMouseLeave);
      scrollContainer.addEventListener('focusin', handleMouseEnter);
      scrollContainer.addEventListener('focusout', handleMouseLeave);
      return () => {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        scrollContainer.removeEventListener('focusin', handleMouseEnter);
        scrollContainer.removeEventListener('focusout', handleMouseLeave);
      };
    }, []);

    // --- Redesigned Activity Dashboard: Hevy Integration ---
    // Show Strava summary on left, Hevy summary and carousel on right

    // --- Hevy Exercise Summary (no set cycling) ---
    // Remove set cycling logic and instead show summary for each exercise

    // Helper to compute total reps and total volume for an exercise
    function getExerciseStats(exercise: any) {
      if (!exercise?.sets?.length) return { totalSets: 0, totalReps: 0, totalVolume: 0 };
      const totalSets = exercise.sets.length;
      let totalReps = 0;
      let totalVolume = 0;
      for (const set of exercise.sets) {
        if (typeof set.reps === 'number') totalReps += set.reps;
        if (typeof set.weight_kg === 'number' && typeof set.reps === 'number') {
          totalVolume += set.weight_kg * set.reps;
        }
      }
      return { totalSets, totalReps, totalVolume };
    }

    const handleExerciseDotClick = (i: number) => {
      setCurrentExerciseIndex(i);
    };

    const [logoIndex, setLogoIndex] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setLogoIndex((prev) => (prev + 1) % 2);
      }, 5000);
      return () => clearInterval(interval);
    }, []);

    return (
        <div className="mt-16 lg:mt-0 w-full max-w-5xl mx-auto">
            <div>
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div>
                            <h3 className="mb-3 flex items-center gap-2 text-2xl font-bold text-white">
                            <span className="relative flex items-center justify-center h-6 w-6">
                                {/* Cycle between Strava and Hevy logos with smooth fade transition */}
                                <span
                                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
                                    logoIndex === 0 ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                                  }`}
                                >
                                  {/* Strava SVG */}
                                  <svg className="h-6 w-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7 13.828h4.172" />
                                  </svg>
                                </span>
                                <span
                                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
                                    logoIndex === 1 ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                                  }`}
                                >
                                  {/* Hevy logo, sized, circular, and aligned to match Strava */}
                                  <img
                                    src="/hevy-logo.png"
                                    alt="Hevy Logo"
                                    className="h-6 w-6 rounded-full border border-pink-400/40 bg-slate-900 object-cover"
                                  />
                                </span>
                            </span>
                              Activity Dashboard
                            </h3>
                            <p className="text-xs text-slate-400">
                                Powered by{' '}
                                <a
                                    href="https://www.strava.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-orange-400 underline decoration-dotted transition-colors hover:text-orange-300"
                                >
                                    Strava
                                </a>
                                {' '}and{' '}
                                <a
                                    href="https://www.hevy.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-pink-400 underline decoration-dotted transition-colors hover:text-pink-300"
                                >
                                    Hevy
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => window.open(LINKS.strava, '_blank')}
                            className="group flex items-center justify-center gap-2 rounded-lg border border-orange-600/40 bg-orange-800/20 px-3 py-1.5 text-xs font-medium text-orange-300 backdrop-blur-sm transition-all duration-200 hover:border-orange-500 hover:bg-orange-800/30 hover:text-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                            aria-label="View Strava Profile"
                        >
                            <ExternalLink className="h-3 w-3" />
                            <span className="hidden sm:inline">Strava</span>
                        </button>
                        <button
                            onClick={() => window.open(LINKS.hevy, '_blank')}
                            className="group flex items-center justify-center gap-2 rounded-lg border border-pink-600/40 bg-pink-800/20 px-3 py-1.5 text-xs font-medium text-pink-300 backdrop-blur-sm transition-all duration-200 hover:border-pink-500 hover:bg-pink-800/30 hover:text-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                            aria-label="View Hevy Profile"
                        >
                            <ExternalLink className="h-3 w-3" />
                            <span className="hidden sm:inline">Hevy</span>
                        </button>
                    </div>
                </div>
                <div className="overflow-hidden rounded-xl backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        {/* Strava Summary */}
                        <div className="border-b md:border-b-0 md:border-r border-slate-700/30 p-3 sm:p-4 flex flex-col justify-center">
                            <div className="grid grid-cols-3 divide-x divide-slate-700/30">
                                <div className="px-1 text-center sm:px-2">
                                    <div className="text-lg font-bold text-green-400 sm:text-2xl">
                                        {stravaStats?.all_run_totals.distance
                                            ? (stravaStats.all_run_totals.distance * 0.000621371).toFixed(0)
                                            : '--'}
                                    </div>
                                    <div className="mt-1 text-xs text-slate-400 sm:text-sm">miles ran</div>
                                </div>
                                <div className="px-1 text-center sm:px-2">
                                    <div className="text-lg font-bold text-blue-400 sm:text-2xl">
                                        {stravaStats?.all_ride_totals.distance
                                            ? (stravaStats.all_ride_totals.distance * 0.000621371).toFixed(0)
                                            : '--'}
                                    </div>
                                    <div className="mt-1 text-xs text-slate-400 sm:text-sm">miles cycled</div>
                                </div>
                                <div className="px-1 text-center sm:px-2">
                                    <div className="text-lg font-bold text-purple-400 sm:text-2xl">
                                        {stravaStats?.all_run_totals.moving_time &&
                                        stravaStats?.all_ride_totals.moving_time
                                            ? (
                                                (stravaStats.all_run_totals.moving_time +
                                                    stravaStats.all_ride_totals.moving_time) /
                                                3600
                                            ).toFixed(0)
                                            : '--'}
                                    </div>
                                    <div className="mt-1 text-xs text-slate-400 sm:text-sm">hours active</div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <span className="text-xs font-medium uppercase tracking-wide text-slate-400 sm:text-sm">
                                        Athletic Achievements
                                    </span>
                                </div>
                                <div className="flex h-[60px] items-center justify-between rounded-lg bg-slate-700/20 p-2 sm:h-[70px] sm:p-3">
                                    <div className="relative h-full flex-1">
                                        {pastAchievements.map((achievement, index) => (
                                            <div
                                                key={index}
                                                className={`absolute inset-0 flex items-center justify-between transition-opacity duration-500 ease-in-out ${
                                                    index === currentAchievementIndex ? 'opacity-100' : 'opacity-0'
                                                }`}
                                            >
                                                <div className="min-w-0 flex-1">
                                                    <div className="truncate text-xs font-semibold text-slate-200 sm:text-sm">
                                                        {achievement.name}
                                                    </div>
                                                    <div className="mt-0.5 text-xs text-slate-400">
                                                        {achievement.type} • {achievement.date}
                                                    </div>
                                                </div>
                                                <div className="ml-2 flex flex-shrink-0 items-center gap-1 sm:ml-3">
                                                    {pastAchievements.map((_, dotIndex) => (
                                                        <button
                                                            key={dotIndex}
                                                            onClick={() => setCurrentAchievementIndex(dotIndex)}
                                                            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                                                                dotIndex === currentAchievementIndex
                                                                    ? 'scale-125 bg-blue-400'
                                                                    : 'bg-slate-500 hover:bg-slate-400'
                                                            }`}
                                                            aria-label={`View achievement ${dotIndex + 1}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Hevy Summary & Carousel */}
                        <div className="p-3 sm:p-4 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-2">
                                <svg className="h-5 w-5 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                                </svg>
                                <span className="text-sm font-bold text-slate-200 truncate" title={hevyStats?.workouts?.[0]?.title || ''}>
                                    {hevyStats?.workouts?.[0]?.title || 'No Workout'}
                                </span>
                            </div>
                            {hevyStats?.workouts?.length > 0 ? (
                                <>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-xs text-slate-400 font-mono bg-transparent rounded px-2 py-0.5">
                                            {new Date(hevyStats.workouts[0].start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            {' - '}
                                            {new Date(hevyStats.workouts[0].end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        <span className="text-xs text-slate-500 bg-slate-800/60 rounded px-2 py-0.5">
                                            {new Date(hevyStats.workouts[0].start_time).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                    <div
                                        className="flex-1 min-h-[90px] flex flex-col justify-center items-stretch relative"
                                        tabIndex={0}
                                        onMouseEnter={handleExerciseMouseEnter}
                                        onMouseLeave={handleExerciseMouseLeave}
                                        onFocus={handleExerciseFocus}
                                        onBlur={handleExerciseBlur}
                                    >
                                        {hevyStats?.workouts?.[0]?.exercises?.length > 0 && (
                                            <div className="relative h-full w-full">
                                                {hevyStats.workouts[0].exercises.map((ex: any, i: number) => {
                                                  const { totalSets, totalReps, totalVolume } = getExerciseStats(ex);
                                                  return (
                                                    <div
                                                      key={i}
                                                      className={`absolute inset-0 transition-all duration-500 ease-in-out flex flex-col items-start min-w-[180px] max-w-full p-4 rounded-xl border-none bg-transparent ${i === currentExerciseIndex ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-95 pointer-events-none'}`}
                                                      aria-hidden={i !== currentExerciseIndex}
                                                    >
                                                      <div className="flex items-center gap-2 mb-1 w-full">
                                                        <span className="font-semibold text-pink-300 text-base truncate flex-1" title={ex.title}>{ex.title}</span>
                                                        {ex.superset_id !== null && ex.superset_id !== undefined && (
                                                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-300 font-bold border border-blue-400/30 ml-2">Superset {ex.superset_id}</span>
                                                        )}
                                                      </div>
                                                      {/* Exercise summary */}
                                                      <div className="flex flex-row gap-6 items-center mt-4 mb-2 w-full justify-center">
                                                        <span className="text-xs font-bold text-slate-400 tracking-wide">Sets: <span className="text-pink-200 font-mono">{totalSets}</span></span>
                                                        <span className="text-xs font-bold text-slate-400 tracking-wide">Reps: <span className="text-blue-200 font-mono">{totalReps}</span></span>
                                                        <span className="text-xs font-bold text-slate-400 tracking-wide">Volume: <span className="text-green-200 font-mono">{totalVolume.toFixed(1)} kg</span></span>
                                                      </div>
                                                      {ex.notes && (
                                                        <div className="mt-1 text-xs text-slate-400 italic w-full truncate" title={ex.notes}>{ex.notes}</div>
                                                      )}
                                                    </div>
                                                  );
                                                })}
                                                <div className="absolute bottom-2 right-4 flex gap-1">
                                                    {hevyStats.workouts[0].exercises.map((_: any, i: number) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => handleExerciseDotClick(i)}
                                                            className={`h-2 w-2 rounded-full border-2 border-pink-400/40 transition-all duration-300 ${i === currentExerciseIndex ? 'scale-125 bg-pink-400 shadow' : 'bg-slate-600 hover:bg-pink-300'}`}
                                                            aria-label={`View exercise ${i + 1}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="text-xs text-slate-400 text-center py-4">No recent workout</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}