/**
 * GitHub API Integration for Contribution Data
 * 
 * This module demonstrates server-side API integration with GitHub's GraphQL API
 * to fetch and aggregate contribution data across multiple accounts.
 * 
 * Key Features:
 * - TypeScript-first with full type safety
 * - GraphQL query optimization
 * - Error handling and fallbacks
 * - Support for multiple GitHub aliases
 * - Next.js caching integration
 */

/**
 * Represents a single day of contributions on GitHub
 */
export interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE';
}

/**
 * Represents a week of contribution days
 */
export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

/**
 * Complete contribution calendar data for a user
 */
export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

/**
 * GitHub GraphQL API response structure
 */
interface GitHubContributionResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: ContributionCalendar;
      };
    };
  };
}

/**
 * Fetches contribution data for a GitHub user via GraphQL API
 * 
 * @param username - GitHub username to fetch data for
 * @param token - Optional GitHub token (if not provided, uses GITHUB_TOKEN_PERSONAL)
 * @returns Promise resolving to contribution calendar data
 * @throws Error if the API request fails
 * 
 * @example
 * ```ts
 * const contributions = await fetchGitHubContributions('octocat');
 * console.log(`Total: ${contributions.totalContributions}`);
 * ```
 */
export async function fetchGitHubContributions(
  username: string,
  token?: string
): Promise<ContributionCalendar | null> {
  // Use provided token or fall back to personal token
  const githubToken = token || process.env.GITHUB_TOKEN_PERSONAL || process.env.GITHUB_TOKEN;

  if (!githubToken) {
    console.warn('No GitHub token configured. GitHub contribution data unavailable.');
    return null;
  }

  // GraphQL query to fetch last year of contributions
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      // Cache for 1 hour in production
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const result: GitHubContributionResponse = await response.json();
    
    if (!result.data?.user) {
      console.warn(`GitHub user "${username}" not found`);
      return null;
    }

    return result.data.user.contributionsCollection.contributionCalendar;
  } catch (error) {
    console.error(`Failed to fetch contributions for ${username}:`, error);
    return null;
  }
}

/**
 * Aggregates contribution data from multiple GitHub accounts
 * 
 * Useful for developers with separate personal and work accounts who want
 * to display combined activity on their portfolio.
 * 
 * @param accounts - Array of objects with username and optional token
 * @returns Combined contribution calendar with merged totals
 * 
 * @example
 * ```ts
 * const combined = await aggregateContributions([
 *   { username: 'personal-gh', token: process.env.GITHUB_TOKEN_PERSONAL },
 *   { username: 'work-gh', token: process.env.GITHUB_TOKEN_WORK }
 * ]);
 * console.log(`Combined total: ${combined.totalContributions}`);
 * ```
 */
export async function aggregateContributions(
  accounts: Array<{ username: string; token?: string }>
): Promise<{ totalContributions: number; byAccount: Record<string, number> }> {
  const results = await Promise.allSettled(
    accounts.map(({ username, token }) => fetchGitHubContributions(username, token))
  );

  let totalContributions = 0;
  const byAccount: Record<string, number> = {};

  results.forEach((result, index) => {
    const username = accounts[index].username;
    if (result.status === 'fulfilled' && result.value) {
      const count = result.value.totalContributions;
      byAccount[username] = count;
      totalContributions += count;
    } else {
      byAccount[username] = 0;
    }
  });

  return { totalContributions, byAccount };
}

/**
 * Gets the last N days of contribution data
 * 
 * @param calendar - Full contribution calendar
 * @param days - Number of days to retrieve (default: 90)
 * @returns Array of recent contribution days
 */
export function getRecentContributions(
  calendar: ContributionCalendar,
  days: number = 365
): ContributionDay[] {
  const allDays = calendar.weeks.flatMap(week => week.contributionDays);
  return allDays.slice(-days);
}
