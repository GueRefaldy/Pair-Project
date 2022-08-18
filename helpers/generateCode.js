const QRCode = require('qrcode');

module.exports = {
  generateCode: (value) => {
    return QRCode.toDataURL(value)
  }
}