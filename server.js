const express = require('express');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const app = express();
app.use(express.json());

// Создаем транспорт для отправки писем через Mail.ru SMTP
const transporter = nodemailer.createTransport(
    smtpTransport({
        host: 'smtp.mail.ru',
        port: 587,
        secure: false,
        auth: {
            user: 'oscarquell@mail.ru',
            pass: 'N5BGDrsduvG5aWwegfzD\n'
        }
    })
);

// Middleware для обработки CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://feedback-client-green.vercel.app'); // Укажите URL вашего React приложения
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.post('/send-feedback', (req, res) => {
    const formData = req.body;

    // Опции письма
    const mailOptions = {
        from: 'oscarquell@mail.ru',
        to: 'argen1504@mail.ru',
        subject: 'Ответ на приглашение',
        text: `Имя: ${formData.name}\nФамилия: ${formData.secondName}\nПрисутствие: ${formData.presence}\nПожелание: ${formData.message}`

    };

    // Отправляем письмо
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

const port = 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});