import {

  createUserService

} from "../services/authService.js";

export const registerUser =
async (req, res) => {

  try {

    const user =
      await createUserService(
        req.body
      );

    res.send(
      "User Registered"
    );

  } catch (err) {

    res.send(err.message);
  }
};