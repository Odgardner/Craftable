// Pure logic, no AWS SDK — kept separate from index.mjs so it can be
// unit-tested directly without mocking DynamoDB.

export function emptyProfile(playerId) {
  return { playerId, currentStreak: 0, maxStreak: 0, lastPlayedDate: null, totalPlayed: 0, totalWon: 0 };
}

export function dayBefore(dateStr) {
  const d = new Date(dateStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

export function statsPayload(p) {
  return {
    currentStreak: p.currentStreak,
    maxStreak: p.maxStreak,
    totalPlayed: p.totalPlayed,
    totalWon: p.totalWon,
  };
}

/**
 * Given a player's existing profile (or a fresh one), today's local
 * date string, and whether they won, returns the updated profile plus
 * whether a result for `date` was already recorded (idempotency — a
 * duplicate call for the same day changes nothing and must not double
 * -count toward the global daily total).
 */
export function applyResult(profile, date, won) {
  if (profile.lastPlayedDate === date) {
    return { profile, alreadyRecorded: true };
  }

  const isConsecutive = profile.lastPlayedDate === dayBefore(date);
  const newStreak = won ? (isConsecutive ? profile.currentStreak + 1 : 1) : 0;

  const updated = {
    playerId: profile.playerId,
    currentStreak: newStreak,
    maxStreak: Math.max(profile.maxStreak, newStreak),
    lastPlayedDate: date,
    totalPlayed: profile.totalPlayed + 1,
    totalWon: profile.totalWon + (won ? 1 : 0),
  };

  return { profile: updated, alreadyRecorded: false };
}
