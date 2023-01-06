export const MONGO          = process.env.MONGO         ?? ''
export const HASH           = process.env.HASH          ?? ''
export const SENDGRID       = process.env.SENDGRID      ?? ''
export const SENDER         = process.env.SENDER        ?? ''
export const FRONTEND       = process.env.FRONTEND      ?? ''
export const USER_EMAIL     = process.env.USER_EMAIL    ?? ''
export const USER_NAME      = process.env.USER_NAME     ?? ''
export const USER_PASSWORD  = process.env.USER_PASSWORD ?? ''
export const PORT           = process.env.PORT          ?? 3333

if(!MONGO)          throw new Error('process.env.MONGO is necessary')
if(!HASH)           throw new Error('process.env.HASH is necessary')
if(!SENDGRID)       throw new Error('process.env.SENDGRID is necessary')
if(!SENDER)         throw new Error('process.env.SENDER is necessary')
if(!FRONTEND)       throw new Error('process.env.FRONTEND is necessary')
if(!USER_EMAIL)     throw new Error('process.env.USER_EMAIL is necessary')
if(!USER_NAME)      throw new Error('process.env.USER_NAME is necessary')
if(!USER_PASSWORD)  throw new Error('process.env.USER_PASSWORD is necessary')