import sendgrid from '@sendgrid/mail'

import { APP, SENDER, SENDGRID } from './variables'
sendgrid.setApiKey(SENDGRID)

export async function sendForgetMail(email: string, token: string) : Promise<boolean> {

    let forgetLink = APP + '/auth/change?token=' + token

    return await sendgrid.send({
        to: email,
        from: SENDER,
        subject: 'Linkhub | Recuperação de Senha',
        text: 'Recebemos o seu pedido de recuperação de senha! Clique no link para recuperar: ' + forgetLink,
    })
    .then(() => {
        return true
    })
    .catch((e) => {
        console.log(e)
        return false
    })
}