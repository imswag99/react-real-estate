import jwt from 'jsonwebtoken'

const shouldBeLoggedIn = async (req, res) => {
  console.log(req.userId);
  res.status(200).json({message: "You are AUTHENTICATED"});
}

const shouldBeAdmin = (req, res) => {
  const token = req.cookies.token;

  if(!token) return res.status(401).json({message: "Not AUTHENTICATED !!!"});

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if(err) return res.status(403).json({message: "TOKEN is not VALID !!!"});
    if(!payload.isAdmin) return res.status(403).json({message: "Not AUTHORIZED !!!"});
  })

  res.status(200).json({message: "You are AUTHENTICATED"});
}

export {shouldBeLoggedIn, shouldBeAdmin}