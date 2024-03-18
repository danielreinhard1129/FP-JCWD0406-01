import path from 'path';
import fs from 'fs/promises';
import { transporter } from '@/lib/nodemailer';
import Handlebars from 'handlebars';
import { IOrderSendParams } from '@/types/params.type';

export const sendMailOrderSend = async ({
  user,
  orderId,
  to,
}: IOrderSendParams) => {
  const templatePath = path.join(
    __dirname,
    '../../templates',
    'order-send.hbs',
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
    subject: 'Your Order is on the Way!',
    html,
  });
};
