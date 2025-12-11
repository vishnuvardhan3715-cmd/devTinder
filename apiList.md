# DevTinder API's

authRouter
-POST /signup
-POST /login
-POST /logout

profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

Status: ignore, interested, accepted, rejected
connectionRequestRouter
-POST /request/send/:status/:userId
status: interested/ignored

-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

userRouter
-GET /user/connections
-GET /user/requests
-GET /user/feed -Gets you the profile of others on the platform