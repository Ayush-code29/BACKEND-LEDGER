import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendWelcomeEmail = async (email, name) => {
    const html = `
    <div style="font-family:Arial;padding:30px;background:#f5f5f5;">
        <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:10px;">

            <h1 style="color:#2563eb;">
                Welcome to MANIT Tube 🎉
            </h1>

            <h2>Hello ${name} 👋</h2>

            <p>
                Your account has been created successfully.
            </p>

            <p>
                We're excited to have you on MANIT Tube.
            </p>

            <a href="http://localhost:3000"
               style="
                    background:#2563eb;
                    color:white;
                    padding:12px 22px;
                    text-decoration:none;
                    border-radius:8px;
                    display:inline-block;
                    margin-top:20px;
               ">
                Start Watching
            </a>

            <hr style="margin:25px 0"/>

            <p style="font-size:13px;color:gray;">
                This is an automated email from MANIT Tube.
            </p>

        </div>
    </div>
    `;

    await transporter.sendMail({
        from: `"MANIT Tube" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Welcome to MANIT Tube 🎉",
        html,
    });
};

export { sendWelcomeEmail };