import path from 'path';
import fs from 'fs/promises';
import { transporter } from '@/lib/nodemailer';
import Handlebars from 'handlebars';
import { InvalidPaymentProofParams } from '@/types/params.type';

export const sendMailInvalidPaymentProof = async ({
  user,
  orderId,
  to,
}: InvalidPaymentProofParams) => {
  const templatePath = path.join(
    __dirname,
    '../../templates',
    'invalid-payment-proof.hbs',
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
    subject: 'Invalid Payment Proof for Order',
    html,
  });
};
