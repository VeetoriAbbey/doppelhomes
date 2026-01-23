/**
 * Generate a random referral code
 * Example output: DH-A9F3K2Q8
 *
 * @param {string} prefix - e.g. "DH"
 * @param {number} length - number of random characters
 */
export function generateReferralCode(prefix = "REF", length = 8) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; 
  // removed confusing chars: I, O, 0, 1

  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `${prefix}-${code}`;
}
