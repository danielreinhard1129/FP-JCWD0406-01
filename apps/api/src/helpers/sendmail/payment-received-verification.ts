import path from 'path';
import fs from 'fs/promises';
import { transporter } from '@/lib/nodemailer';
import Handlebars from 'handlebars';
import { IPaymentReceivedVerificationParams } from '@/types/params.type';

export const sendMailPaymentReceivedVerification = async ({
  user,
  orderId,
  to,
}: IPaymentReceivedVerificationParams) => {
  const templatePath = path.join(
    __dirname,
    '../../templates',
    'payment-received-verification.hbs',
  );

  const templatesSource = await fs.readFile(templatePath, 'utf-8');

  const compileTemplate = Handlebars.compile(templatesSource);
  const html = compileTemplate({
    user,
    orderId,
  });

  await transporter.sendMail({
    from: 'Grocery Store',
    to,
    subject: 'Payment Received - Verification Underway',
    html,
  });
};
