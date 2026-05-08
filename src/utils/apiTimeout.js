const TIMEOUT_MS = 30_000;

/**
 * Creates an AbortSignal that automatically times out after the set duration.
 * @returns {AbortSignal}
 */
export const createTimeoutSignal = () => AbortSignal.timeout(TIMEOUT_MS);
