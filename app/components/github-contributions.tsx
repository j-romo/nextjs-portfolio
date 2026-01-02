/**
 * GitHub Contribution Graph Component
 * 
 * A visual representation of GitHub activity, similar to the contribution
 * graph on GitHub profiles. Built as a Server Component for optimal performance.
 * 
 * Technical Highlights:
 * - Server-side rendering for fast initial load
 * - CSS Grid layout for responsive design
 * - Semantic color scheme matching GitHub's UI
 * - Accessible tooltips with contribution counts
 * - TypeScript for type safety
 */

import { fetchGitHubContributions, getRecentContributions, aggregateContributions } from '../lib/github';

interface GitHubContributionsProps {
  /**
   * Array of GitHub accounts with their respective tokens
   * @example [{ username: 'personal', token: process.env.TOKEN_PERSONAL }]
   */
  accounts: Array<{ username: string; token?: string }>;
  /**
   * Number of days to display (default: 90 for ~3 months)
   */
  days?: number;
}

/**
 * Maps GitHub's contribution levels to color intensity
 * Uses CSS variables for dark mode support
 */
const levelColors = {
  NONE: 'bg-neutral-100 dark:bg-neutral-800',
  FIRST_QUARTILE: 'bg-green-200 dark:bg-green-900',
  SECOND_QUARTILE: 'bg-green-400 dark:bg-green-700',
  THIRD_QUARTILE: 'bg-green-600 dark:bg-green-500',
  FOURTH_QUARTILE: 'bg-green-700 dark:bg-green-400',
};

/**
 * GitHubContributions - Server Component
 * 
 * Displays GitHub contribution activity as a calendar heat map.
 * Supports multiple accounts for developers with personal/work aliases.
 * 
 * @example Single account
 * ```tsx
 * <GitHubContributions 
 *   accounts={[{ username: "octocat" }]} 
 * />
 * ```
 * 
 * @example Multiple accounts with separate tokens
 * ```tsx
 * <GitHubContributions 
 *   accounts={[
 *     { username: "personal-gh", token: process.env.GITHUB_TOKEN_PERSONAL },
 *     { username: "work-gh", token: process.env.GITHUB_TOKEN_WORK }
 *   ]} 
 *   days={120} 
 * />
 * ```
 */
export default async function GitHubContributions({ 
  accounts, 
  days = 90 
}: GitHubContributionsProps) {
  // Fetch and aggregate data from all accounts
  const aggregated = await aggregateContributions(accounts);
  
  // Fetch detailed calendar for first account (for visualization)
  const primaryCalendar = await fetchGitHubContributions(
    accounts[0].username, 
    accounts[0].token
  );
  
  if (!primaryCalendar) {
    return (
      <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Unable to load contribution data. Please check your GitHub token configuration.
        </p>
      </div>
    );
  }

  const recentDays = getRecentContributions(primaryCalendar, days);
  
  // Calculate weeks for grid layout (7 days per week)
  const weeks = Math.ceil(recentDays.length / 7);

  return (
    <div className="space-y-4">
      {/* Stats Overview */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[150px]">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Total Contributions (Last Year)
          </p>
          <p className="text-2xl font-semibold mt-1">
            {aggregated.totalContributions.toLocaleString()}
          </p>
        </div>
        
        {accounts.length > 1 && (
          <div className="flex-1 min-w-[150px]">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
              By Account
            </p>
            {Object.entries(aggregated.byAccount).map(([user, count]) => (
              <div key={user} className="text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">{user}:</span>{' '}
                <span className="font-medium">{count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contribution Calendar */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div 
            className="grid gap-1"
            style={{
              gridTemplateColumns: `repeat(${weeks}, minmax(10px, 1fr))`,
              gridTemplateRows: 'repeat(7, minmax(10px, 1fr))',
              gridAutoFlow: 'column',
            }}
          >
            {recentDays.map((day) => {
              const date = new Date(day.date);
              const dateStr = date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              });
              
              return (
                <div
                  key={day.date}
                  className={`
                    w-3 h-3 rounded-sm
                    ${levelColors[day.contributionLevel]}
                    hover:ring-2 hover:ring-neutral-400 dark:hover:ring-neutral-500
                    transition-all cursor-pointer
                  `}
                  title={`${day.contributionCount} contributions on ${dateStr}`}
                  aria-label={`${day.contributionCount} contributions on ${dateStr}`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-neutral-100 dark:bg-neutral-800" />
          <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900" />
          <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-700" />
          <div className="w-3 h-3 rounded-sm bg-green-600 dark:bg-green-500" />
          <div className="w-3 h-3 rounded-sm bg-green-700 dark:bg-green-400" />
        </div>
        <span>More</span>
      </div>

      {/* Implementation Note - Remove this in production */}
      <details className="text-xs text-neutral-500 dark:text-neutral-600">
        <summary className="cursor-pointer hover:text-neutral-700 dark:hover:text-neutral-400">
          Technical Implementation
        </summary>
        <div className="mt-2 space-y-1 pl-4">
          <p>✓ Next.js Server Component</p>
          <p>✓ GitHub GraphQL API integration</p>
          <p>✓ ISR with 1-hour revalidation</p>
          <p>✓ Multi-account aggregation</p>
          <p>✓ TypeScript type safety</p>
        </div>
      </details>
    </div>
  );
}
