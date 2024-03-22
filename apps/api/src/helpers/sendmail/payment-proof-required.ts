import path from 'path';
import fs from 'fs/promises';
import { transporter } from '@/lib/nodemailer';
import Handlebars from 'handlebars';
import { IPaymentRequiredParams } from '@/types/params.type';

export const sendMailPaymentProofRequired = async ({
  user,
  orderId,
  to,
}: IPaymentRequiredParams) => {
  const templatePath = path.join(
    __dirname,
    '../../templates',
    'payment-proof-required.hbs',
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
    subject: 'Payment and Proof of Purchase Required',
    html,
  });
};
