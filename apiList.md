# DevTinder API's

authRouter
-POST /signup
-POST /login
-POST /logout

profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/edit-password

Status: ignore, interested, accepted, rejected
connectionRequestRouter

-POST /request/send/:status/:userId
status: interested/ignored


-POST /request/review/:status/:requestId
status: accepted/rejected

userRouter
-GET /user/requests/received
-GET /user/connections
-GET /feed -Gets you the profile of others on the platform