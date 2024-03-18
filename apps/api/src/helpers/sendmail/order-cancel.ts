import path from 'path';
import fs from 'fs/promises';
import { transporter } from '@/lib/nodemailer';
import Handlebars from 'handlebars';
import { IOrderCancelParams } from '@/types/params.type';

export const sendMailOrderCancel = async ({
  user,
  orderId,
  to,
}: IOrderCancelParams) => {
  const templatePath = path.join(
    __dirname,
    '../../templates',
    'order-cancel.hbs',
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
    subject: 'Order Cancellation Confirmation',
    html,
  });
};
