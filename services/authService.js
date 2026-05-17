import User from "../models/User.js";

export const createUserService =
async (data) => {

  const user =
    await User.create(data);

  return user;
};