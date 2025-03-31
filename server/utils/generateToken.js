import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  //this is acccess token
  // this secret is necesary to create a webtoken without it no token can be generated
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  // prevent xss attack
  return res
    .status(200)
    .cookie("token", token, {//this cookie is for browser pc ,laptop
      //here token(cookie) is sent to client browser
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({ // this json response is for mobile app (store in local storage)
      success: true,
      message,
      user,
    });
};
