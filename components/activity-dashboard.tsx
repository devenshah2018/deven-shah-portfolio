import { LINKS } from "@/lib/content-registry";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

interface ActivityDashboardProps {
  pastAchievements: any[];
  currentAchievementIndex: number;
  setCurrentAchievementIndex: (idx: number) => void;
}

export function ActivityDashboard({ pastAchievements, currentAchievementIndex, setCurrentAchievementIndex }: ActivityDashboardProps) {
    const [stravaStats, setStravaStats] = useState<any>(null);
    useEffect(() => {
        const fetchStravaData = async () => {
            try {
                const response = await fetch('/api/strava/stats/get-recent');
                const stravaData = await response.json();
                setStravaStats(stravaData)
            }
            catch (error) {
                console.error('Error fetching Strava data:', error);
            }
        }
        fetchStravaData();
    })
    return (
        <div className='mt-16 lg:mt-0'>
              <div>
                <div className='mb-4 flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div>
                      <h3 className='mb-3 flex items-center gap-2 text-2xl font-bold text-white'>
                        <div className='h-6 w-6 text-orange-500'>
                          <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 24 24'>
                            <path d='M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7 13.828h4.172' />
                          </svg>
                        </div>
                        Activity Dashboard
                      </h3>
                      <p className='text-xs text-slate-400'>
                        Powered by{' '}
                        <a
                          href='https://www.strava.com/'
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-orange-400 underline decoration-dotted transition-colors hover:text-orange-300'
                        >
                          Strava
                        </a>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      window.open(LINKS.strava, '_blank')
                    }
                    className='group flex items-center justify-center gap-2 rounded-lg border border-orange-600/40 bg-orange-800/20 px-3 py-1.5 text-xs font-medium text-orange-300 backdrop-blur-sm transition-all duration-200 hover:border-orange-500 hover:bg-orange-800/30 hover:text-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-900'
                    aria-label='View Strava Profile'
                  >
                    <ExternalLink className='h-3 w-3' />
                    <span className='hidden sm:inline'>View Profile</span>
                  </button>
                </div>

                <div className='overflow-hidden rounded-xl backdrop-blur-sm'>
                  {/* ...existing Strava dashboard content... */}
                  <div className='border-b border-slate-700/30 p-3 sm:p-4'>
                    <div className='grid grid-cols-3 divide-x divide-slate-700/30'>
                      <div className='px-1 text-center sm:px-2'>
                        <div className='text-lg font-bold text-green-400 sm:text-2xl'>
                          {stravaStats?.all_run_totals.distance
                            ? (stravaStats.all_run_totals.distance * 0.000621371).toFixed(0)
                            : '--'}
                        </div>
                        <div className='mt-1 text-xs text-slate-400 sm:text-sm'>miles ran</div>
                      </div>
                      <div className='px-1 text-center sm:px-2'>
                        <div className='text-lg font-bold text-blue-400 sm:text-2xl'>
                          {stravaStats?.all_ride_totals.distance
                            ? (stravaStats.all_ride_totals.distance * 0.000621371).toFixed(0)
                            : '--'}
                        </div>
                        <div className='mt-1 text-xs text-slate-400 sm:text-sm'>miles cycled</div>
                      </div>
                      <div className='px-1 text-center sm:px-2'>
                        <div className='text-lg font-bold text-purple-400 sm:text-2xl'>
                          {stravaStats?.all_run_totals.moving_time &&
                          stravaStats?.all_ride_totals.moving_time
                            ? (
                                (stravaStats.all_run_totals.moving_time +
                                  stravaStats.all_ride_totals.moving_time) /
                                3600
                              ).toFixed(0)
                            : '--'}
                        </div>
                        <div className='mt-1 text-xs text-slate-400 sm:text-sm'>hours active</div>
                      </div>
                    </div>
                  </div>

                  <div className='p-3 sm:p-4'>
                    <div className='mb-3 flex items-center gap-2'>
                      <svg
                        className='h-4 w-4 text-amber-400'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                      </svg>
                      <span className='text-xs font-medium uppercase tracking-wide text-slate-400 sm:text-sm'>
                        Athletic Achievements
                      </span>
                    </div>

                    <div className='flex flex-col gap-3 sm:grid sm:grid-cols-3'>
                      <div className='relative sm:col-span-2'>
                        <div className='flex h-[60px] items-center justify-between rounded-lg bg-slate-700/20 p-2 sm:h-[70px] sm:p-3'>
                          <div className='relative h-full flex-1'>
                            {pastAchievements.map((achievement, index) => (
                              <div
                                key={index}
                                className={`absolute inset-0 flex items-center justify-between transition-opacity duration-500 ease-in-out ${
                                  index === currentAchievementIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                              >
                                <div className='min-w-0 flex-1'>
                                  <div className='truncate text-xs font-semibold text-slate-200 sm:text-sm'>
                                    {achievement.name}
                                  </div>
                                  <div className='mt-0.5 text-xs text-slate-400'>
                                    {achievement.type} • {achievement.date}
                                  </div>
                                </div>
                                <div className='ml-2 flex flex-shrink-0 items-center gap-1 sm:ml-3'>
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

                      <div className='sm:col-span-1'>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    );
}