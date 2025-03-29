import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  //this is acccess token
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  // prevent xss attack
  return res
    .status(200)
    .cookie("token", token, {
      //here token(cookie) is sent to client browser
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message,
      user,
    });
};
