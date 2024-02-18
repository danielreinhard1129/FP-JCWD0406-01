import multer from 'multer';
import path from 'path';

export function upload(folder = 'products') {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/../images/${folder}`);
    },
    filename: function (req, file, cb) {
      cb(
        null,
        path.parse(file.originalname).name +
          '-' +
          Date.now() +
          path.extname(file.originalname),
      );
    },
  });

  const fileFilter = (req: any, file: any, cb: CallableFunction) => {
    if (
      file &&
      (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/gif')
    ) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PNG, JPG, JPEG, GIF allowed.'));
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fieldSize: 1024 * 1024 },
  }).single('image');
}
