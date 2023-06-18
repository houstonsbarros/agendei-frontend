const nodemailer = require('nodemailer');

// Importe o NodeMailer

const Configurar = () => {
    const enviarEmail = () => {
        // Crie um transporte para o envio de email
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "f379f7a4a5bc30",
              pass: "461c4195d3d737"
            }
        });

        // Defina o email que será enviado
        var email = {
            from: "noreply@agendei.com",
            to: "houstonbarroscontact@gmail.com",
            subject: "Teste de envio de email",
            text: "Olá, este é um teste de envio de email",
            html: "<b>Olá, este é um teste de envio de email</b>"
        };

        // Envie o email
        transport.sendMail(email, function(error: any, info: any) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email enviado com sucesso!");
            }
        });
    }
    

    return (
        <div>
            <h1>Configurar</h1>
            <button onClick={enviarEmail}>Enviar email</button>
        </div>
    )
}

export default Configurar