import path from 'path';
import fs from 'fs/promises';
import { transporter } from '@/lib/nodemailer';
import Handlebars from 'handlebars';
import { IPaymentConfirmedParams } from '@/types/params.type';

export const sendMailPaymentConfirmed = async ({
  user,
  orderId,
  to
}: IPaymentConfirmedParams) => {
  const templatePath = path.join(
    __dirname,
    '../../templates',
    'payment-confirmed.hbs',
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
    subject: ' Payment Confirmed - Your Order is Processing!',
    html,
  });
};
