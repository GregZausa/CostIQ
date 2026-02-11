import { loginUser, registerUser } from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const { email, password, lastName, firstName } = req.body;

    if (!email || !password || !lastName || !firstName) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const { newUser, token } = await registerUser({
      email,
      password,
      firstName,
      lastName,
    });

    res.status(201).json({
      message: "User Registered Successfully!",
      user: newUser,
      token,
    });
  } catch (err) {
    console.error(err);
    res
      .status(err.message.includes("exists") ? 409 : 500)
      .json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Passowrd are required!" });
    }

    const { user, token } = await loginUser({ email, password });
    res.json({
      message: "Logged In Successfully!",
      user,
      token,
    });
  } catch (err) {
    console.error(err);
    res
      .status(err.message.includes("Invalid") ? 401 : 500)
      .json({ message: err.message });
  }
};
