import multer from 'multer';
import mime from 'mime';

module.exports.uploads = function (dir) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${dir}`);
        },
        filename: (req, file, cb) => {
            // const extension = mime.getExtension(file.mimetype);
            const filename = `${file.fieldname}-${new Date().getTime()}.jpg`;
            cb(null, filename);
        },
    });
    return multer({ storage: storage });
};

module.exports.uploadsExcel = function (dir) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${dir}`);
        },
        filename: (req, file, cb) => {
            // const extension = mime.getExtension(file.mimetype);
            const filename = `BG${new Date().getTime()}.xlsx`;
            cb(null, filename);
        },
    });
    return multer({ storage: storage });
};

module.exports.uploadsCategoryLogo = function (dir) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${dir}`);
        },
        filename: (req, file, cb) => {
            // const extension = mime.getExtension(file.mimetype);
            const filename = `CL${new Date().getTime()}.jpg`;
            cb(null, filename);
        },
    });
    return multer({ storage: storage });
};



