import path from 'path';
import fs from 'fs/promises';
import { transporter } from '@/lib/nodemailer';
import Handlebars from 'handlebars';
import { IOrderDeliveredParams } from '@/types/params.type';

export const sendMailOrderDelivered = async ({
  user,
  orderId,
  to
}: IOrderDeliveredParams) => {
  const templatePath = path.join(
    __dirname,
    '../../templates',
    'order-delivered.hbs',
  );

  const templatesSource = await fs.readFile(templatePath, 'utf-8');

  const compileTemplate = Handlebars.compile(templatesSource);
  const html = compileTemplate({
    user,
    orderId
  });

  await transporter.sendMail({
    from: 'Grocery Store',
    to,
    subject: 'Order Delivered - Thank You!',
    html,
  });
};
