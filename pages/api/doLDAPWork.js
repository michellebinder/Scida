token = await jwt.getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
})
const {username, password} = token;