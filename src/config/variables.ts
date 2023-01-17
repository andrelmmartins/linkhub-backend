export const MONGO          = process.env.MONGO         ?? ''
export const HASH           = process.env.HASH          ?? ''
export const SENDER         = process.env.SENDER        ?? ''
export const SENDER_PASS    = process.env.SENDER_PASS   ?? ''
export const FRONTEND       = process.env.FRONTEND      ?? ''
export const FORGOT_ROUTE   = process.env.FORGOT_ROUTE  ?? ''
export const USER_EMAIL     = process.env.USER_EMAIL    ?? ''
export const USER_NAME      = process.env.USER_NAME     ?? ''
export const USER_PASSWORD  = process.env.USER_PASSWORD ?? ''
export const PORT           = process.env.PORT          ?? 3333

if(!MONGO)          throw new Error('process.env.MONGO is necessary')
if(!HASH)           throw new Error('process.env.HASH is necessary')
if(!SENDER)         throw new Error('process.env.SENDER is necessary')
if(!SENDER_PASS)    throw new Error('process.env.SENDER_PASS is necessary')
if(!FRONTEND)       throw new Error('process.env.FRONTEND is necessary')
if(!FORGOT_ROUTE)   throw new Error('process.env.FORGOT_ROUTE is necessary')
if(!USER_EMAIL)     throw new Error('process.env.USER_EMAIL is necessary')
if(!USER_NAME)      throw new Error('process.env.USER_NAME is necessary')
if(!USER_PASSWORD)  throw new Error('process.env.USER_PASSWORD is necessary')