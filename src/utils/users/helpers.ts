import User from '../../models/User';

export const userRegistered = async (email: string): Promise<boolean> => {
  try {
    const user = await User.findOne({ email });

    if (!user) return false;
    return true;
  } catch (err) {
    throw new Error(`ERROR: ${err}`);
  }
};
