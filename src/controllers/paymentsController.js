const MercadoPago = require('mercadopago');

const getFullUrl = (req) => {
  const url = req.protocol + '://' + req.get('host');
  console.log(url)
  return url;
}

module.exports = {
  async checkout(req, res) {

    console.log(process.env)
    MercadoPago.configure({
      sandbox: process.env.SANDBOX == 'true' ? true : false,
      access_token: process.env.MP_ACCESS_TOKEN
    });

    const {
      id,
      email,
      description,
      amount
    } = req.params;

    //Create purchase item object template
    const purchaseOrder = {
      items: [
        item = {
          id: id,
          description: description,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: parseFloat(amount)
        }
      ],
      payer: {
        email: email
      },
      auto_return: "all",
      external_reference: id,
      back_urls: {
        success: process.env.RETURN_URL + '/payment-confirmation/success',
        pending: process.env.RETURN_URL + '/payment-confirmation/pending',
        failure: process.env.RETURN_URL + '/payment-confirmation/failure'
      }
    }
  }
}