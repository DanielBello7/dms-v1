export default function otpEmail(name: string, otp: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            overflow: hidden;
          }
          .email-header {
            color: #2e614d;
            padding: 20px;
            text-align: center;
            display: flex;
            align-items: center;
            gap: 1rem;
            justify-content: center;
          }
          .email-body {
            padding: 20px;
            color: #333333;
          }
          .email-footer {
            background-color: #f4f4f4;
            padding: 10px;
            text-align: center;
            color: #777777;
            font-size: 12px;
          }
          .otp-code {
            display: inline-block;
            padding: 10px 20px;
            font-size: 24px;
            color: #ffffff;
            background-color: #2e614d;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="30" height="30" rx="4" fill="#2E614D"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.9997 7.90869C17.7741 7.90869 20.0232 10.1578 20.0232 12.9323V13.2349C20.0232 14.345 19.6764 15.4273 19.0312 16.3306L15.0096 21.9608C15.0047 21.9676 14.9946 21.9676 14.9897 21.9608L10.9682 16.3306C10.3229 15.4273 9.97607 14.345 9.97607 13.2349V12.9323C9.97607 10.1578 12.2252 7.90869 14.9997 7.90869ZM17.206 12.4586C17.0527 11.7872 16.6021 11.2221 15.9816 10.9233C15.3611 10.6245 14.6383 10.6245 14.0178 10.9233C13.3973 11.2221 12.9466 11.7872 12.7933 12.4586C12.6401 13.1301 12.8009 13.8348 13.2303 14.3732C13.6597 14.9117 14.311 15.2253 14.9997 15.2253C15.6884 15.2253 16.3396 14.9117 16.769 14.3732C17.1984 13.8348 17.3592 13.1301 17.206 12.4586Z" fill="white"/>
                </svg>
            <h1>Bus-T</h1>
          </div>
          <div class="email-body">
            <h2>Hey there ${name},</h2>
            <p>
              Please make use of the following one-time-verification code:
            </p>
            <div class="otp-code">${otp}</div>
            <p>
              Please do not share this code with anyone. If you did not request this
              code, please ignore this email or contact support.
            </p>
            <p>Thank you for choosing Bus-T.</p>
          </div>
          <div class="email-footer">
            <p>Bus-T technologies, House 70, road 22, Kado Estate, Abuja</p>
            <p>&copy; 2024 Bus-T technologies. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
