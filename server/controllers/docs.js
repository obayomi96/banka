class ApiDocs {
  /**
    * @method docs
    * @description Api docimentation controller
    * @param {object} req - The Request Object
    * @param {object} res - The Response Object
    */
  static docs(req, res) {
    res.redirect('https://obayomibanka.docs.apiary.io/');
  }
}

export default ApiDocs;
